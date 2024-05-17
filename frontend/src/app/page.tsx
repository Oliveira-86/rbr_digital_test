import { Box, Container, Flex } from '@chakra-ui/react';
import { Children } from 'react';

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <Box width="100vw" height="100vh" bg="gray.50">
      {children}
    </Box>
  );
}
