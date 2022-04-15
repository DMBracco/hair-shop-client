import React, { useState } from 'react'
import { BrandsUrl } from '../../api/Constants';

export default function BrandUpdateForm(props) {
    const initialFormData = Object.freeze({
        brandName: props.brand.brandName
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

        const brandToUpdate = {
            brandID: props.brand.brandID,
            brandName: formData.brandName
        };

        const url = BrandsUrl.API_URL_UPDATE+'/'+props.brand.brandID;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(brandToUpdate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        props.onBrandUpdated(brandToUpdate);
    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Обновление бренда под названием - "{props.brand.brandName}".</h1>

            <div className="mt-5">
                <label className="h3 form-label">Название</label>
                <input value={formData.brandName} name="brandName" type="text" className="form-control" onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Сохранить</button>
            <button onClick={() => props.onBrandUpdated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Назад</button>
        </form>
    );
}