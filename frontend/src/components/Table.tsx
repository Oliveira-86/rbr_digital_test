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
} from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { RootState } from '@/redux/store';
import { setPage } from '@/redux/employees/employeesSlice';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';
import {
  fetchEmployees,
  fetchEmployeesBySearch,
} from '@/redux/employees/employeeThunk';
import TitleAndSubTitle from './TitleAndSubTitle';
import api from '@/services/api';

export default function Table() {
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();
  const { data, currentPage, numberOfPages, isLoading } = useSelector(
    (state: RootState) => state.employees
  );

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

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/employees/${id}`);
      // @ts-ignore
      dispatch(fetchEmployees(currentPage));
      return id;
    } catch (error) {}
  };

  return (
    <>
      <TitleAndSubTitle
        title="Central de Funcionários"
        subtitle="Organize e Supervisione sua Equipe com Facilidade"
      />
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
            {(data || []).map((employee, index) => (
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
                      <MenuItem onClick={() => handleDelete(employee._id)}>
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
    </>
  );
}
