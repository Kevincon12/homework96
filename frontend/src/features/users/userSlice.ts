import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../api/axiosApi';

interface User {
    _id: string;
    email: string;
    displayName: string;
    avatar: string | null;
    role: string;
    token: string;
}

interface UserState {
    user: User | null;
    loading: boolean;
}

const initialState: UserState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    loading: false
};

export const register = createAsyncThunk(
    'users/register',
    async (userData: { email: string; password: string; displayName: string }) => {
        const response = await axiosApi.post('/users', userData);
        return response.data;
    }
);

export const login = createAsyncThunk(
    'users/login',
    async (userData: { email: string; password: string }) => {
        const response = await axiosApi.post('/users/sessions', userData);
        return response.data;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },

        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.rejected, (state) => {
                state.loading = false;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;