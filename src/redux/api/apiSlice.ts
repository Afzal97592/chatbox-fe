// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {mmKvStorage} from '../../utils/mmkv-storage-utils';

// const baseQuery = fetchBaseQuery({
//   baseUrl: 'http://localhost:3001/api/v1/',
//   prepareHeaders: async (headers, {getState}) => {
//     const token = mmKvStorage.getItem('token');
//     headers.set('Authorization', `${token}`);
//     return headers;
//   },
// });

// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery,
//   endpoints: () => ({}),
// });

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {mmKvStorage} from '../../utils/mmkv-storage-utils';

const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1/',
    prepareHeaders: headers => {
      const token = mmKvStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  // Make the API request
  const result = await rawBaseQuery(args, api, extraOptions);
  console.log(result, 'result');

  // Check if the response is 404 (Token Expired)
  if (result?.error?.status === 404) {
    console.log('Token expired, logging out user...');
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
});
