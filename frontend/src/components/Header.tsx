import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { GoBriefcase } from 'react-icons/go';
import Link from 'next/link';

export default function Header() {
  return (
    <Flex
      bg="white"
      w="100%"
      h="60px"
      align="center"
      display="flex"
      px={20}
      borderBottomWidth="1px"
      borderColor="gray.500"
      position="fixed"
      inset={0}
      gap={5}
      as={'header'}
      zIndex={100}
    >
      <Link href={'/'}>
        <Flex align="center" display="flex" gap={5}>
          <GoBriefcase color="#4299E1" size={25} />
          <Text fontSize="6xl" as="b" color="#4299E1">
            StaffManager
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
}
