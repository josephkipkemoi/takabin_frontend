import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import config from '../../config.json';

export const ServiceApi = createApi({
    reducerPath: 'ServiceApi',
    baseQuery: fetchBaseQuery({
        baseUrl:  `${config.BACKEND_DEVELOPMENT_URL}`
    }),
    endpoints: (builder) => ({
        getServices: builder.query({
            query: () => 'services'
        })
       
    })
})

export const {
    useGetServicesQuery
} = ServiceApi

