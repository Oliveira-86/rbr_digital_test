'use client';

import React from 'react';
import TableComp from '@/components/Table';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Card from '@/components/Card';

export default function DashBoard() {
  const { isLoading } = useSelector((state: RootState) => state.employees);
  return (
    <Card
      title="Central de Funcionários"
      subtitle="Organize e Supervisione sua Equipe com Facilidade"
      isLoading={isLoading}
    >
      <TableComp />
    </Card>
  );
}
