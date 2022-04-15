import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';

export default function CheckCreateForm(props) {

    const initialFormData = Object.freeze({
        productID: props.CHECK_DATA.productID,
        productName: props.CHECK_DATA.productName,
        countStock: props.CHECK_DATA.countStock,
        unitPrice: props.CHECK_DATA.unitPrice,
        productQuantity: 1,
        props: props.CHECK_DATA.props,
        discount: props.CHECK_DATA.discountAmount,
        discountSumma: props.CHECK_DATA.discountSumma
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
        const newSumma = formData.productQuantity*props.CHECK_DATA.unitPrice*1
        const newDiscountSumma = (newSumma)-(newSumma*props.CHECK_DATA.discountAmount)

        const itemToAdd = {
            productID: props.CHECK_DATA.productID,
            productName: props.CHECK_DATA.productName,
            productQuantity: formData.productQuantity,
            unitPrice: props.CHECK_DATA.unitPrice,
            countStock: props.CHECK_DATA.countStock,
            summa: newSumma,
            discount: props.CHECK_DATA.discountAmount,
            discountSumma: newDiscountSumma
        };
        props.SET_CHECK_LIST(oldArray => [...oldArray, itemToAdd])

        props.SET_CHECK_DATA(null)
        props.setShowModal(false)
        // props.SET_ITOG(props.ITOG + newDiscountSumma)
    };

    const handleClose = () => {
        props.setShowModal(false)
        props.SET_CHECK_DATA(null)
    };

    return (
        <Modal show={props.showModal} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Добавление заказа</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="">
                    <label className="form-label">Товар</label>
                    <input value={formData.productName} name="productName" type="text" className="form-control" onChange={handleChange} disabled />
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