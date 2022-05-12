import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react'

export default function UpdateProducrtToSuppply(props) {
    const initialFormData = Object.freeze({
        countStock: props.productUpdated.countStock,
        unitPrice: props.productUpdated.unitPrice
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
            productID: props.productUpdated.productID,
            countStock: formData.countStock,
            unitPrice: formData.unitPrice,
            productName: props.productUpdated.productName,
            productTypeID: props.productUpdated.productTypeID,
            hairTypeID: props.productUpdated.hairTypeID,
            brandID: props.productUpdated.brandID,
            volume: props.productUpdated.volume
        };

        props.onProductUpdatedToSuppply(itemToCreate);
    };

    const handleClose = () => {
        props.onProductUpdatedToSuppply(null)
    };

  return (
    <Modal show={props.showModal} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Добавление заказа</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="">
                <label className="form-label">Название</label>
                <p className="form-control">{props.productUpdated.productName}</p>
            </div>
            <div className="mt-2">
                <label className="h3 form-label">Количество</label>
                <input value={formData.countStock} name="countStock" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-2">
                <label className="h3 form-label">Стоимость</label>
                <input value={formData.unitPrice} name="unitPrice" type="text" className="form-control" onChange={handleChange} />
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
  )
}