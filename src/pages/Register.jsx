import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AccountsUrl } from '../api/Constants';

const Register = () => {

    const [formData, setFormData] = useState({
        email:"",
        password: "",
        passwordConfirm: "",
        roleName: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const register = event => {
        event.preventDefault();

        if(formData.password !== formData.passwordConfirm){
            alert(`Пароли не совпадают`);
            return
        }

        const itemToCreate = {
            email: formData.email,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm,
            roleName: formData.roleName
        };

        const url = AccountsUrl.API_URL_REGISTER_USER;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer.message);
                alert(responseFromServer.message);
            })
            .catch((error) => {
                console.log(error);
                //alert(error);
            });
    }
      
  return (
    <div className='row align-items-center justify-content-center'>
            <div className='col-6'>
                <h1>Регистрация</h1>
                <form className="w-100 px-5">
                    <div className="mt-5">
                        <label className="h3 form-label">Email</label>
                        <input value={formData.email} name="email" type="email" className="form-control" onChange={handleChange} />
                    </div>
                    <div className="mt-2">
                        <label className="h3 form-label">Пароль</label>
                        <input value={formData.password} name="password" type="password" className="form-control" onChange={handleChange} />
                    </div>
                    <div className="mt-2">
                        <label className="h3 form-label">Подтвердить пароль</label>
                        <input value={formData.passwordConfirm } name="passwordConfirm" type="password" className="form-control" onChange={handleChange} />
                    </div>
                    
                    <div className="mt-2">
                        <label className="h3 form-label">Тип роли</label>
                        <SelectRole handleChange={handleChange} formData={formData}></SelectRole>
                    </div>
                    <Button variant="contained" onClick={register} sx={{ m: 2 }}>Зарегистрироваться</Button>
                    <Link to="login" >Войти</Link>
                </form>
            </div>
        </div>
  )
}

export default Register

function SelectRole(props) {
    const [rolesData, setRolesData] = useState(null);
  
    useEffect(() => {
        const url = AccountsUrl.API_URL_GET_ROLES;
      
        fetch(url, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(dataFromServer => {
            setRolesData(dataFromServer);
            console.log(dataFromServer);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }, []);

    if (rolesData === null) {
      return <h2>Loading role...</h2>;
    }
    return (
        <select value={props.formData.roleName} className="form-select" name="roleName" onChange={props.handleChange}>
            <option value={0}>выберите роль</option>
            {rolesData.map((item) => (
                <option key={item} value={item}>{item}</option>
            ))}
        </select>
    );
  }