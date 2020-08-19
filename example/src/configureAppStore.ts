import { configureStore, getDefaultMiddleware, DeepPartial } from '@reduxjs/toolkit'
import { snackbarsReducer, ENQUEUE_SNACKBAR } from '@dlefuen/react-redux-snackbars';

export default function configureAppStore(preloadedState?: DeepPartial<ReturnType<typeof snackbarsReducer>>) {

    const store = configureStore({
        reducer: snackbarsReducer,
        preloadedState,
        middleware: [
            ...getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        ENQUEUE_SNACKBAR
                    ],
                    ignoredPaths: [
                        'snackbarQueue'
                    ]
                }
            }),
        ]
    })

    return store
}