import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
  fetchEmployeeById,
  fetchEmployees,
  fetchEmployeesBySearch,
} from './employeeThunk';
import { Employee, EmployeeData, EmployeeState } from '@/types';

const initialState: EmployeeState = {
  list: [],
  currentPage: 1,
  numberOfPages: 1,
  isLoading: false,
  limit: 10,
  order: 'cresc',
  error: null,
  currentEmployee: null,
};

//@ts-ignore
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
    clearCurrentEmployee: (state) => {
      state.currentEmployee = null;
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
          state.list = action.payload.list;
          state.currentPage = action.payload.currentPage;
          state.numberOfPages = action.payload.numberOfPages;
          state.isLoading = false;
        }
      )
      .addCase(fetchEmployeesBySearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchEmployeeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployeeById.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.currentEmployee = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, setLimit, setOrder, clearCurrentEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
