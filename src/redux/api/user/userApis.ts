import { mmKvStorage } from '../../../utils/mmkv-storage-utils';
import { apiSlice } from '../apiSlice';
import { setToken } from './authSlice';
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
      async onQueryStarted(userData, { queryFulfilled, dispatch }) {
        try {
          // const {data} = await queryFulfilled;
          // if (data.token) {
          //   mmKvStorage.setItem('token', data.token);
          //   dispatch(setToken(data.token));
          // }
        } catch (error) {
          console.log('error', error);
        }
      },
    }),
    sigInWithGoogle: builder.mutation({
      query: idToken => ({
        url: "/google-signin",
        method: "POST",
        body: { idToken },
      })
    }),
    getAllUsers: builder.query({
      query: ({ pageNum = 1, limit = 10, searchQuery = '' }) => ({
        url: `/users?search=${searchQuery}&limit=${limit}&page=${pageNum}`,
        method: 'GET',
      }),
    }),
  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
  useSigInWithGoogleMutation
} = authApiSlice;
