import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  [movieId: string]: number;
}

interface SetTicketQuantityPayload {
  movieId: string;
  quantity: number;
}

const initialState: CartState = {};
const MAX_QUANTITY = 30;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setTicketQuantity: (state, { payload }: PayloadAction<SetTicketQuantityPayload>) => {
      const { movieId, quantity } = payload;
      state[movieId] = Math.min(quantity, MAX_QUANTITY);
    },
    increment: (state, { payload }: PayloadAction<string>) => {
      state[payload] = (state[payload] || 0) + 1;
    },
    decrement: (state, { payload }: PayloadAction<string>) => {
      const count = state[payload];

      if (!count) {
        return;
      }

      if (count === 1) {
        delete state[payload];
        return;
      }

      state[payload] = count - 1;
    },
    reset: () => initialState,
  },
});

export const { setTicketQuantity, increment, decrement, reset } = cartSlice.actions;

export const selectTicketQuantities = (state: { cart: CartState }) => state.cart;

export const cartReducer = cartSlice.reducer;