import { useEffect, useState } from "react";
import { BASE_URL } from "../../api/apiConfig";
import axiosInstance from "../../api/axiosInstance";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import {useAuthStore} from "../../store/authStore";
import CategorySearchForm from "../../components/CategorySearchForm";
import PaginationBar from "../../components/common/PaginationBar";

const CategoriesPage = () => {
    const [items, setItems] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [isAuthDialog, setIsAuthDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const fetchCategories = async (params = {}) => {
        try {
            const query = new URLSearchParams(params).toString();
            const res = await axiosInstance.get(`/api/Categories/search?${query}`);
            setItems(res.data.items);
            setTotalPages(res.data.totalPge);
            setCurrentPage(res.data.currentPge);
        } catch (err) {
            console.error("Помилка при завантаженні категорій", err);
        }
    };

    useEffect(() => {
        fetchCategories(searchParams);
    }, []);

    const handleSearch = (params) => {
        const query = new URLSearchParams(params);
        setSearchParams(query);
        fetchCategories(params);
    };

    const handlePageChange = (page) => {
        const params = Object.fromEntries(searchParams.entries());
        const newParams = { ...params, pageNumber: page };
        setSearchParams(newParams);
        fetchCategories(newParams);
    };

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
            setItems((prev) => prev.filter((item) => item.id !== selectedId));
        } catch (err) {
            console.error("Помилка при видаленні", err);
            if (err.response?.status === 401) {
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
                    message="Ви не авторизовані. Увійти зараз?"
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
            <CategorySearchForm onSearch={handleSearch} />

            <Link to={"/categories/create"} className="my-3 btn btn-success">Додати</Link>

            {items.length === 0 ? (
                <h2>Список пустий</h2>
            ) : (
                <>
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
                        {items.map((item) => (
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
                                    <Link to={`update/${item.slug}`} className="btn btn-success me-2">Edit</Link>
                                    <button className="btn btn-danger" onClick={() => handleDeleteClick(item.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <PaginationBar
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </>
    );
};

export default CategoriesPage;
