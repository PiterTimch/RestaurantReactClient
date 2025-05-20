import { useEffect, useState } from "react";
import { BASE_URL } from "../../api/apiConfig";
import axiosInstance from "../../api/axiosInstance";
import { Link } from "react-router-dom";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const CategoriesPage = () => {
    const [list, setList] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

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
            await axiosInstance.delete(`/api/Categories/delete/${selectedId}`);
            setList((prev) => prev.filter((item) => item.id !== selectedId));
        } catch (err) {
            console.error("Помилка при видаленні", err);
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

            <h1 className="text-center">Категорії</h1>

            {list.length === 0 ? (
                <h2>Список пустий</h2>
            ) : (
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
            )}
        </>
    );
};

export default CategoriesPage;
