import {mmKvStorage} from '../../../utils/mmkv-storage-utils';
import {apiSlice} from '../apiSlice';
import {setToken} from './authSlice';
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
      async onQueryStarted(userData, {queryFulfilled, dispatch}) {
        try {
          const {data} = await queryFulfilled;
          if (data.token) {
            mmKvStorage.setItem('token', data.token);
            dispatch(setToken(data.token));
          }
        } catch (error) {
          console.log('error', error);
        }
      },
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `/users?search=&limit=10&page=1`,
        method: 'GET',
      }),
    }),
  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
} = authApiSlice;
