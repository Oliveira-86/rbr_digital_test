'use client';

import {
  Table as StyledTable,
  Thead,
  Tbody,
  Tfoot,
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
} from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from '@chakra-ui/icons';

export default function Table() {
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
            />
            <IconButton
              bg={'blue.400'}
              color="white"
              aria-label="Search database"
              icon={<SearchIcon />}
              size="md"
            />
          </InputLeftElement>
        </InputGroup>

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
              <Th w="10%">Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Egberto Duarte Tiné de Oliveira</Td>
              <Td>Engenheiro de Software</Td>
              <Td>millimetres (mm)</Td>
              <Td>millimetres (mm)</Td>
            </Tr>
            <Tr>
              <Td>Engenheiro de Software</Td>
              <Td>TEcnologia da Informação</Td>
              <Td>centimetres (cm)</Td>
              <Td>centimetres (cm)</Td>
            </Tr>
            <Tr>
              <Td>TEcnologia da Informação</Td>
              <Td>metres (m)</Td>
              <Td>metres (m)</Td>
              <Td>metres (m)</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th>multiply by</Th>
              <Th>multiply by</Th>
            </Tr>
          </Tfoot>
        </StyledTable>
      </TableContainer>

      <Flex w="100%" flex="flex" justify="flex-end" mt={10}>
        <Flex
          w={100}
          display="flex"
          align="center"
          justify="space-between"
          gap={5}
        >
          <IconButton
            bg={'blue.400'}
            color="white"
            aria-label="Search database"
            icon={<ArrowLeftIcon />}
            size="xs"
          />
          <Flex>1</Flex>
          <IconButton
            bg={'blue.400'}
            color="white"
            aria-label="Search database"
            icon={<ArrowRightIcon />}
            size="xs"
          />
        </Flex>
      </Flex>
    </>
  );
}
