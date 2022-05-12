import React, { useState, useEffect } from 'react'
import { SuppliesUrl, SuppliersUrl } from '../../api/Constants';

export default function SupplyCreateForm(props) {

  const [supplierData, setSupplierData] = useState([]);

  const initialFormData = Object.freeze({
    invoice: "что-то",
    data: 0,
    supplierID: 0,
    userID: 2,
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

    console.log(formData.data);
    if(0 === formData.data){
      alert(`Введите время.`);
      return
    }
    console.log(props.productData);

    let productsModel = new Array()

    props.productData.forEach((item) => {
        if (item.check) {
            productsModel.push(item)
        }
      })

      console.log(productsModel);

    const itemToCreate = {
      supplyID: 0,
      invoice: formData.invoice,
      data: formData.data,
      supplierID: formData.supplierID,
      userID: 2,
      productsModel: productsModel
    };

    const url = SuppliesUrl.API_URL_CREATE;

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
            props.onCreated(itemToCreate, responseFromServer);
            setFormData(initialFormData)
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
        {/* <h1 className="mt-5">Создать новую запись</h1> */}

        <div className="">
            <label className="form-label">Номер накладной</label>
            <input value={formData.invoice} name="invoice" type="text" className="form-control" onChange={handleChange} />
        </div>

        <div className="">
            <label className="form-label">Дата и время</label>
            <input defaultValue={formData.data} name="data" type="datetime-local" className="form-control" onChange={handleChange}/>
        </div>

        <div className="">
            <label className="form-label">Поставщики</label>
            <select value={formData.supplierID} className="form-select" name="supplierID" onChange={handleChange}>
              <option value={0}>выберите поставщика</option>
                {supplierData.map((item) => (
                    <option key={item.supplierID} value={item.supplierID}>{item.supplierName}</option>
                ))}
            </select>

        </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Добавить</button>
        {/* <button onClick={() => props.onCreated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Назад</button> */}
    </form>
);
}