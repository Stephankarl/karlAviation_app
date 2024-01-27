import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import api from './middleware/api';

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
    return configureStore({
        reducer: rootReducer,
        middleware: [
            ...getDefaultMiddleware(),
            api
        ]
    })
}