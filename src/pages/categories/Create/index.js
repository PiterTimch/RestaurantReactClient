import axiosInstance from "../../../api/axiosInstance";
import BaseTextInput from "../../../components/common/BaseTextInput";
import BaseFileInput from "../../../components/common/BaseFileInput";
import { Formik, Form, Field } from "formik";
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

    const initialValues = {
        name: "",
        slug: "",
        image: null
    };

    const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
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
    };

    return (
        <>
            <h2 className="text-center mb-4">Створити категорію</h2>

            {success && (
                <div className="alert alert-success" role="alert">
                    {success}
                </div>
            )}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form className="mx-auto" style={{ maxWidth: 400 }}>
                        <Field
                            name="name"
                            label="Назва"
                            component={BaseTextInput}
                        />

                        <Field
                            name="slug"
                            label="Slug"
                            component={BaseTextInput}
                        />

                        <Field
                            name="image"
                            label="Зображення"
                            component={BaseFileInput}
                            setFieldValue={setFieldValue}
                        />

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Створення..." : "Створити"}
                        </button>

                        {isSubmitting && <LoadingOverlay />}
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CategoriesCreateForm;
