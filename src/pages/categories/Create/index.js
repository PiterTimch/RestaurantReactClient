import axiosInstance from "../../../api/axiosInstance";
import BaseTextInput from "../../../components/common/BaseTextInput";
import BaseFileInput from "../../../components/common/BaseFileInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../../../api/apiConfig";
import {useState} from "react";
import LoadingOverlay from "../../../components/common/LoadingOverlay";
import {mapServerErrorsToFormik} from "../../../helpers/formikErrorHelper";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import {useAuthStore} from "../../../store/authStore";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Назва не може бути порожньою"),
    slug: Yup.string().required("Slug не може бути порожнім"),
    image: Yup.mixed().nullable()
});

const CategoriesCreateForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthDialog, setIsAuthDialog] = useState(false);
    const logout = useAuthStore((state) => state.logout);

    const initValues = {
        name: "",
        slug: "",
        imageFile: null,
    };

    const handleFormikSubmit = async (values) => {
        setIsLoading(true);
        console.log("Submit formik", values);
        try {
            var result = await axiosInstance.post(`${BASE_URL}/api/Categories/create`, values,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            console.log("Server result", result);
            navigate("..");

        } catch(err) {
            console.error("Send request error", err);

            mapServerErrorsToFormik(err, setErrors);

            if (err.response && err.response.status === 401)
            {
                setIsAuthDialog(true);
            }

            setIsLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: initValues,
        onSubmit: handleFormikSubmit,
        validationSchema: validationSchema,
    });

    const {values, handleSubmit, errors, touched, setErrors, handleChange, setFieldValue} = formik;

    const navigate = useNavigate();

    const onHandleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setFieldValue("imageFile", files[0]);
        }
        else {
            setFieldValue("imageFile", null);
        }
    }

    return (
        <>
            {isAuthDialog && (
                <ConfirmDialog
                    message="Ви не авторизовані, або ваша сесія завершилася. Бажаєте увійти?"
                    onConfirm={() => {
                        setIsAuthDialog(false);
                        logout();
                        navigate("/account/login");
                    }}
                    onCancel={() => {
                        setIsAuthDialog(false);
                        logout();
                        navigate("/");
                    }}
                />
            )}

            {errors.general && (
                <div className="alert alert-danger" role="alert">
                    {errors.general}
                </div>
            )}

            <h1 className={"text-center"}>Додати категорію</h1>
            <form onSubmit={handleSubmit} className={"col-md-6 offset-md-3"}>
                <BaseTextInput
                    label={"Назва"}
                    field={"name"}
                    error={errors.name}
                    touched={touched.name}
                    value={values.name}
                    onChange={handleChange}
                />

                <BaseTextInput
                    label={"Url-Slug"}
                    field={"slug"}
                    error={errors.slug}
                    touched={touched.slug}
                    value={values.slug}
                    onChange={handleChange}
                />

                <BaseFileInput
                    label={"Оберіть фото"}
                    field={"imageFile"}
                    error={errors.imageFile}
                    touched={touched.imageFile}
                    onChange={onHandleFileChange}
                />

                <button type="submit" className="btn btn-primary">Додати</button>

                {isLoading && <LoadingOverlay />}
            </form>
        </>
    );
};

export default CategoriesCreateForm;
