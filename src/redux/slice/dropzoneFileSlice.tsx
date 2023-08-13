import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DropzoneFileState {
  videoFileName: string;
  videoToDeleteOnEdit: string;
  errorMessage: string;
  successMessage: string;
}

const initialState: DropzoneFileState = {
  videoFileName: "",
  videoToDeleteOnEdit: "",
  errorMessage: "",
  successMessage: "",
};

const dropzoneFileSlice = createSlice({
  name: "dropzoneFile",
  initialState,
  reducers: {
    setVideoFileName: (state, action: PayloadAction<string>) => {
      state.videoFileName = action.payload;
    },
    setVideoToDeleteOnEdit: (state, action: PayloadAction<string>) => {
      state.videoToDeleteOnEdit = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
    },
    resetDropzone: () => initialState,
  },
});

export const {
  setVideoFileName,
  setVideoToDeleteOnEdit,
  setErrorMessage,
  setSuccessMessage,
  resetDropzone,
} = dropzoneFileSlice.actions;
export default dropzoneFileSlice.reducer;
