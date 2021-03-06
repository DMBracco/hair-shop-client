import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link, Outlet  } from 'react-router-dom';
import Brands from './pages/Brands';
import Products from './pages/Products';
import ProductType from './pages/ProductType';
import Supplier from './pages/Supplier';
import Supply from './pages/Supply';
import Checks from './pages/Checks';
import { AuthContext } from './context/authContext';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import { UserRole } from './api/Constants';
import Register from './pages/Register';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
      if (localStorage.getItem('auth')) {
          setIsAuth(true)
          setUserRole(localStorage.getItem('role'))
      }
      setLoading(false);
  }, [])

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth')
  }

  function RoleRoutes (props) {
    console.log(props.userRole);
    if (props.userRole[0] === UserRole.ADMIN){
      return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="brands" element={<Brands />} />
            <Route path="products" element={<Products />} />
            <Route path="productTypes" element={<ProductType />} />
            <Route path="suppliers" element={<Supplier />} />
            <Route path="supplies" element={<Supply />} />
            <Route path="*" element={<Privet />}/>
          </Route>
        </Routes>
      )
    }
    else {
      return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<Privet />}/>
            <Route path="checks" element={<Checks />} />
          </Route>
        </Routes>
      )
    }
  }

  return (
    <AuthContext.Provider value={{
        isAuth,
        setIsAuth,
        isLoading,
        setUserRole
    }}>
      <BrowserRouter>
        {isAuth
          ?
            <RoleRoutes userRole={userRole}/>
          :
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<Login />}/>
              </Route>
            </Routes>
        }
          
      </BrowserRouter>
    </AuthContext.Provider>
  );

  function Layout() {
    return (
      <div>
        <AppBar position="static">
          <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              sx={{ mr: 2, display: 'flex' }}
              component="div"
            >
              HairShop
            </Typography>
            {isAuth
              ?
              <>
                <NavLink userRole={userRole} />
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                  <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    onClick={logout}
                  >
                    ??????????
                  </Button>
                </Box>
              </>
              :
              <Box sx={{ flexGrow: 1, display: 'flex' }}>
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={Link} 
                  to={'login'}
                >
                  ??????????
                </Button>

                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={Link} 
                  to={'register'}
                >
                  ??????????????????????
                </Button>
              </Box>
            }
            </Toolbar>
          </Container>
        </AppBar>
        {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
        <Container className="pt-3">
          <Outlet />
        </Container>
      </div>
    );
  }
}

function NavLink(props) {
  ///console.log(props.userRole);
  if (props.userRole[0] === UserRole.ADMIN){
    return (
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Button
            sx={{ my: 2, color: 'white', display: 'block' }}
            component={Link} 
            to={'brands'}
        >
            ????????????
        </Button>
        <Button
            sx={{ my: 2, color: 'white', display: 'block' }}
            component={Link} 
            to={'products'}
        >
            ?????????????????? ??????????????
        </Button>
        <Button
            sx={{ my: 2, color: 'white', display: 'block' }}
            component={Link} 
            to={'productTypes'}
        >
            ???????? ??????????????
        </Button>
        <Button
            sx={{ my: 2, color: 'white', display: 'block' }}
            component={Link} 
            to={'suppliers'}
        >
            ????????????????????
        </Button>
        <Button
            sx={{ my: 2, color: 'white', display: 'block' }}
            component={Link} 
            to={'supplies'}
        >
            ???????????????? ????????????
        </Button>
      </Box>
    )
  }
  else {
    return (
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Button
            sx={{ my: 2, color: 'white', display: 'block' }}
            component={Link} 
            to={'checks'}
        >
            ???????????????????? ??????????????
        </Button>
      </Box>
    )
  }
}

function Privet() {
  return (
    <div>
      <h1>????????????</h1>
    </div>
  );
}

export default App