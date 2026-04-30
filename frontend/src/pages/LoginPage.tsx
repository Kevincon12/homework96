import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useAppDispatch } from '../app/hooks';
import { login } from '../features/users/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(login(form)).unwrap();
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

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
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
                Login
            </Typography>

            <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={onChange}
                fullWidth
            />

            <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                fullWidth
            />

            <Button type="submit" variant="contained" fullWidth>
                Login
            </Button>
        </Box>
    );
};

export default LoginPage;