import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/userService';

const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

// Get user details
export const profile = createAsyncThunk("user/profile", async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    // console.log("Token:", token); // Adicione este console.log
    const data = await userService.profile(user, token);
    // console.log("Profile data:", data); // Adicione este console.log
    return data;
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(profile.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
                // console.log("Fulfilled action payload:", action.payload); // Adicione este console.log
            })
            .addCase(profile.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.error.message;
                // console.log("Rejected action error:", action.error); // Adicione este console.log
            });
    },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
