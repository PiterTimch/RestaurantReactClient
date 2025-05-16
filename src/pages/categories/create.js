import {useState} from "react";
import axios from "axios";

const CategoriesCreateForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        image: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("slug", formData.slug);
        data.append("imageFile", formData.image);

        axios.post("http://localhost:5116/api/Categories/create", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return(
        <>
            <h2 className="text-center">Створити категорію</h2>
            <form onSubmit={handleSubmit} className="mx-auto">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Назва</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="slug" className="form-label">Slug</label>
                    <input
                        type="text"
                        className="form-control"
                        id="slug"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Зображення</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Створити</button>
            </form>
        </>
    );
}

export default CategoriesCreateForm;