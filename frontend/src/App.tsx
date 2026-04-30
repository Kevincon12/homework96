import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import RegisterPage from './pages/RegisterPage';

const Home = () => {
    return <div>Home Page</div>;
};

const App = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">
                        Cocktail App
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>

                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>

                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>

                        <Button color="inherit" component={Link} to="/my-cocktails">
                            My Cocktails
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </>
    );
};

export default App;