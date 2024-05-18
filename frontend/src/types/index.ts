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
};

export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  result: T;
  message: string;
};
