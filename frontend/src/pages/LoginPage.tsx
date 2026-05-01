import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useAppDispatch } from '../app/hooks';
import { login } from '../features/users/userSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            await dispatch(login(form)).unwrap();
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                maxWidth: 400,
                margin: '0 auto',
                mt: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            <Typography
                variant="h5"
                sx={{ textAlign: 'center' }}
            >
                Login
            </Typography>

            <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                }
                fullWidth
            />

            <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
                fullWidth
            />

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
            >
                Login
            </Button>
        </Box>
    );
};

export default LoginPage;