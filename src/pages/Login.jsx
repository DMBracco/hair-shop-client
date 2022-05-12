import { Button } from '@mui/material';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AccountsUrl } from '../api/Constants';
import { AuthContext } from '../context/authContext';

const Login = () => {
    const {setIsAuth, setUserRole} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email:"",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const login = event => {
        event.preventDefault();

        const itemToCreate = {
            email: formData.email,
            password: formData.password
        };

        const url = AccountsUrl.API_URL_LOGIN_USER;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
                alert(responseFromServer.message);
                if(responseFromServer.roleName.length > 0){
                    setIsAuth(true);
                    setUserRole(responseFromServer.roleName)
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('role', responseFromServer.roleName)
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    return (
        <div className='row align-items-center justify-content-center'>
            <div className='col-6'>
                <h1>Вход</h1>
                <form className="w-100 px-5">
                    <div className="mt-2">
                        <label className="h3 form-label">Email</label>
                        <input value={formData.email} name="email" type="email" className="form-control" onChange={handleChange} />
                    </div>
                    <div className="mt-2">
                        <label className="h3 form-label">Пароль</label>
                        <input value={formData.password} name="password" type="password" className="form-control" onChange={handleChange} />
                    </div>
                    <Button variant="contained" onClick={login} sx={{ m: 2 }}>Войти</Button>
                    <Link 
                        to={'register'}
                    >
                        Регистрация
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login