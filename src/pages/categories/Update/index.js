import {useEffect, useState} from "react";
import axiosInstance from "../../../api/axiosInstance";
import BaseTextInput from "../../../components/common/BaseTextInput";
import BaseFileInput from "../../../components/common/BaseFileInput";
import {useNavigate, useParams} from "react-router-dom";

const CategoriesUpdateForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        image: null,
    });

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axiosInstance.get(`/api/Categories/${id}`)
                .then(res => {
                    setFormData({
                        id: id,
                        name: res.data.name,
                        slug: res.data.slug,
                        image: null
                    });
                })
                .catch(err => console.log(err));
        }
    }, [id]);

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        if (!formData.name.trim()) {
            setError("Назва не може бути порожньою");
            return false;
        }
        if (!formData.slug.trim()) {
            setError("Slug не може бути порожнім");
            return false;
        }

        setError("");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);
        setError("");
        setSuccess("");

        const data = new FormData();
        data.append("name", formData.name);
        data.append("id", formData.id);
        data.append("slug", formData.slug);
        data.append("imageFile", formData.image);

        axiosInstance
            .post("/api/Categories/update", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setSuccess("Категорію успішно змінено!");
                navigate("..");
            })
            .catch((err) => {
                console.error(err);
                setError(
                    err.response?.data?.message ||
                    "Сталася помилка при редагувані категорії"
                );
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <>
            <h2 className="text-center mb-4">Редагувати категорію</h2>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {success && (
                <div className="alert alert-success" role="alert">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: 400 }}>
                <BaseTextInput
                    id="name"
                    name="name"
                    label="Назва"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={error && !formData.name.trim() ? error : ""}
                />

                <BaseTextInput
                    id="slug"
                    name="slug"
                    label="Slug"
                    value={formData.slug}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={error && !formData.slug.trim() ? error : ""}
                />

                <BaseFileInput
                    id="image"
                    name="image"
                    label="Зображення"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={error && !formData.image ? error : ""}
                />

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Зміна..." : "Змінити"}
                </button>
            </form>
        </>
    );
};

export default CategoriesUpdateForm;
