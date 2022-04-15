import React, { useState } from 'react'
import { BrandsUrl } from '../../api/Constants';

export default function BrandCreateForm(props) {
    const initialFormData = Object.freeze({
        brandName: "что-то"
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

        const brandToCreate = {
            brandId: 0,
            brandName: formData.brandName
        };

        const url = BrandsUrl.API_URL_CREATE;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(brandToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        props.onBrandCreated(brandToCreate);
    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Создать новый бренд</h1>

            <div className="mt-5">
                <label className="h3 form-label">Имя бренда</label>
                <input value={formData.brandName} name="brandName" type="text" className="form-control" onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Сохранить</button>
            <button onClick={() => props.onBrandCreated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Назад</button>
        </form>
    );
}