import React, { useEffect, useState } from 'react'
import { ProductsUrl } from '../api/Constants';
import ProductCreateForm from '../components/Products/ProductCreateForm';
import SupplyCreateForm from '../components/Supply/SupplyCreateForm';
import UpdateProducrtToSuppply from '../components/Supply/UpdateProducrtToSuppply';

const Supply = () => {
    const [BASIC_DATA, setBASIC_DATA] = useState([]);
    const [showProductCreated, setShowProductCreated] = useState(false);
    const [showSupplyCreated, setShowSupplyCreated] = useState(false);
    const [productUpdated, setProductUpdated] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    function getData() {
      const url = ProductsUrl.API_URL_GET_ALL;
  
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
    },[])

    const handleCheckbox = (id) => {
      const newList = BASIC_DATA.map((item) => {
        if (item.productID === id) {
          const updatedItem = {
            ...item,
            check: !item.check,
          };
  
          return updatedItem;
        }
  
        return item;
      });
      console.log(newList);
  
      setBASIC_DATA(newList);
    }

    const handleShowModal = (item) => {
      setShowModal(true);
      setProductUpdated(item);
    };

    useEffect(() => {
      getData()
    },[])

    function renderProductTable() {
      return (
        <div className="table-responsive mt-2">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" width="5%">Выберите</th>
                <th scope="col">Название</th>
                <th scope="col">Объем</th>
                <th scope="col">Количество</th>
                <th scope="col">Стоимость</th>
                {/* <th scope="col">Операции</th> */}
              </tr>
            </thead>
            <tbody>
              {BASIC_DATA.map((item) => (
                <tr key={item.productID}>
                  <th scope="row">
                  <input type="checkbox"
                      checked={item.check}
                      onChange={() => handleCheckbox(item.productID)}
                    />
                  </th>
                  <td>{item.productName}</td>
                  <td>{item.volume}</td>
                  <td>{item.countStock}</td>
                  <td>{item.unitPrice}</td>
                  <td>
                    <button onClick={() => handleShowModal(item)} className="btn btn-success mx-2">Изменить</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  
    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-12">
            {showProductCreated && <ProductCreateForm onProductCreated={onProductCreated} />}
          </div>
          {!showProductCreated 
            && 
            <div className="row">
              <div className="col-4">
                <h1>Поставки</h1>
                <SupplyCreateForm onCreated={onSupplyCreated} productData={BASIC_DATA} />
              </div>
              <div className="col-8">
                <h1>Выберите товары</h1>
                {renderProductTable()}
                <button onClick={() => setShowProductCreated(true)} className="btn btn-secondary btn-lg w-100 mt-4">Создать запись</button> 
              </div>
            </div>
          }
        </div>
        {productUpdated !== null && <UpdateProducrtToSuppply productUpdated={productUpdated} showModal={true} onProductUpdatedToSuppply={onProductUpdatedToSuppply} />}
      </div>
    )
  
    function onProductCreated(createdProduct, responseFromServer) {
      setShowProductCreated(false);
  
      if (createdProduct === null) {
        return;
      }
  
      alert(`${responseFromServer}`);
  
      getData();
    }

    function onSupplyCreated(createdProduct, responseFromServer) {
      setShowSupplyCreated(false);
  
      if (createdProduct === null) {
        return;
      }
  
      alert(`${responseFromServer}`);

      getData();///для продуктов
    }
  
    function onProductUpdatedToSuppply(updatedData) {
      setProductUpdated(null);
      setShowModal(false);
  
      if (updatedData === null) {
        return;
      }
  
      let dataCopy = [...BASIC_DATA];

      const index = dataCopy.findIndex((dataCopyPost) => {
        if (dataCopyPost.productID === updatedData.productID) {
          return true;
        }
      });

      if (index !== -1) {
        dataCopy[index] = updatedData;
      }
      console.log(dataCopy);

      setBASIC_DATA(dataCopy);

      alert(`Данные успешно обновлено.`);
    }
}

export default Supply