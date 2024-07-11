import { store } from "../redux/store/store";

export type RootState = ReturnType<typeof store.getState>;
