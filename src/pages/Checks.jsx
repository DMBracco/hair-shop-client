
import React, { useState, useEffect } from 'react'
import { ProductsUrl } from '../api/Constants';
import CheckCreateForm from '../components/Check/CheckCreateForm';

const Checks = () => {
  const initialITOG = Object.freeze({
    count: 0
  })

    const [PRODUCT_DATA, SET_PRODUCT_DATA] = useState([]);
    const [CHECK_LIST, SET_CHECK_LIST] = useState([]);
    const [CHECK_DATA, SET_CHECK_DATA] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [ITOG, SET_ITOG] = useState(initialITOG);
    const [RECEIVED, SET_RECEIVED] = useState({received: 0});
    const [MONEY, SET_MONEY] = useState({out: 0});


    const handleShowModal = (product) => {
        setShowModal(true)
        SET_CHECK_DATA(product)
    };

    const handleChange = (e) => {
      SET_RECEIVED({
          ...RECEIVED,
          [e.target.name]: e.target.value,
      });
    };

    const clearCheck =(e) => {
      SET_CHECK_LIST([])
      SET_ITOG({count: 0})
      SET_RECEIVED({received: 0})
      SET_MONEY({out: 0})
    }

    function getProduct() {
        const url = ProductsUrl.API_URL_GET_ALL_OF_SYPPLY;
    
        fetch(url, {
          method: 'GET'
        })
          .then(response => response.json())
          .then(dataFromServer => {
            SET_PRODUCT_DATA(dataFromServer);
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      }

      useEffect(() => {
        SET_ITOG({count: 0})
        let sum = 0;
        if(null != CHECK_LIST) {
          CHECK_LIST.forEach((item) => {
            sum = sum + item.summa
          });
          SET_ITOG({count: sum})

          if(0<(RECEIVED.received-sum))
          SET_MONEY({out: RECEIVED.received-sum})
        }

      }, [CHECK_LIST, RECEIVED])

      useEffect(() => {
        getProduct()
      }, [])


  
    return (
    <div>
        <div className="row">
          <div className="col-12"><h1>Оформление покупки</h1></div>
            <div className="col-8 d-flex flex-column justify-content-center align-items-center">
                <div>
                    {renderProductTable()}
                </div>
            </div>
            
            <div className="col-4 justify-content-center align-items-center">
              <div className="mt-5">
                  <label className="h5 form-label">Итог</label>
                  <p className="form-control">{ITOG.count}</p>
              </div>
              <div className="">
                  <label className="form-label">Получено</label>
                  <input value={RECEIVED.received} name="received" type="text" className="form-control" onChange={handleChange} />
              </div>
              <div className="">
                  <label className="form-label">Сдача</label>
                  <p className="form-control">{MONEY.out}</p>
              </div>
              <button className="btn btn-primary btn-lg w-100 mt-2" onClick={() => {{ if(window.confirm(`Заказ оплачен`)) clearCheck()}}}>Оплатить</button>
            </div>

            <div className="col-8 justify-content-center align-items-center">
              {/* <CheckActions CHECK_LIST={CHECK_LIST} SET_CHECK_LIST={SET_CHECK_LIST} /> */}
              <div className="table-responsive mt-5">
                  <h4>Заказ</h4>
                  <table className="table table-striped">
                  <thead>
                      <tr>
                      <th scope="col">Название</th>
                      <th scope="col">Количество</th>
                      <th scope="col">Цена</th>
                      <th scope="col">Сумма конечная</th>

                      <th scope="col">Операции</th>
                      </tr>
                  </thead>
                  <tbody>
                      {CHECK_LIST.map((item) => (
                      <tr key={item.productID}>
                          <td>{item.productName}</td>
                          <td>{item.productQuantity}</td>
                          <td>{item.unitPrice}</td>
                          <td>{item.summa}</td>
                          <td>
                          {/* <button onClick={() => setBrandCurrentlyBeingUpdated(item)} className="btn btn-success mx-2">Изменить</button> */}
                          <button onClick={() => { if(window.confirm(`Вы уверены, что хотите удалить запись под ID "${item.productID}"?`)) deleteCheck(item.productID) }} className="btn btn-danger mx-2">Удалить</button>
                          </td>
                      </tr>
                      ))}
                  </tbody>
                  </table>

                  <button onClick={() => { if(window.confirm(`Вы уверены, что хотите очистить заказ?`)) {SET_CHECK_LIST([]); SET_ITOG(0)}}} className="btn btn-dark btn-lg w-100">Очистить</button>
              </div>
            </div>
        </div>
        {CHECK_DATA !== null && <CheckCreateForm 
                CHECK_DATA={CHECK_DATA} 
                SET_CHECK_DATA={SET_CHECK_DATA} 
                SET_CHECK_LIST={SET_CHECK_LIST} 
                setShowModal={setShowModal} 
                showModal={showModal}
                SET_ITOG={SET_ITOG}
                ITOG={ITOG}/>
            }
    </div>
    )

    function renderProductTable() {
        return (
          <div className="table-responsive mt-3">
            <h4>Товары</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Название</th>
                  <th scope="col">Объем</th>
                  <th scope="col">Цена</th>
                  <th scope="col">Операции</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCT_DATA.map((item) => (
                  <tr key={item.productID}>
                    <td>{item.productName}</td>
                    <td>{item.volume}</td>
                    <td>{item.unitPrice}</td>
                    <td>
                      <button onClick={() => handleShowModal(item)} className="btn btn-success mx-2">Выбрать</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      function deleteCheck(deletedItemByID) {
        let copyData = [...CHECK_LIST];
    
        const index = copyData.findIndex((copyDataPost, currentIndex) => {
          if (copyDataPost.productID === deletedItemByID) {
            return true;
          }
        });
    
        if (index !== -1) {
          copyData.splice(index, 1);
        }
    
        SET_CHECK_LIST(copyData);
      }
}

export default Checks