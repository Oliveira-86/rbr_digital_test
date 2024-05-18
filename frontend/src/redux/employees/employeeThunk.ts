import api, { ApiResponse } from '@/services/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from './employeesSlice';

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse<Employee[]>>(
        `/employees?page=${page}`
      );
      if (response.data.success) {
        return response.data.result;
      } else {
        return rejectWithValue('Failed to fetch employees');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const fetchEmployeesBySearch = createAsyncThunk(
  'employees/fetchEmployeesBySearch',
  async (searchQuery: string, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse<Employee[]>>(
        `/employees/search?searchQuery=${searchQuery}`
      );

      return response.data.result;
    } catch (error) {
      return rejectWithValue('Failed to fetch employees by search');
    }
  }
);
