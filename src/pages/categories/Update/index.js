import axiosInstance from "../../../api/axiosInstance";
import BaseTextInput from "../../../components/common/BaseTextInput";
import BaseFileInput from "../../../components/common/BaseFileInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingOverlay from "../../../components/common/LoadingOverlay";
import {mapServerErrorsToFormik} from "../../../helpers/formikErrorHelper";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Назва не може бути порожньою"),
    slug: Yup.string().required("Slug не може бути порожнім"),
    imageFile: Yup.mixed().nullable(),
});

const CategoriesUpdateForm = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            slug: "",
            imageFile: null,
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            const data = new FormData();
            data.append("id", values.id);
            data.append("name", values.name);
            data.append("slug", values.slug);
            if (values.imageFile) {
                data.append("imageFile", values.imageFile);
            }

            try {
                await axiosInstance.put("/api/Categories/update", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                navigate("..");
            } catch (err) {
                console.error("Send request error", err);

                mapServerErrorsToFormik(err, setErrors);

                setIsLoading(false);
            }
        },
    });

    const { values, handleSubmit, errors, touched, handleChange, setFieldValue, setValues, setErrors } = formik;

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axiosInstance.get(`/api/Categories/${slug}`);
                setValues({
                    id: res.data.id,
                    name: res.data.name,
                    slug: res.data.slug,
                    imageFile: null,
                });
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategory();
    }, [slug]);

    const onHandleFileChange = (e) => {
        const files = e.target.files;
        setFieldValue("imageFile", files.length > 0 ? files[0] : null);
    };

    return (
        <>
            {errors.general && (
                <div className="alert alert-danger" role="alert">
                    {errors.general}
                </div>
            )}

            <h1 className="text-center">Редагувати категорію</h1>
            <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
                {errors.general && (
                    <div className="alert alert-danger" role="alert">
                        {errors.general}
                    </div>
                )}

                <BaseTextInput
                    label="Назва"
                    field="name"
                    error={errors.name}
                    touched={touched.name}
                    value={values.name}
                    onChange={handleChange}
                />

                <BaseTextInput
                    label="Slug"
                    field="slug"
                    error={errors.slug}
                    touched={touched.slug}
                    value={values.slug}
                    onChange={handleChange}
                />

                <BaseFileInput
                    label="Оберіть зображення"
                    field="imageFile"
                    error={errors.imageFile}
                    touched={touched.imageFile}
                    onChange={onHandleFileChange}
                />

                <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                    Змінити
                </button>
            </form>

            {isLoading && <LoadingOverlay />}
        </>
    );
};

export default CategoriesUpdateForm;
