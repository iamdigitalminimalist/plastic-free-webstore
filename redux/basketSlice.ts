import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ProductType } from "../typings";

export interface BasketState {
  items: ProductType[];
}

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state: BasketState, action: PayloadAction<ProductType>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (
      state: BasketState,
      action: PayloadAction<{ id: string }>
    ) => {
      const index = state.items.findIndex(
        (item: ProductType) => item._id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.log(
          `Can't remove product (id: ${action.payload.id} as its not in basket!`
        );
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors
export const selectBasketItems = (state: RootState) => state.basket.items;
export const selectBasketItemsWithId = (state: RootState, id: string) => {
  state.basket.items.filter((item: ProductType) => item._id === id);
};
export const selectBasketTotal = (state: RootState) =>
  state.basket.items.reduce(
    (total: number, item: ProductType) => (total += item.price),
    0
  );

export default basketSlice.reducer;
