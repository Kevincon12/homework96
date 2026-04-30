import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
}

const initialState: UserState = {
    user: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
