import api from '@/services/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { fetchEmployees, fetchEmployeesBySearch } from './employeeThunk';
import { EmployeeData } from '@/types';

const initialState: EmployeeData = {
  result: [],
  currentPage: 1, // Começa na página 1
  numberOfPages: 1,
  isLoading: false,
  error: null,
};

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployees.fulfilled,
        (state, action: PayloadAction<EmployeeData>) => {
          state.result = action.payload.result;
          state.currentPage = action.payload.currentPage;
          state.numberOfPages = action.payload.numberOfPages;
          state.isLoading = false;
        }
      )
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchEmployeesBySearch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployeesBySearch.fulfilled,
        (state, action: PayloadAction<EmployeeData>) => {
          console.log('fetchEmployeesBySearch action: ', action.payload.result);
          state.result = action.payload.result;
          state.currentPage = action.payload.currentPage;
          state.numberOfPages = action.payload.numberOfPages;
          state.isLoading = false;
        }
      )
      .addCase(fetchEmployeesBySearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Exportar as ações e o reducer
export const { setPage } = employeeSlice.actions;
export default employeeSlice.reducer;
