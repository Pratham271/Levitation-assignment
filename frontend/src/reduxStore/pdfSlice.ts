import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PdfState {
  pdfUrl: string;
}

const initialState: PdfState = {
  pdfUrl: '',
};

export const pdfSlice = createSlice({
  name: 'pdf',
  initialState,
  reducers: {
    setPdfUrl: (state, action: PayloadAction<string>) => {
      state.pdfUrl = action.payload;
    },
  },
});

export const { setPdfUrl } = pdfSlice.actions;

export const selectPdfUrl = (state: { pdf: PdfState }) => state.pdf.pdfUrl;

export default pdfSlice.reducer;
