import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './features/cart';


type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});


export default store;
export type { RootState };
