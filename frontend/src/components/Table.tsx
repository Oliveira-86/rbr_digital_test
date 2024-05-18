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
} from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from '@chakra-ui/icons';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setPage } from '@/redux/employees/employeesSlice';
import {
  fetchEmployees,
  fetchEmployeesBySearch,
} from '@/redux/employees/employeeThunk';
import api from '@/services/api';

import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';

import type { ApiResponse } from '@/types';

export default function Table() {
  const [searchQuery, setSearchQuery] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [loadingDelete, setLoadingDelete] = useState(false);

  const dispatch = useDispatch();

  const { result, currentPage, numberOfPages, isLoading } = useSelector(
    (state: RootState) => state.employees
  );

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!searchQuery) {
      // @ts-ignore
      dispatch(fetchEmployees(currentPage === 0 ? 1 : currentPage));
    }
  }, [searchQuery]);

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      const nextPage = currentPage + 1;
      dispatch(setPage(nextPage));
      // @ts-ignore
      dispatch(fetchEmployees(nextPage));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      dispatch(setPage(prevPage));
      // @ts-ignore
      dispatch(fetchEmployees(prevPage));
    }
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchQuery) {
      // @ts-ignore
      dispatch(fetchEmployees(currentPage === 0 ? 1 : currentPage));
      return;
    }
    // @ts-ignore
    dispatch(fetchEmployeesBySearch(searchQuery));
  };

  const handleOpenModalToDelete = (id: string) => {
    setEmployeeId(id);
    onOpen();
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
      dispatch(fetchEmployees(currentPage));
      return id;
    } catch (error) {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <Flex w="100%" display="flex" alignItems="center" justify="space-between">
        <form onSubmit={handleSubmit}>
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
              <IconButton
                bg={'blue.400'}
                color="white"
                aria-label="Search database"
                icon={<SearchIcon />}
                size="md"
                type="submit"
              />
            </InputLeftElement>
          </InputGroup>
        </form>

        <Button bg="blue.400" color="white" mb={10}>
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
            {(result || []).map((employee, index) => (
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
                      <MenuItem>
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

      <Flex w="100%" flex="flex" justify="flex-end" mt={10}>
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
