'use client';

import {
  Table as StyledTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Input,
  InputGroup,
  IconButton,
  InputLeftElement,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Spinner,
  useToast,
  Select,
} from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from '@chakra-ui/icons';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setLimit, setOrder, setPage } from '@/redux/employees/employeesSlice';
import {
  fetchEmployeeById,
  fetchEmployees,
  fetchEmployeesBySearch,
} from '@/redux/employees/employeeThunk';
import api from '@/services/api';

import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';

import type { ApiResponse } from '@/types';
import { useRouter } from 'next/navigation';
import { useDebouncedValue } from '@/hook/useDebouncedValue';
import { DEBOUNCE_TIME } from '@/utils/cons';

export default function Table() {
  const [searchQuery, setSearchQuery] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [loadingDelete, setLoadingDelete] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const { list, currentPage, numberOfPages, limit, order, isLoading } =
    useSelector((state: RootState) => state.employees);

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [valueDebounced] = useDebouncedValue(searchQuery, DEBOUNCE_TIME);

  const paramsSearcth = {
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
      // @ts-ignore
      dispatch(fetchEmployees(params));
    } else {
      // @ts-ignore
      dispatch(fetchEmployeesBySearch(paramsSearcth));
    }
  }, [valueDebounced, currentPage, limit, order, dispatch]);

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      const nextPage = currentPage + 1;
      dispatch(setPage(nextPage));
      // @ts-ignore
      dispatch(fetchEmployees(nextPage, limit, order));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      dispatch(setPage(prevPage));
      // @ts-ignore
      dispatch(fetchEmployees(prevPage, limit, order));
    }
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenModalToDelete = (id: string) => {
    setEmployeeId(id);
    onOpen();
  };

  const handleOpenModalToEdit = (id: string) => {
    // @ts-ignore
    dispatch(fetchEmployeeById(id));

    if (!isLoading) router.push('/cadastro');
  };

  const handleDelete = async (id: string) => {
    setLoadingDelete(true);
    try {
      const { data } = await api.delete<ApiResponse<null>>(`/employees/${id}`);

      setLoadingDelete(false);
      onClose();
      toast({
        title: data.message,
        status: data.success ? 'success' : 'error',
        duration: 6000,
        isClosable: true,
        position: 'top-right',
      });
      // @ts-ignore
      dispatch(fetchEmployees(params));
      return id;
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

  return (
    <>
      <Flex w="100%" display="flex" alignItems="center" justify="space-between">
        <InputGroup
          size={['200px', '200px', '350px', '350px', '350px']}
          mb={20}
        >
          <InputLeftElement
            width={['200px', '200px', '350px', '350px', '350px']}
            gap={3}
          >
            <Input
              width={['200px', '200px', '350px', '350px', '350px']}
              type={'text'}
              placeholder="Pesquisar por nome"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </InputLeftElement>
        </InputGroup>

        <Button
          bg="blue.400"
          color="white"
          mb={10}
          onClick={() => router.push('/cadastro')}
        >
          Adicionar
        </Button>
      </Flex>
      <TableContainer>
        <StyledTable size={['sm', 'sm', 'sm', 'md', 'lg']} variant="simple">
          <TableCaption>Staff Manager - Funcionários</TableCaption>
          <Thead bg="gray.50" borderRadius={8}>
            <Tr>
              <Th w="40%">Nome</Th>
              <Th w="25%">Cargo</Th>
              <Th w="25%">Departamento</Th>
              <Th w="10%" textAlign="center">
                Ações
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {(list || []).map((employee, index) => (
              <Tr key={index}>
                <Td>{employee.name}</Td>
                <Td>{employee.position}</Td>
                <Td>{employee.department}</Td>
                <Td display={'flex'} align="center" justifyContent={'center'}>
                  <Menu>
                    <MenuButton as={Button}>
                      <Icon as={GiHamburgerMenu} color="gray.400" w={6} h={6} />
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => handleOpenModalToEdit(employee._id)}
                      >
                        <Icon as={FaEdit} color="gray.700" w={4} h={4} mr={3} />
                        Editar
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleOpenModalToDelete(employee._id)}
                      >
                        <Icon
                          as={FaRegTrashAlt}
                          color="gray.700"
                          w={4}
                          h={4}
                          mr={3}
                        />
                        Deletar
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </StyledTable>
      </TableContainer>

      <Flex w="100%" flex="flex" justify="flex-end" mt={10} gap={5}>
        <Select w={110} onChange={handleLimitChange} value={limit}>
          <option value={5}>5 linhas</option>
          <option value={10}>10 linhas</option>
          <option value={20}>20 linhas</option>
          <option value={20}>40 linhas</option>
        </Select>

        <Select w={120} onChange={handleOrderChange} value={order}>
          <option value="cresc">Crescente</option>
          <option value="desc">Descendente</option>
        </Select>
        <Flex
          w="auto"
          display="flex"
          align="center"
          justify="space-between"
          gap={5}
        >
          {currentPage} de {numberOfPages} páginas
          <IconButton
            bg={currentPage === 1 ? 'gray.200' : 'blue.400'}
            color="white"
            aria-label="Search database"
            icon={<ArrowLeftIcon />}
            size="xs"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          />
          <IconButton
            bg={currentPage === numberOfPages ? 'gray.200' : 'blue.400'}
            color="white"
            aria-label="Search database"
            icon={<ArrowRightIcon />}
            size="xs"
            onClick={handleNextPage}
          />
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Tem certeza que deseja deletar esse funcionário?
          </ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleDelete(employeeId)}
            >
              {loadingDelete ? <Spinner color="white" /> : 'Sim'}
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancela
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
