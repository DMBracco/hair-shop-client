import React, { useState } from 'react'
import { SuppliersUrl } from '../../api/Constants';

export default function SupplierUpdateForm(props) {
    const initialFormData = Object.freeze({
        supplierName: props.BASIC_DATA.supplierName,
        phonenumber: props.BASIC_DATA.phonenumber
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
            supplierID: props.BASIC_DATA.supplierID,
            supplierName: formData.supplierName,
            phonenumber: formData.phonenumber
        };

        const url = SuppliersUrl.API_URL_UPDATE+'/'+props.BASIC_DATA.supplierID;

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
            <h1 className="mt-5">Обновление записи под названием - "{props.BASIC_DATA.supplierName}".</h1>

            <div className="mt-5">
                <label className="h3 form-label">Название</label>
                <input value={formData.supplierName} name="supplierName" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-5">
                <label className="h3 form-label">Номер</label>
                <input value={formData.phonenumber} name="phonenumber" type="text" className="form-control" onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Сохранить</button>
            <button onClick={() => props.onUpdated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Назад</button>
        </form>
    );
}