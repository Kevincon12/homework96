import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { logout } from './features/users/userSlice';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CreateCocktailPage from './pages/CreateCocktailPage';
import CocktailsPage from "./pages/CocktailsPage.tsx";
import CocktailDetailsPage from "./pages/CocktailDetailsPage.tsx";
import MyCocktailsPage from "./pages/MyCocktailsPage.tsx";

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
                            <Button color="inherit" component={Link} to="/create-cocktail">
                                Create Cocktail
                            </Button>
                        )}

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
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-cocktail" element={<CreateCocktailPage />} />
                <Route path="/" element={<CocktailsPage />} />
                <Route path="/cocktail/:id" element={<CocktailDetailsPage />} />
                <Route path="/my-cocktails" element={<MyCocktailsPage />} />
            </Routes>
        </>
    );
};

export default App;