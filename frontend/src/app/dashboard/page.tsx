import React from 'react';
import TableComp from '@/components/Table';
import { Box } from '@chakra-ui/react';

export default function DashBoard() {
  return (
    <Box
      w="100%"
      bg="gray.50"
      py={120}
      px={['20px', '25px', '30px', '35px', '40px']}
    >
      <Box
        p={['20px', '25px', '30px', '35px', '40px']}
        w="100%"
        h="auto"
        bg="white"
        borderRadius={20}
        borderWidth={1}
        borderColor="gray.200"
      >
        <TableComp />
      </Box>
    </Box>
  );
}
