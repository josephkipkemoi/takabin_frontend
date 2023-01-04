import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import config from '../../config.json';

export const CollectionApi = createApi({
    reducerPath: 'CollectionApi',
    baseQuery: fetchBaseQuery({
        baseUrl:  `${config.BACKEND_DEVELOPMENT_URL}`
    }),
    endpoints: (builder) => ({
        getUncollectedCollections: builder.query({
            query: ({ user_id, collected }) => `users/${user_id}/collectee/collections?collected=${collected}`
        })
       
    })
})

export const {
    useGetUncollectedCollectionsQuery
} = CollectionApi

