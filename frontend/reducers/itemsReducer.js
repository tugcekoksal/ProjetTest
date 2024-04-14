

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],

  sortKey: 'name',
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateItem: (state, action) => {
      const { id, newTitle, newCompleted } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.items[index].title = newTitle;
        state.items[index].completed = newCompleted;
      }
    },
  
    changeItemField: (state, action) => {
      const { id, name, value } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.items[index][name] = value;
      }
    },

  }
});

export const { 
  setItems, addItem, removeItem, updateItem, startEditing, changeItemField, 
} = itemsSlice.actions;

export default itemsSlice.reducer;
