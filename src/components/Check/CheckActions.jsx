import React, { useState, useEffect }  from 'react'

const CheckActions = (props) => {

  return (
    <div className="table-responsive mt-5">
        <h4>Заказ</h4>
        <table className="table table-striped">
        <thead>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Название</th>
            <th scope="col">Количество</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Сумма без скидки</th>
            <th scope="col">Скидка</th>
            <th scope="col">Сумма конечная</th>
            <th scope="col">Операции</th>
            </tr>
        </thead>
        <tbody>
            {props.CHECK_LIST.map((item) => (
            <tr key={item.productID}>
                <th scope="row">{item.productID}</th>
                <td>{item.productName}</td>
                <td>{item.countStock}</td>
                <td>{item.unitPrice}</td>
                <td>{item.productQuantity}</td>
                <td>{item.props}</td>
                <td>{item.discount}</td>
                <td>{item.discountSumma}</td>
                <td>
                {/* <button onClick={() => setBrandCurrentlyBeingUpdated(item)} className="btn btn-success mx-2">Изменить</button>
                <button onClick={() => { if(window.confirm(`Вы уверены, что хотите удалить запись под ID "${item.supplyID}"?`)) deletePost(item.supplyID) }} className="btn btn-danger mx-2">Удалить</button> */}
                </td>
            </tr>
            ))}
        </tbody>
        </table>

        {/* <button onClick={() => { if(window.confirm(`Вы уверены, что хотите очистить заказ?`)) props.onClean()}} className="btn btn-dark btn-lg w-100">Очистить</button> */}
    </div>
  )
}

export default CheckActions