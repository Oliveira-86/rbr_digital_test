'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/components/Card';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  VStack,
  useToast,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '@/services/api';
import { ApiResponse } from '@/types';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentEmployee } from '@/redux/employees/employeesSlice';

const employeeSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  position: z.string().min(1, 'Cargo é obrigatório'),
  department: z.string().min(1, 'Departamento é obrigatório'),
  hireDate: z
    .string()
    .min(1, 'Data de admissão é obrigatória')
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'Data de admissão deve estar no formato AAAA-MM-DD'
    ),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

export default function Register() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const { currentEmployee } = useSelector(
    (state: RootState) => state.employees
  );

  const dispatch = useDispatch();

  const router = useRouter();

  const toast = useToast();

  useEffect(() => {
    const date = currentEmployee?.hireDate.split('T')[0];

    setValue('name', currentEmployee?.name || '');
    setValue('position', currentEmployee?.position || '');
    setValue('department', currentEmployee?.department || '');
    setValue('hireDate', date || '');
  }, [currentEmployee, setValue, dispatch]);

  const onSubmit = async (empData: EmployeeFormData) => {
    setLoading(true);
    let dataRes: ApiResponse<EmployeeFormData>;
    try {
      if (currentEmployee) {
        const { data } = await api.put<ApiResponse<EmployeeFormData>>(
          `/employees/${currentEmployee._id}`,
          empData
        );
        dataRes = data;
      } else {
        const { data } = await api.post<ApiResponse<EmployeeFormData>>(
          `/employees`,
          empData
        );
        dataRes = data;
      }

      setLoading(false);
      router.push('/dashboard');
      toast({
        title: dataRes.message,
        status: dataRes.success ? 'success' : 'error',
        duration: 6000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Box bg="gray.50" px={[0, 0, 20, 30, 60, 400]}>
      <Card
        title="Cadastro de Funcionário"
        subtitle="Adicione Novos Membros à Sua Equipe de Forma Simples"
        centered={true}
      >
        <VStack
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={4}
          w="full"
          maxW="md"
          mx="auto"
        >
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input id="name" {...register('name')} />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.position}>
            <FormLabel htmlFor="position">Cargo</FormLabel>
            <Input id="position" {...register('position')} />
            <FormErrorMessage>{errors.position?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.department}>
            <FormLabel htmlFor="department">Departamento</FormLabel>
            <Input id="department" {...register('department')} />
            <FormErrorMessage>{errors.department?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.hireDate}>
            <FormLabel htmlFor="hireDate">Data de Admissão</FormLabel>
            <Input id="hireDate" type="date" {...register('hireDate')} />
            <FormErrorMessage>{errors.hireDate?.message}</FormErrorMessage>
          </FormControl>

          <Flex align={'center'} gap={5} mt={10}>
            <Button w={200} type="submit" colorScheme="blue">
              {loading ? (
                <Spinner color="white" />
              ) : (
                `${
                  currentEmployee?._id ? 'Atualizar' : 'Adicionar'
                }  Funcionário`
              )}
            </Button>

            {currentEmployee && (
              <Button
                variant="outline"
                colorScheme="blue"
                size="md"
                aria-label="Send email"
                onClick={() => dispatch(clearCurrentEmployee())}
              >
                Limpar
              </Button>
            )}
          </Flex>
        </VStack>
      </Card>
    </Box>
  );
}
