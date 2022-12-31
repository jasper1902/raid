import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { produce } from "immer";
import { data } from "./data";

interface ItemPayload {
  index: number;
  property: string;
  value: number;
}

type ItemType = {
  items: {
    use: number;
    receive: number;
    available: number;
    title: string;
    pic: string;
    multiplier: number;
    left: number;
  }[];
  total: {
    use: number;
    receive: number;
  };
};

const initialStateData: ItemType = data;

const itemSlice = createSlice({
  name: "item",
  initialState: initialStateData,
  reducers: {
    updateState: (state: ItemType, action: PayloadAction<ItemPayload>) => {
      const { index, property, value } = action.payload;

      const newState = state.items.map((item, i) => {
        if (index === i) {
          switch (property) {
            case "use":
              return { ...item, use: value, left: item.available - value };
            case "receive":
              return { ...item, receive: value };
            case "available":
              return { ...item, available: value, left: value };
            case "left":
              return { ...item, left: value, use: item.available - value };
            default:
              return item;
          }
        }
        return item;
      });

      return produce(state, (draft) => {
        let use = 0;
        let receive = 0;
        newState.forEach((item) => {
          use += item.use * item.multiplier;
          receive += item.receive * item.multiplier;
        });
        const newTotal = { use: use, receive: receive };
        localStorage.setItem(
          "items",
          JSON.stringify({ items: newState, total: newTotal })
        );
        draft.items = newState;
        draft.total = newTotal;
      });
    },

    RemoveData: (state: ItemType, action) => {
      const { index } = action.payload;
      const newArray = state.items.map((item, i) => {
        if (index === -1 || index === i) {
          return {
            use: 0,
            receive: 0,
            available: 0,
            title: item.title,
            pic: item.pic,
            multiplier: item.multiplier,
            left: 0,
          };
        }
        return item;
      });

      return produce(state, (draft) => {
        let use = 0;
        let receive = 0;
        newArray.forEach((item) => {
          use += item.use * item.multiplier;
          receive += item.receive * item.multiplier;
        });
        const newTotal = { use: use, receive: receive };
        localStorage.setItem(
          "items",
          JSON.stringify({ items: newArray, total: newTotal })
        );
        draft.items = newArray;
        draft.total = newTotal;
      });
    },

    setLeftHandler: (state: ItemType, action) => {
      const newArray = state.items.map((item) => {
        const left = ["Sulfur", "Explosives", "Gun Powder"].includes(item.title)
          ? 0
          : item.left + item.receive;
        return {
          available: left,
          left,
          title: item.title,
          pic: item.pic,
          multiplier: item.multiplier,
          use: 0,
          receive: 0,
        };
      });
      localStorage.setItem(
        "items",
        JSON.stringify({ items: newArray, total: { use: 0, receive: 0 } })
      );
      return { total: { use: 0, receive: 0 }, items: newArray };
    },

    setItem: (state, action) => {
      return { items: action.payload.items, total: action.payload.total };
    },
  },
});

export const { updateState, RemoveData, setLeftHandler, setItem } =
  itemSlice.actions;
export const itemSelector = (store: RootState) => store.itemReducer;
export default itemSlice.reducer;
