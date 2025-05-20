import axiosInstance from "../../../api/axiosInstance";
import BaseTextInput from "../../../components/common/BaseTextInput";
import BaseFileInput from "../../../components/common/BaseFileInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import LoadingOverlay from "../../../components/common/LoadingOverlay";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Назва не може бути порожньою"),
    slug: Yup.string().required("Slug не може бути порожнім"),
    image: Yup.mixed().nullable()
});

const CategoriesCreateForm = () => {
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            slug: "",
            image: null
        },
        validationSchema,
        onSubmit: (values, { setSubmitting, resetForm, setErrors }) => {
            setIsSubmitting(true);
            setSuccess("");

            const data = new FormData();
            data.append("name", values.name);
            data.append("slug", values.slug);
            data.append("imageFile", values.image);

            axiosInstance
                .post("/api/Categories/create", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(() => {
                    setSuccess("Категорію успішно створено!");
                    resetForm();
                })
                .catch((err) => {
                    console.error(err);
                    setErrors({
                        image: err.response?.data?.message || "Сталася помилка при створенні категорії",
                    });
                })
                .finally(() => {
                    setSubmitting(false);
                    setIsSubmitting(false);
                });
        }
    });

    const {
        handleSubmit,
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
    } = formik;

    return (
        <>
            <h2 className="text-center mb-4">Створити категорію</h2>

            {success && (
                <div className="alert alert-success" role="alert">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: 400 }}>
                <BaseTextInput
                    field={{
                        name: "name",
                        value: values.name,
                        onChange: handleChange,
                        onBlur: handleBlur,
                    }}
                    form={{ touched, errors }}
                    label="Назва"
                />

                <BaseTextInput
                    field={{
                        name: "slug",
                        value: values.slug,
                        onChange: handleChange,
                        onBlur: handleBlur,
                    }}
                    form={{ touched, errors }}
                    label="Slug"
                />

                <BaseFileInput
                    field={{
                        name: "image",
                        value: values.image
                    }}
                    form={{ touched, errors, setFieldValue }}
                    label="Зображення"
                />

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Створення..." : "Створити"}
                </button>

                {isSubmitting && <LoadingOverlay />}
            </form>
        </>
    );
};

export default CategoriesCreateForm;
