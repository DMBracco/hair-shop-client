import React, { useState } from 'react'
import { ProductTypesUrl } from '../../api/Constants';

export default function ProductTypeUpdateForm(props) {
    const initialFormData = Object.freeze({
        productTypeName: props.productType.productTypeName
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

        const itemToUpdate = {
            productTypeID: props.productType.productTypeID,
            productTypeName: formData.productTypeName
        };

        const url = ProductTypesUrl.API_URL_UPDATE+'/'+props.productType.productTypeID;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToUpdate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        props.onUpdated(itemToUpdate);
    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Обновление записи под названием - "{props.productType.productTypeName}".</h1>

            <div className="mt-5">
                <label className="h3 form-label">Название</label>
                <input value={formData.productTypeName} name="productTypeName" type="text" className="form-control" onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Сохранить</button>
            <button onClick={() => props.onUpdated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Назад</button>
        </form>
    );
}