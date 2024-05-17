import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { GoBriefcase } from 'react-icons/go';

export default function Header() {
  return (
    <Flex
      bg="white"
      w="100%"
      h="60px"
      px={20}
      borderBottomWidth="1px"
      borderColor="gray.500"
      position="fixed"
      inset={0}
      display="flex"
      align="center"
      gap={5}
    >
      <GoBriefcase color="#4299E1" size={25} />
      <Text fontSize="6xl" as="b" color="#4299E1">
        StaffManager
      </Text>
    </Flex>
  );
}
