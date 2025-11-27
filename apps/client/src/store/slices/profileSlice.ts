import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
    isEditing: boolean;
}

const initialState: ProfileState = {
    isEditing: false,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setEditing: (state, action: PayloadAction<boolean>) => {
            state.isEditing = action.payload;
        },
    },
});

export const { setEditing } = profileSlice.actions;
export default profileSlice.reducer;
