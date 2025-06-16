import {useAuthStore} from "../../store/authStore";
import NoMatch from "../NoMatch";
import {BASE_URL} from "../../api/apiConfig";
import {Link} from "react-router-dom";

const ProfilePage = () => {
    const user = useAuthStore.getState().user;

    return user ? (
        <section className="vh-100">
            <div className="container-fluid py-3 h-100">
                <div className="row h-100">
                    <div className="col-12 p-0">
                        <div className="card" style={{ borderRadius: '.5rem' }}>
                            <div className="row g-0 h-100 my-5">
                                <div
                                    className="col-md-4 d-flex flex-column align-items-center justify-content-centr">
                                    <img
                                        src={`${BASE_URL}/images/400_${user.image}`}
                                        alt="Avatar"
                                        className="img-fluid rounded-circle"
                                        style={{ width: '300px' }}
                                    />
                                </div>
                                <div className="col-md-8 d-flex align-items-center justify-content-centr">
                                    <div className="card-body p-4">
                                        <h6>Інформація</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Email</h6>
                                                <p className="text-muted">{user.email}</p>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <h6>Ім'я</h6>
                                                <p className="text-muted">{user.name}</p>
                                            </div>
                                        </div>
                                        <h6>Замовлення</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Улюблена страва</h6>
                                                <p className="text-muted">Не вибрано :(</p>
                                            </div>

                                            <div className="col-5 p-0 mb-3 d-flex align-items-start justify-content-start">
                                                <Link
                                                    to="orders"
                                                    className="btn btn-success d-inline-flex align-items-center justify-content-center gap-2 py-2 fs-6 shadow-sm rounded-pill"
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <i className="bi bi-list-check"></i>
                                                    Переглянути всі замовлення
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    ) : (<NoMatch />);
}


export default ProfilePage;