import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { BalanceApi } from "../hooks/api/balance";
import { CollectionApi } from "../hooks/api/collections";
import { ServiceApi } from "../hooks/api/services";

export const store = configureStore({
    reducer: {
      [ServiceApi.reducerPath] : ServiceApi.reducer,
      [CollectionApi.reducerPath] : CollectionApi.reducer,
      [BalanceApi.reducerPath] : BalanceApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    }).concat( 
      ServiceApi.middleware,
      CollectionApi.middleware,
      BalanceApi.middleware,
    )
})

setupListeners(store.dispatch);