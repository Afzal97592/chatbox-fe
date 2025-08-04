import { createSlice } from '@reduxjs/toolkit';
import { mmKvStorage } from '../../../utils/mmkv-storage-utils';

const initialState = {
  token: mmKvStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state, action) => {
      state.token = null;
      mmKvStorage.removeItem('token');
    },
  },
});




export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
