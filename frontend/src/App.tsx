import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { logout } from './features/users/userSlice';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

const Home = () => {
    return <div style={{ padding: 20 }}>Home Page</div>;
};

const App = () => {
    const user = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">
                        Cocktail App
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>

                        {user && (
                            <Button color="inherit" component={Link} to="/my-cocktails">
                                My Cocktails
                            </Button>
                        )}

                        {!user && (
                            <>
                                <Button color="inherit" component={Link} to="/register">
                                    Register
                                </Button>

                                <Button color="inherit" component={Link} to="/login">
                                    Login
                                </Button>
                            </>
                        )}

                        {user && (
                            <>
                                <Typography sx={{ ml: 2 }}>
                                    {user.displayName}
                                </Typography>

                                <Button
                                    color="inherit"
                                    onClick={() => dispatch(logout())}
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </>
    );
};

export default App;