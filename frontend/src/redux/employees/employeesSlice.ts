import api from '@/services/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { fetchEmployees, fetchEmployeesBySearch } from './employeeThunk';
import { EmployeeData } from '@/types';

const initialState: EmployeeData = {
  list: [],
  currentPage: 1, // Começa na página 1
  numberOfPages: 1,
  isLoading: false,
  limit: 10, // valor padrão
  order: 'cresc',
  error: null,
};

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setOrder: (state, action: PayloadAction<'cresc' | 'desc'>) => {
      state.order = action.payload;
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
          console.log('fetchEmployees action: ', action.payload);
          state.list = action.payload.list;
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
          console.log('fetchEmployeesBySearch action: ', action.payload);
          state.list = action.payload.list;
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
export const { setPage, setLimit, setOrder } = employeeSlice.actions;
export default employeeSlice.reducer;
