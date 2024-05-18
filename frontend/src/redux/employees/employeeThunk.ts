import api from '@/services/api';
import type {
  ApiResponse,
  Employee,
  EmployeeData,
  FetchEmployeesParams,
  FetchEmployeesSearchParams,
} from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async ({ page, limit, order }: FetchEmployeesParams, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse<EmployeeData>>(
        `/employees?page=${page}&limit=${limit}&order=${order}`
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
  async (
    { searchQuery, limit, order }: FetchEmployeesSearchParams,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get<ApiResponse<EmployeeData>>(
        `/employees/search?searchQuery=${searchQuery}&limit=${limit}&order=${order}`
      );

      if (response.data.success) {
        return response.data.result;
      } else {
        return rejectWithValue('Failed to fetch employees');
      }
    } catch (error) {
      return rejectWithValue('Failed to fetch employees by search');
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  'employees/fetchEmployeeById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse<Employee>>(`/employees/${id}`);
      if (response.data.success) {
        return response.data.result as Employee;
      } else {
        return rejectWithValue('Failed to fetch employee');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);
