import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useAppDispatch } from '../app/hooks';
import { login } from '../features/users/userSlice';

const LoginPage = () => {
    const dispatch = useAppDispatch();

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

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login(form));
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
            <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
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