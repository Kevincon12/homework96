import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useAppDispatch } from '../app/hooks';
import { register } from '../features/users/userSlice';

const RegisterPage = () => {
    const dispatch = useAppDispatch();

    const [form, setForm] = useState({
        email: '',
        password: '',
        displayName: ''
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(register(form));
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
            <Typography
                variant="h5"
                component="div"
                sx={{ textAlign: 'center' }}
            >
                Register
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

            <TextField
                label="Display Name"
                name="displayName"
                value={form.displayName}
                onChange={onChange}
                fullWidth
            />

            <Button type="submit" variant="contained" fullWidth>
                Register
            </Button>
        </Box>
    );
};

export default RegisterPage;