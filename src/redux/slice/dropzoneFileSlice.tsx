import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DropzoneFileState {
  videoFile: File | null;
  errorMessage: string;
  successMessage: string;
}

const initialState: DropzoneFileState = {
  videoFile: null,
  errorMessage: "",
  successMessage: "",
};

const dropzoneFileSlice = createSlice({
  name: "dropzoneFile",
  initialState,
  reducers: {
    setVideoFile: (state, action: PayloadAction<File | null>) => {
      state.videoFile = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
    },
    reset: () => initialState,
  },
});

export const { setVideoFile, setErrorMessage, setSuccessMessage, reset } =
  dropzoneFileSlice.actions;
export default dropzoneFileSlice.reducer;
