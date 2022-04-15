import React, { useEffect, useState } from 'react'
import { BrandsUrl } from '../api/Constants';
import BrandCreateForm from '../components/Brand/BrandCreateForm';
import BrandUpdateForm from '../components/Brand/BrandUpdateForm';

const Brands = () => {
    const [brands, setBrands] = useState([]);
  const [showingCreateNewBrandForm, setShowingCreateNewBrandForm] = useState(false);
  const [brandCurrentlyBeingUpdated, setBrandCurrentlyBeingUpdated] = useState(null);

  function getBrands() {
    const url = BrandsUrl.API_URL_GET_ALL;

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(brandsFromServer => {
        setBrands(brandsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  useEffect(() => {
    getBrands()
  },)

  function deletePost(brandID) {
    const url = `${BrandsUrl.API_URL_DELETE_BY_ID}/${brandID}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
        onPostDeleted(brandID);
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
              <h1>Бренды</h1>

              <div className="mt-4">
                {/* <button onClick={getBrands} className="btn btn-dark btn-lg w-100">Получить данные</button> */}
                <button onClick={() => setShowingCreateNewBrandForm(true)} className="btn btn-secondary btn-lg w-100">Создать запись</button>
              </div>
            </div>
          )}

          {(brands.length > 0 && showingCreateNewBrandForm === false && brandCurrentlyBeingUpdated === null) && renderBrandsTable()}

          {showingCreateNewBrandForm && <BrandCreateForm onBrandCreated={onBrandCreated} />}

          {brandCurrentlyBeingUpdated !== null && <BrandUpdateForm brand={brandCurrentlyBeingUpdated} onBrandUpdated={onBrandUpdated} />}
        </div>
    </div>
  )

  function renderBrandsTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Операции</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brandItem) => (
              <tr key={brandItem.brandID}>
                <td>{brandItem.brandName}</td>
                <td>
                  <button onClick={() => setBrandCurrentlyBeingUpdated(brandItem)} className="btn btn-success mx-2">Изменить</button>
                  <button onClick={() => { if(window.confirm(`Вы уверены, что хотите удалить сообщение под названием "${brandItem.brandName}"?`)) deletePost(brandItem.brandID) }} className="btn btn-danger mx-2">Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <button onClick={() => setBrands([])} className="btn btn-dark btn-lg w-100">Очистить</button> */}
      </div>
    );
  }

  function onBrandCreated(createdBrand) {
    setShowingCreateNewBrandForm(false);

    if (createdBrand === null) {
      return;
    }

    alert(`Сообщение успешно создано. "${createdBrand.brandName}" появится в таблице ниже`);

    getBrands();
  }

  function onBrandUpdated(updatedBrand) {
    setBrandCurrentlyBeingUpdated(null);

    if (updatedBrand === null) {
      return;
    }

    let brandsCopy = [...brands];

    const index = brandsCopy.findIndex((brandsCopyPost, currentIndex) => {
      if (brandsCopyPost.brandID === updatedBrand.brandID) {
        return true;
      }
    });

    if (index !== -1) {
      brandsCopy[index] = updatedBrand;
    }

    setBrands(brandsCopy);

    alert(`Сообщение успешно обновлено. После нажатия кнопки «ОК» найдите сообщение с ID - "${updatedBrand.brandID}" в таблице ниже, чтобы просмотреть обновления.`);
  }

  function onPostDeleted(deletedBrandBrandID) {
    let brandsCopy = [...brands];

    const index = brandsCopy.findIndex((brandsCopyPost, currentIndex) => {
      if (brandsCopyPost.brandID === deletedBrandBrandID) {
        return true;
      }
    });

    if (index !== -1) {
      brandsCopy.splice(index, 1);
    }

    setBrands(brandsCopy);

    alert('Сообщение успешно удалено. Нажав OK, посмотрите на таблицу ниже, чтобы увидеть, как ваше сообщение исчезло.');
  }
}

export default Brands