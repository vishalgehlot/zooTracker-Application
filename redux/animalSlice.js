import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  animals: []
};

const animalSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    setAnimals: (state, action) => {
      state.animals = action.payload;
    },
    
    addAnimal: (state, action) => {
      state.animals.push(action.payload);
    },
    
    editAnimal: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.animals.findIndex(animal => animal.id === id);
      if (index !== -1) {
        state.animals[index] = { ...state.animals[index], ...updatedData };
      }
    },
    
    removeAnimal: (state, action) => {
      state.animals = state.animals.filter(animal => animal.id !== action.payload);
    },
  }
});

export const { addAnimal, removeAnimal, editAnimal } = animalSlice.actions;
export default animalSlice.reducer;