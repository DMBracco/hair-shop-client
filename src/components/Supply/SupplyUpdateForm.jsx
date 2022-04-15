import React, { useState, useEffect } from 'react'
import { SuppliesUrl, SuppliersUrl } from '../../api/Constants';


export default function SupplyUpdateForm(props) {
    
    const [supplierData, setSupplierData] = useState([]);

    const initialFormData = Object.freeze({
        invoice: props.BASIC_DATA.invoice,
        data: props.BASIC_DATA.data.toLocaleString(),
        supplierID: props.BASIC_DATA.supplierID,
        userID: props.BASIC_DATA.UserID
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
            supplyID: props.BASIC_DATA.supplyID,
            invoice: formData.invoice,
            data: formData.data,
            supplierID: formData.supplierID,
            userID: 2
        };

        const url = SuppliesUrl.API_URL_UPDATE+'/'+props.BASIC_DATA.supplyID;

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
                props.onUpdated(itemToUpdate);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };

    function getSupplier() {
        const url = SuppliersUrl.API_URL_GET_ALL;
  
        fetch(url, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(dataFromServer => {
            setSupplierData(dataFromServer);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }

    useEffect(() => {
        getSupplier()
      }, [])

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Обновление записи под ID - "{props.BASIC_DATA.supplyID}".</h1>

            <div className="mt-5">
                <label className="h3 form-label">Номер накладной</label>
                <input value={formData.invoice} name="invoice" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-5">
                <label className="h3 form-label">Дата и время</label>
                <input value={formData.data} name="data" type="datetime-local" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-5">
                <label className="h3 form-label">Поставщики</label>
                <select value={formData.supplierID} className="form-select" name="supplierID" onChange={handleChange}>
                    {supplierData.map((item) => (
                        <option key={item.supplierID} value={item.supplierID}>{item.supplierName}</option>
                    ))}
                </select>

            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Сохранить</button>
            <button onClick={() => props.onUpdated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Назад</button>
        </form>
    );
}
