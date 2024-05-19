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
  Spinner,
  Select,
  UseDisclosureProps,
} from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';
import { ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { clearCurrentEmployee } from '@/redux/employees/employeesSlice';

interface TableProps extends UseDisclosureProps {
  routerAdd: string;
  searchQuery: string;
  handleSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleOpenModalToEdit: (id: string) => void;
  handleOpenModalToDelete: (id: string) => void;
  handleLimitChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleOrderChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handleDelete: () => void;
  loadingDelete: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function Table({
  routerAdd,
  searchQuery,
  handleSearchInputChange,
  handleOpenModalToEdit,
  handleOpenModalToDelete,
  handleLimitChange,
  handleOrderChange,
  handlePreviousPage,
  handleNextPage,
  isOpen,
  onClose,
  handleDelete,
  loadingDelete,
}: TableProps) {
  const { list, currentPage, numberOfPages, limit, order } = useSelector(
    (state: RootState) => state.employees
  );

  const router = useRouter();

  const dispatch = useDispatch();

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
          onClick={() => {
            dispatch(clearCurrentEmployee());
            router.push(routerAdd);
          }}
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
                    <MenuButton>
                      <Icon as={GiHamburgerMenu} color="gray.600" w={5} h={5} />
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

      <Flex
        w="100%"
        flex="flex"
        justify="flex-end"
        mt={10}
        gap={5}
        direction={['column', 'column', 'row', 'row', 'row']}
      >
        <Flex
          w={['100%', '100%', 'auto', 'auto', 'auto']}
          flex="flex"
          justify="flex-end"
          gap={5}
        >
          <Select
            w={['100%', '100%', 110, 120, 130]}
            onChange={handleLimitChange}
            value={limit}
          >
            <option value={5}>5 linhas</option>
            <option value={10}>10 linhas</option>
            <option value={20}>20 linhas</option>
            <option value={40}>40 linhas</option>
          </Select>

          <Select
            w={['100%', '100%', 110, 120, 130]}
            onChange={handleOrderChange}
            value={order}
          >
            <option value="cresc">Crescente</option>
            <option value="desc">Descendente</option>
          </Select>
        </Flex>
        <Flex w="auto" display="flex" align="center" justify="center" gap={5}>
          {currentPage} de {numberOfPages} páginas
          <IconButton
            bg={currentPage === 1 ? 'gray.200' : 'blue.400'}
            color="white"
            _hover={'blue'}
            aria-label="Search database"
            icon={<ArrowLeftIcon />}
            size="xs"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          />
          <IconButton
            bg={currentPage === numberOfPages ? 'gray.200' : 'blue.400'}
            _hover={'blue'}
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
            <Button colorScheme="blue" mr={3} onClick={handleDelete}>
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
