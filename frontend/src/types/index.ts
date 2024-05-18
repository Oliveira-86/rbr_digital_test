export type Employee = {
  _id: string;
  name: string;
  position: string;
  department: string;
  hireDate: string;
  createdAt: string;
};

export type EmployeeData = {
  list: Employee[];
  currentPage: number;
  numberOfPages: number;
  isLoading: boolean;
  error: string | null;
  limit: number;
  order: 'cresc' | 'desc';
};

export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  result: T;
  message: string;
};

export type FetchEmployeesParams = {
  page: number;
  limit: number;
  order: 'cresc' | 'desc';
};

export type FetchEmployeesSearchParams = {
  searchQuery: string;
  limit: number;
  order: 'cresc' | 'desc';
};

export type EmployeeState = {
  list: Employee[] | null;
  currentPage: number;
  numberOfPages: number;
  limit: number;
  order: 'cresc' | 'desc';
  isLoading: boolean;
  error: string | null;
  currentEmployee: Employee | null;
};
