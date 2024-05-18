'use client';

import React from 'react';
import TableComp from '@/components/Table';
import Card from '@/components/Card';
import useEmployeeTable from '@/hook/useEmployeesTable';

export default function DashBoard() {
  const {
    isLoading,
    searchQuery,
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
  } = useEmployeeTable();

  return (
    <Card
      title="Central de Funcionários"
      subtitle="Organize e Supervisione sua Equipe com Facilidade"
      isLoading={isLoading}
    >
      <TableComp
        searchQuery={searchQuery}
        loadingDelete={loadingDelete}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handleSearchInputChange={handleSearchInputChange}
        handleOpenModalToDelete={handleOpenModalToDelete}
        handleOpenModalToEdit={handleOpenModalToEdit}
        handleDelete={handleDelete}
        handleLimitChange={handleLimitChange}
        handleOrderChange={handleOrderChange}
        routerAdd={'/cadastro'}
      />
    </Card>
  );
}
