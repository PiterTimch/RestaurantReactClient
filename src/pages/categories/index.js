import { useEffect, useState } from "react";
import { BASE_URL } from "../../api/apiConfig";
import axiosInstance from "../../api/axiosInstance";
import {Link, useNavigate} from "react-router-dom";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import {useAuthStore} from "../../store/authStore";

const CategoriesPage = () => {
    const [list, setList] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [isAuthDialog, setIsAuthDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {
        axiosInstance
            .get("/api/Categories/list")
            .then((res) => setList(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setConfirmVisible(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            await axiosInstance.delete(`/api/Categories/delete`, {
                data: { id: selectedId }
            });
            setList((prev) => prev.filter((item) => item.id !== selectedId));
        } catch (err) {
            console.error("Помилка при видаленні", err);
            if (err.response && err.response.status === 401)
            {
                setIsAuthDialog(true);
            }
        } finally {
            setIsDeleting(false);
            setConfirmVisible(false);
            setSelectedId(null);
        }
    };

    return (
        <>
            {isDeleting && <LoadingOverlay />}
            {confirmVisible && (
                <ConfirmDialog
                    message="Ви впевнені, що хочете видалити цю категорію?"
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setConfirmVisible(false)}
                />
            )}
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

            <h1 className="text-center">Категорії</h1>

            {list.length === 0 ? (
                <h2>Список пустий</h2>
            ) : (
                <>
                    <Link to={"/categories/create"} className={"my-3 btn btn-success"}>Додати</Link>

                    <table className="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Назва</th>
                            <th>Зображення</th>
                            <th>Дії</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <img
                                        src={`${BASE_URL}/images/200_${item.image}`}
                                        alt={item.name}
                                        width={75}
                                    />
                                </td>
                                <td>
                                    <Link
                                        to={`update/${item.slug}`}
                                        className="btn btn-success me-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteClick(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
};

export default CategoriesPage;
