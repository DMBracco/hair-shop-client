import React, { useState } from 'react'
import { ProductTypesUrl } from '../../api/Constants';

export default function ProductTypeCreateForm(props) {
    const initialFormData = Object.freeze({
        productTypeName: "что-то"
    });

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const itemToCreate = {
            productTypeID: 0,
            productTypeName: formData.productTypeName
        };

        const url = ProductTypesUrl.API_URL_CREATE;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        props.onCreated(itemToCreate);
    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Создать новую запись</h1>

            <div className="mt-5">
                <label className="h3 form-label">Название</label>
                <input value={formData.productTypeName} name="productTypeName" type="text" className="form-control" onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Сохранить</button>
            <button onClick={() => props.onCreated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Назад</button>
        </form>
    );
}