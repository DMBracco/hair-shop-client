import React, { useContext, useState } from 'react'
import { AccountsUrl } from '../api/Constants';
import { AuthContext } from '../context/authContext';

const Login = () => {
    const {isAuth, setIsAuth, setUserRole} = useContext(AuthContext);

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

        const url = AccountsUrl.API_URL_CHECK_USER+`?email=${itemToCreate.email}&password=${itemToCreate.password}`;

        fetch(url, {
            method: 'GET'
          })
            .then(response => response.json())
            .then(responseFromServer => {
                //console.log(responseFromServer);

                if(responseFromServer.roleName){
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
                <form onSubmit={login} className="w-100 px-5">
                    <div className="mt-5">
                        <label className="h3 form-label">Email</label>
                        <input value={formData.email} name="email" type="email" className="form-control" onChange={handleChange} />
                    </div>
                    <div className="mt-5">
                        <label className="h3 form-label">Пароль</label>
                        <input value={formData.password} name="password" type="password" className="form-control" onChange={handleChange} />
                    </div>
                    <button className="btn btn-dark btn-lg w-100 mt-5">Войти</button>
                </form>
            </div>
        </div>
    );
};

export default Login