import { store } from '../redux/store/store';

// RootState is the type of the root state of the Redux store

export type RootState = ReturnType<typeof store.getState>;
