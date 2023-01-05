import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import config from '../../config.json';

export const BalanceApi = createApi({
    reducerPath: 'BalanceApi',
    baseQuery: fetchBaseQuery({
        baseUrl:  `${config.BACKEND_DEVELOPMENT_URL}`
    }),
    endpoints: (builder) => ({
        getUserBalance: builder.query({
            query: (userId) => `users/${userId}/balance`
        })    
    })
})

export const {
    useGetUserBalanceQuery,
} = BalanceApi

