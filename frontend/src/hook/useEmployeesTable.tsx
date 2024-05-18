'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { ApiResponse } from '@/types';
import { useDebouncedValue } from './useDebouncedValue';
import {
  fetchEmployeeById,
  fetchEmployees,
  fetchEmployeesBySearch,
} from '@/redux/employees/employeeThunk';
import { setLimit, setOrder, setPage } from '@/redux/employees/employeesSlice';
import api from '@/services/api';
import { useRouter } from 'next/navigation';

const DEBOUNCE_TIME = 500;

const useEmployeeTable = () => {
  const { list, currentPage, numberOfPages, limit, order, isLoading } =
    useSelector((state: RootState) => state.employees);

  const [searchQuery, setSearchQuery] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [loadingDelete, setLoadingDelete] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [valueDebounced] = useDebouncedValue(searchQuery, DEBOUNCE_TIME);

  const paramsSearch = {
    searchQuery: valueDebounced,
    limit,
    order,
  };

  const params = {
    page: currentPage === 0 ? 1 : currentPage,
    limit,
    order,
  };

  useEffect(() => {
    if (!valueDebounced) {
      //@ts-ignore
      dispatch(fetchEmployees(params));
    } else {
      //@ts-ignore
      dispatch(fetchEmployeesBySearch(paramsSearch));
    }
  }, [valueDebounced, currentPage, limit, order, dispatch]);

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      const nextPage = currentPage + 1;
      dispatch(setPage(nextPage));
      //@ts-ignore
      dispatch(fetchEmployees(nextPage, limit, order));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      dispatch(setPage(prevPage));
      //@ts-ignore
      dispatch(fetchEmployees(prevPage, limit, order));
    }
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenModalToDelete = (id: string) => {
    setEmployeeId(id);
    onOpen();
  };

  const handleOpenModalToEdit = (id: string) => {
    //@ts-ignore
    dispatch(fetchEmployeeById(id));

    if (!isLoading) router.push('/cadastro');
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const { data } = await api.delete<ApiResponse<null>>(
        `/employees/${employeeId}`
      );

      setLoadingDelete(false);
      onClose();
      toast({
        title: data.message,
        status: data.success ? 'success' : 'error',
        duration: 6000,
        isClosable: true,
        position: 'top-right',
      });
      //@ts-ignore
      dispatch(fetchEmployees(params));
    } catch (error) {
      setLoadingDelete(false);
    }
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLimit(Number(event.target.value)));
  };

  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setOrder(event.target.value as 'cresc' | 'desc'));
  };

  return {
    isLoading,
    searchQuery,
    employeeId,
    loadingDelete,
    isOpen,
    onOpen,
    onClose,
    handleNextPage,
    handlePreviousPage,
    handleSearchInputChange,
    handleOpenModalToDelete,
    handleOpenModalToEdit,
    handleDelete,
    handleLimitChange,
    handleOrderChange,
  };
};

export default useEmployeeTable;
