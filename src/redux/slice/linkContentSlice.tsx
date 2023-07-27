import { createSlice } from "@reduxjs/toolkit";
interface ContentState {
  inputContent: string;
}
const initialState: ContentState = {
  inputContent: "",
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setInputContent: (state, action) => {
      state.inputContent = action.payload;
    },
    resetInputContent: state => {
      state.inputContent = "";
    },
  },
});

export const { setInputContent, resetInputContent } = contentSlice.actions;
export default contentSlice.reducer;
