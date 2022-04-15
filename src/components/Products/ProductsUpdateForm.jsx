import React, { useState, useEffect } from 'react'
import { ProductsUrl } from '../../api/Constants';

export default function ProductsUpdateForm(props) {
  const initialunionData= Object.freeze({
    brands: [],
    productTypes: [],
    hairTypes: []
});

const [unionData, setUnionData] = useState(initialunionData);

const initialFormData = Object.freeze({
    productName: props.BASIC_DATA.productName,
    productTypeID: props.BASIC_DATA.productTypeID,
    hairTypeID: props.BASIC_DATA.hairTypeID,
    brandID: props.BASIC_DATA.brandID,
    volume: props.BASIC_DATA.volume,
    countStock: props.BASIC_DATA.countStock,
    unitPrice: props.BASIC_DATA.unitPrice
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
    productID: props.BASIC_DATA.productID,
    productName: formData.productName,
    productTypeID: formData.productTypeID,
    hairTypeID: formData.hairTypeID,
    brandID: formData.brandID,
    volume: formData.volume,
    countStock: formData.countStock,
    unitPrice: formData.unitPrice
};

  const url = ProductsUrl.API_URL_UPDATE+'/'+props.BASIC_DATA.productID;

  fetch(url, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemToCreate)
  })
      .then(response => response.json())
      .then(responseFromServer => {
          console.log(responseFromServer);
          props.onProductUpdated(itemToCreate, responseFromServer);
      })
      .catch((error) => {
          console.log(error);
          alert(error);
      });
};

function getBrandsProductTypesHairTypes() {
const url = ProductsUrl.API_URL_OF_CREATE;

fetch(url, {
    method: 'GET'
})
.then(response => response.json())
.then(dataFromServer => {
    setUnionData(dataFromServer);
    console.log(dataFromServer);
})
.catch((error) => {
  console.log(error);
  alert(error);
});
}

useEffect(() => {
getBrandsProductTypesHairTypes()
}, [])

return (
  <form className="w-100 px-5">
      <h1 className="mt-5">Создать новую запись</h1>

      <div className="mt-5">
          <label className="h3 form-label">Название</label>
          <input value={formData.productName} name="productName" type="text" className="form-control" onChange={handleChange} />
      </div>

      <div className="mt-2">
          <label className="h3 form-label">Тип товара</label>
          <select value={formData.productTypeID} className="form-select" name="productTypeID" onChange={handleChange}>
            <option value={0}>выберите тип товара</option>
              {unionData.productTypes.map((item) => (
                  <option key={item.productTypeID} value={item.productTypeID}>{item.productTypeName}</option>
              ))}
          </select>
      </div>

      <div className="mt-2">
          <label className="h3 form-label">Тип волос</label>
          <select value={formData.hairTypeID} className="form-select" name="hairTypeID" onChange={handleChange}>
            <option value={0}>выберите тип волос</option>
              {unionData.hairTypes.map((item) => (
                  <option key={item.hairTypeID} value={item.hairTypeID}>{item.hairTypeName}</option>
              ))}
          </select>
      </div>

      <div className="mt-2">
          <label className="h3 form-label">Бренд</label>
          <select value={formData.brandID} className="form-select" name="brandID" onChange={handleChange}>
            <option value={0}>выберите бренд</option>
              {unionData.brands.map((item) => (
                  <option key={item.brandID} value={item.brandID}>{item.brandName}</option>
              ))}
          </select>
      </div>

      <div className="mt-2">
          <label className="h3 form-label">Объем</label>
          <input value={formData.volume} name="volume" type="text" className="form-control" onChange={handleChange} />
      </div>

      <div className="mt-2">
          <label className="h3 form-label">Количество</label>
          <input value={formData.countStock} name="countStock" type="text" className="form-control" onChange={handleChange} />
      </div>

      <div className="mt-2">
          <label className="h3 form-label">Стоимость</label>
          <input value={formData.unitPrice} name="unitPrice" type="text" className="form-control" onChange={handleChange} />
      </div>

      <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Сохранить</button>
      <button onClick={() => props.onProductUpdated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Назад</button>
  </form>
);
}
