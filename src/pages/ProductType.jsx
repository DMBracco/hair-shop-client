import React, { useEffect, useState } from 'react'
import { ProductTypesUrl } from '../api/Constants';
import ProductTypeCreateForm from '../components/ProductType/ProductTypeCreateForm';
import ProductTypeUpdateForm from '../components/ProductType/ProductTypeUpdateForm';

const ProductType = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [showingCreateNewBrandForm, setShowingCreateNewBrandForm] = useState(false);
  const [brandCurrentlyBeingUpdated, setBrandCurrentlyBeingUpdated] = useState(null);

  function getData() {
    const url = ProductTypesUrl.API_URL_GET_ALL;

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(dataFromServer => {
        setProductTypes(dataFromServer);
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
    const url = `${ProductTypesUrl.API_URL_DELETE_BY_ID}/${id}`;

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
              <h1>Виды продуктов</h1>

              <div className="mt-4">
                {/* <button onClick={getData} className="btn btn-dark btn-lg w-100">Получить данные</button> */}
                <button onClick={() => setShowingCreateNewBrandForm(true)} className="btn btn-secondary btn-lg w-100">Создать запись</button>
              </div>
            </div>
          )}

          {(productTypes.length > 0 && showingCreateNewBrandForm === false && brandCurrentlyBeingUpdated === null) && renderDataTable()}

          {showingCreateNewBrandForm && <ProductTypeCreateForm onCreated={onCreated} />}

          {brandCurrentlyBeingUpdated !== null && <ProductTypeUpdateForm productType={brandCurrentlyBeingUpdated} onUpdated={onUpdated} />}
        </div>
    </div>
  )

  function renderDataTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Названием</th>
              <th scope="col">Операции</th>
            </tr>
          </thead>
          <tbody>
            {productTypes.map((item) => (
              <tr key={item.productTypeID}>
                <td>{item.productTypeName}</td>
                <td>
                  <button onClick={() => setBrandCurrentlyBeingUpdated(item)} className="btn btn-success mx-2">Изменить</button>
                  <button onClick={() => { if(window.confirm(`Вы уверены, что хотите удалить сообщение под названием "${item.productTypeName}"?`)) deletePost(item.productTypeId) }} className="btn btn-danger mx-2">Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <button onClick={() => setProductTypes([])} className="btn btn-dark btn-lg w-100">Очистить</button> */}
      </div>
    );
  }

  function onCreated(createdBrand) {
    setShowingCreateNewBrandForm(false);

    if (createdBrand === null) {
      return;
    }

    alert(`Сообщение успешно создано. "${createdBrand.productTypeName}" появится в таблице ниже`);

    getData();
  }

  function onUpdated(updatedData) {
    setBrandCurrentlyBeingUpdated(null);

    if (updatedData === null) {
      return;
    }

    let copyData = [...productTypes];

    const index = copyData.findIndex((copyDataPost, currentIndex) => {
      if (copyDataPost.productTypeID === updatedData.productTypeID) {
        return true;
      }
    });

    if (index !== -1) {
      copyData[index] = updatedData;
    }

    setProductTypes(copyData);

    alert(`Сообщение успешно обновлено по ID - "${updatedData.productTypeID}".`);
  }

  function onDeleted(deletedItemByID) {
    let copyData = [...productTypes];

    const index = copyData.findIndex((copyDataPost, currentIndex) => {
      if (copyDataPost.productTypeID === deletedItemByID) {
        return true;
      }
    });

    if (index !== -1) {
      copyData.splice(index, 1);
    }

    setProductTypes(copyData);

    alert('Сообщение успешно удалено.');
  }
}

export default ProductType