import {useEffect, useState} from "react";
import axiosInstance from "../../../api/axiosInstance";
import BaseTextInput from "../../../components/common/BaseTextInput";
import BaseFileInput from "../../../components/common/BaseFileInput";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import LoadingOverlay from "../../../components/common/LoadingOverlay";

// Валідація
const validationSchema = Yup.object().shape({
    name: Yup.string().required("Назва не може бути порожньою"),
    slug: Yup.string().required("Slug не може бути порожнім"),
    image: Yup.mixed().nullable()
});

const CategoriesUpdateForm = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        id: "",
        name: "",
        slug: "",
        image: null,
    });

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axiosInstance.get(`/api/Categories/${slug}`);
                setInitialValues({
                    id: res.data.id,
                    name: res.data.name,
                    slug: res.data.slug,
                    image: null,
                });
            } catch (err) {
                console.log(err);
            }
        };

        fetchCategory();
    }, [slug]);

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        const data = new FormData();
        data.append("id", values.id);
        data.append("name", values.name);
        data.append("slug", values.slug);
        if (values.image) {
            data.append("imageFile", values.image);
        }

        try {
            await axiosInstance.put("/api/Categories/update", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("..");
        } catch (err) {
            console.error(err);

            const errorResponse = err.response?.data;

            if (errorResponse && typeof errorResponse.errors === 'object') {
                Object.entries(errorResponse.errors).forEach(([field, messages]) => {
                    const key = field.charAt(0).toLowerCase() + field.slice(1);

                    if (Array.isArray(messages)) {
                        setFieldError(key, messages[0]); // або всі, якщо хочеш
                    } else {
                        setFieldError(key, messages);
                    }
                });
            } else {
                setFieldError("general", errorResponse || "Сталася помилка при редагуванні категорії");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <h2 className="text-center mb-4">Редагувати категорію</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ setFieldValue, isSubmitting, errors }) => (
                    <Form className="mx-auto" style={{ maxWidth: 400 }}>
                        {errors.general && (
                            <div className="alert alert-danger" role="alert">
                                {errors.general}
                            </div>
                        )}

                        <Field
                            name="name"
                            label="Назва"
                            placeholder="Введіть назву"
                            component={BaseTextInput}
                            disabled={isSubmitting}
                        />

                        <Field
                            name="slug"
                            label="Slug"
                            placeholder="Введіть slug"
                            component={BaseTextInput}
                            disabled={isSubmitting}
                        />

                        <Field
                            name="image"
                            label="Зображення"
                            component={BaseFileInput}
                            disabled={isSubmitting}
                            setFieldValue={setFieldValue}
                        />

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Зміна..." : "Змінити"}
                        </button>

                        {isSubmitting && <LoadingOverlay />}
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CategoriesUpdateForm;
