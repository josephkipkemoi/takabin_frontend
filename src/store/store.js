import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { ServiceApi } from "../hooks/api/services";

export const store = configureStore({
    reducer: {
      [ServiceApi.reducerPath] : ServiceApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    }).concat( 
      ServiceApi.middleware,
    )
})

setupListeners(store.dispatch);