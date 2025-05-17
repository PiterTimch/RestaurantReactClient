import { useState } from "react";
import axios from "axios";

const CategoriesCreateForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        image: null,
    });

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
        if (!formData.image) {
            setError("Будь ласка, додайте зображення");
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
        data.append("slug", formData.slug);
        data.append("imageFile", formData.image);

        axios
            .post("http://localhost:5116/api/Categories/create", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setSuccess("Категорію успішно створено!");
                setFormData({ name: "", slug: "", image: null });
            })
            .catch((err) => {
                console.error(err);
                setError(
                    err.response?.data?.message ||
                    "Сталася помилка при створенні категорії"
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
            <h2 className="text-center mb-4">Створити категорію</h2>

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
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Назва
                    </label>
                    <input
                        type="text"
                        className={`form-control ${error && !formData.name.trim() ? "is-invalid" : ""}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="slug" className="form-label">
                        Slug
                    </label>
                    <input
                        type="text"
                        className={`form-control ${error && !formData.slug.trim() ? "is-invalid" : ""}`}
                        id="slug"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="form-label">
                        Зображення
                    </label>
                    <input
                        type="file"
                        className={`form-control ${error && !formData.image ? "is-invalid" : ""}`}
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Створення..." : "Створити"}
                </button>
            </form>
        </>
    );
};

export default CategoriesCreateForm;
