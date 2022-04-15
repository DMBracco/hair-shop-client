import React, { useEffect, useState } from 'react'
import formatDate, { ProductsUrl, SuppliesUrl } from '../api/Constants';
import ProductCreateForm from '../components/Products/ProductCreateForm';
import ProductsUpdateForm from '../components/Products/ProductsUpdateForm';
import SupplyCreateForm from '../components/Supply/SupplyCreateForm';
import SupplyUpdateForm from '../components/Supply/SupplyUpdateForm';

const Supply = () => {
    const [BASIC_DATA, setBASIC_DATA] = useState([]);
    const [showProductCreated, setShowProductCreated] = useState(false);
    const [showSupplyCreated, setShowSupplyCreated] = useState(false);
    const [showProductUpdated, setProductUpdated] = useState(null);
    const [dataChecked, setDataChecked] = useState([]);
  
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
  
    return (
      <div className="row justify-content-center">
        <div className="col-12">
          {showProductCreated && <ProductCreateForm onProductCreated={onProductCreated} />}
          {showProductUpdated !== null && <ProductsUpdateForm BASIC_DATA={showProductUpdated} onProductUpdated={onProductUpdated} />}
        </div>
        
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
    )
  
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
                    <button onClick={() => setProductUpdated(item)} className="btn btn-success mx-2">Изменить</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  
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
    }
  
    function onProductUpdated(updatedData, responseFromServer) {
      setProductUpdated(null);
  
      if (updatedData === null) {
        return;
      }

      getData();
  
      alert(`${responseFromServer}`);
    }
}

export default Supply