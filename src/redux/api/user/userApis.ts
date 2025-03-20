import {apiSlice} from '../apiSlice';
const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    registerUser: builder.mutation({
      query: userData => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: userData => ({
        url: '/signin',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});
export const {useRegisterUserMutation, useLoginUserMutation} = authApiSlice;
