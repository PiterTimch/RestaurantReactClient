import {useEffect, useState} from "react";
import {BASE_URL} from "../../api/apiConfig";
import axiosInstance from "../../api/axiosInstance";


const CategoriesPage = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        axiosInstance.get("/api/Categories/list")
            .then(res => {
                const {data} = res;
                console.log(data);
                setList(data);
            }).catch(err => console.log(err));
        console.log("Hello useEffect")
    }, []);

    return(
        <>
            <h1 className={"text-center"}>Категорії</h1>
            {list.length === 0 ? <h2>Список пустий</h2> :
                <table className={"table"}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Image</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        list.map(item => (
                            <tr key={item}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td><img src={BASE_URL + "/images/200_" + item.image} alt={item.name}
                                         width={75}/></td>
                            </tr>
                        ))
                    }

                    </tbody>
                </table>
            }
        </>
    )
}

export default CategoriesPage;