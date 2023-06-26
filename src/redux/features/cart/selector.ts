import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface CartState {
  [productId: string]: number;
}

const selectCartModule = (state: RootState): CartState => state.cart as CartState;

export const selectProductAmount = createSelector(
  selectCartModule,
  (_, id: string) => id,
  (cart, id) => cart[id] || 0
);
