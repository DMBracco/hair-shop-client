import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';

export default function CheckCreateForm(props) {

    const initialFormData = Object.freeze({
        productID: props.CHECK_DATA.productID,
        productName: props.CHECK_DATA.productName,
        countStock: props.CHECK_DATA.countStock,
        unitPrice: props.CHECK_DATA.unitPrice,
        productQuantity: 1,
        volume: props.CHECK_DATA.volume,
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
        let count = formData.productQuantity;

        if((props.CHECK_DATA.countStock - formData.productQuantity) < 0){
            alert(`Столько товара нет на складе`);
            return
        }

        const newSumma = formData.productQuantity*props.CHECK_DATA.unitPrice*1

        const itemToAdd = {
            productID: props.CHECK_DATA.productID,
            productName: props.CHECK_DATA.productName,
            unitPrice: props.CHECK_DATA.unitPrice,
            countStock: count,
            volume: props.CHECK_DATA.volume,
            summa: newSumma
        };
        console.log(itemToAdd);
        props.SET_CHECK_LIST(oldArray => [...oldArray, itemToAdd])

        props.SET_CHECK_DATA(null)
        props.setShowModal(false)

        const itemCopy = {
            productID: props.CHECK_DATA.productID,
            productName: props.CHECK_DATA.productName,
            unitPrice: props.CHECK_DATA.unitPrice,
            countStock: count,
            volume: props.CHECK_DATA.volume
        };
        props.onProductUpdated(itemCopy)
    };

    const handleClose = () => {
        props.setShowModal(false)
        props.SET_CHECK_DATA(null)
        props.onProductUpdated(null)
    };

    return (
        <Modal show={props.showModal} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Добавление заказа</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="">
                    <label className="form-label">Товар</label>
                    <p className="form-control">{formData.productName}c</p>
                </div>
                <div className="">
                    <label className="form-label">Количество</label>
                    <input value={formData.productQuantity} name="productQuantity" type="text" className="form-control" onChange={handleChange} />
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Закрыть
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Добавить
            </Button>
            </Modal.Footer>
        </Modal>
    );
}