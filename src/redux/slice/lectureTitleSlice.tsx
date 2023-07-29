import { createSlice } from "@reduxjs/toolkit";
interface TitleState {
  inputTitle: string;
}

const initialState: TitleState = {
  inputTitle: "",
};
const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    setInputTitle: (state, action) => {
      state.inputTitle = action.payload;
    },
    resetInputTitle: state => {
      state.inputTitle = "";
    },
  },
});

export const { setInputTitle, resetInputTitle } = titleSlice.actions;
export default titleSlice.reducer;
