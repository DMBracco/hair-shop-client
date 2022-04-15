import React, { useEffect, useState } from 'react'
import { ProductsUrl } from '../api/Constants';
import ProductCreateForm from '../components/Products/ProductCreateForm';
import ProductsUpdateForm from '../components/Products/ProductsUpdateForm';

const Products = () => {
  const [BASIC_DATA, setBASIC_DATA] = useState([]);
    const [showingCreateNewBrandForm, setShowingCreateNewBrandForm] = useState(false);
    const [brandCurrentlyBeingUpdated, setBrandCurrentlyBeingUpdated] = useState(null);
  
    function getData() {
      const url = ProductsUrl.API_URL_GET_ALL_OF_SYPPLY;
  
      fetch(url, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(dataFromServer => {
          setBASIC_DATA(dataFromServer);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }

    useEffect(() => {
      getData()
    },)
  
    function deletePost(id) {
      const url = `${ProductsUrl.API_URL_DELETE_BY_ID}/${id}`;
  
      fetch(url, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(responseFromServer => {
          console.log(responseFromServer);
          onDeleted(id);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  
    return (
      <div className="row">
          <div className="col d-flex flex-column justify-content-center align-items-center">
            {(showingCreateNewBrandForm === false && brandCurrentlyBeingUpdated === null) && (
              <div>
                <h1>Продукты</h1>
  
                <div className="">
                  {/* <button onClick={getData} className="btn btn-dark btn-lg w-100">Получить данные</button> */}
                  {/* <button onClick={() => setShowingCreateNewBrandForm(true)} className="btn btn-secondary btn-lg w-100 mt-4">Создать запись</button> */}
                </div>
              </div>
            )}
  
            {(BASIC_DATA.length > 0 && showingCreateNewBrandForm === false && brandCurrentlyBeingUpdated === null) && renderDataTable()}
  
            {showingCreateNewBrandForm && <ProductCreateForm onCreated={onCreated} />}
  
            {brandCurrentlyBeingUpdated !== null && <ProductsUpdateForm BASIC_DATA={brandCurrentlyBeingUpdated} onUpdated={onUpdated} />}
          </div>
      </div>
    )
  
    function renderDataTable() {
      return (
        <div className="table-responsive mt-2">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Название</th>
                <th scope="col">Тип товара</th>
                <th scope="col">Тип волос</th>
                <th scope="col">Бренд</th>
                <th scope="col">Объем</th>
                <th scope="col">Количество</th>
                <th scope="col">Стоимость</th>
                {/* <th scope="col">Операции</th> */}
              </tr>
            </thead>
            <tbody>
              {BASIC_DATA.map((item) => (
                <tr key={item.productID}>
                  <td>{item.productName}</td>
                  <td>{item.productTypeName}</td>
                  <td>{item.hairTypeName}</td>
                  <td>{item.brandName}</td>
                  <td>{item.volume}</td>
                  <td>{item.countStock}</td>
                  <td>{item.unitPrice}</td>
                  {/* <td>
                    <button onClick={() => setBrandCurrentlyBeingUpdated(item)} className="btn btn-success mx-2">Изменить</button>
                    <button onClick={() => { if(window.confirm(`Вы уверены, что хотите удалить запись под ID "${item.productID}"?`)) deletePost(item.productID) }} className="btn btn-danger mx-2">Удалить</button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
  
          {/* <button onClick={() => setBASIC_DATA([])} className="btn btn-dark btn-lg w-100">Очистить</button> */}
        </div>
      );
    }
  
    function onCreated(createdBrand, responseFromServer) {
      setShowingCreateNewBrandForm(false);
  
      if (createdBrand === null) {
        return;
      }
  
      alert(`${responseFromServer}`);
  
      getData();
    }
  
    function onUpdated(updatedData, responseFromServer) {
      setBrandCurrentlyBeingUpdated(null);
  
      if (updatedData === null) {
        return;
      }

      getData();
  
      alert(`${responseFromServer}`);
    }
  
    function onDeleted(deletedItemByID) {
      let copyData = [...BASIC_DATA];
  
      const index = copyData.findIndex((copyDataPost, currentIndex) => {
        if (copyDataPost.productID === deletedItemByID) {
          return true;
        }
      });
  
      if (index !== -1) {
        copyData.splice(index, 1);
      }
  
      setBASIC_DATA(copyData);
  
      alert('Сообщение успешно удалено.');
    }
}

export default Products