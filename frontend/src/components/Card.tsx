import { Box, Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import TitleAndSubTitle from './TitleAndSubTitle';

export default function Card({
  children,
  title,
  subtitle,
  isLoading,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  isLoading?: boolean;
}) {
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
        <TitleAndSubTitle title={title} subtitle={subtitle} />
        {children}
      </Box>
      {isLoading && (
        <Flex
          display={'flex'}
          align={'center'}
          justify={'center'}
          position={'absolute'}
          inset={0}
          w={'100vw'}
          h={'100vh'}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      )}
    </Box>
  );
}
