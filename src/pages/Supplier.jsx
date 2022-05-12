import React, { useEffect, useState } from 'react'
import { SuppliersUrl } from '../api/Constants';
import SupplierCreateForm from '../components/Supplier/SupplierCreateForm';
import SupplierUpdateForm from '../components/Supplier/SupplierUpdateForm';

const Supplier = () => {
    const [BASIC_DATA, setBASIC_DATA] = useState([]);
    const [showingCreateNewBrandForm, setShowingCreateNewBrandForm] = useState(false);
    const [brandCurrentlyBeingUpdated, setBrandCurrentlyBeingUpdated] = useState(null);
  
    function getData() {
      const url = SuppliersUrl.API_URL_GET_ALL;
  
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
      const url = `${SuppliersUrl.API_URL_DELETE_BY_ID}/${id}`;
  
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
                <h1>Поставщики</h1>
  
                <div className="mt-4">
                  {/* <button onClick={getData} className="btn btn-dark btn-lg w-100">Получить данные</button> */}
                  <button onClick={() => setShowingCreateNewBrandForm(true)} className="btn btn-secondary btn-lg w-100">Создать запись</button>
                </div>
              </div>
            )}
  
            {(BASIC_DATA.length > 0 && showingCreateNewBrandForm === false && brandCurrentlyBeingUpdated === null) && renderDataTable()}
  
            {showingCreateNewBrandForm && <SupplierCreateForm onCreated={onCreated} />}
  
            {brandCurrentlyBeingUpdated !== null && <SupplierUpdateForm BASIC_DATA={brandCurrentlyBeingUpdated} onUpdated={onUpdated} />}
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
                <th scope="col">Номер</th>
                <th scope="col">Операции</th>
              </tr>
            </thead>
            <tbody>
              {BASIC_DATA.map((item) => (
                <tr key={item.supplierID}>
                  <td>{item.supplierName}</td>
                  <td>{item.phonenumber}</td>
                  <td>
                    <button onClick={() => setBrandCurrentlyBeingUpdated(item)} className="btn btn-success mx-2">Изменить</button>
                    {/* <button onClick={() => { if(window.confirm(`Вы уверены, что хотите удалить запись под названием "${item.supplierName}"?`)) deletePost(item.supplierID) }} className="btn btn-danger mx-2">Удалить</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          {/* <button onClick={() => setBASIC_DATA([])} className="btn btn-dark btn-lg w-100">Очистить</button> */}
        </div>
      );
    }
  
    function onCreated(createdBrand) {
      setShowingCreateNewBrandForm(false);
  
      if (createdBrand === null) {
        return;
      }
  
      alert(`Сообщение успешно создано. "${createdBrand.supplierName}" появится в таблице ниже`);
  
      getData();
    }
  
    function onUpdated(updatedData) {
      setBrandCurrentlyBeingUpdated(null);
  
      if (updatedData === null) {
        return;
      }
  
      let copyData = [...BASIC_DATA];
  
      const index = copyData.findIndex((copyDataPost, currentIndex) => {
        if (copyDataPost.supplierID === updatedData.supplierID) {
          return true;
        }
      });
  
      if (index !== -1) {
        copyData[index] = updatedData;
      }
  
      setBASIC_DATA(copyData);
  
      alert(`Сообщение успешно обновлено по ID - "${updatedData.supplierID}".`);
    }
  
    function onDeleted(deletedItemByID) {
      let copyData = [...BASIC_DATA];
  
      const index = copyData.findIndex((copyDataPost, currentIndex) => {
        if (copyDataPost.supplierID === deletedItemByID) {
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

export default Supplier