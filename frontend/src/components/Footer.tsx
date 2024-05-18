import { Box, Flex, Text, IconButton, Link, Stack } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { GoBriefcase } from 'react-icons/go';

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="white"
      borderTopWidth="1px"
      borderColor="gray.500"
      color="white"
      py={8}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={4}
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="center"
      >
        <Flex
          bg="white"
          w="100%"
          h="60px"
          px={20}
          display="flex"
          align="center"
          justify={'center'}
          gap={5}
        >
          <GoBriefcase color="#4299E1" size={25} />
          <Text fontSize="6xl" as="b" color="#4299E1">
            StaffManager
          </Text>
        </Flex>
        <Stack
          direction="row"
          spacing={4}
          justify={{ base: 'center', md: 'flex-end' }}
          w={{ base: '100%', md: 'auto' }}
        >
          <Link href="https://www.facebook.com" isExternal>
            <IconButton
              aria-label="Facebook"
              icon={<FaFacebook />}
              w={20}
              h={20}
              color="#4299E1"
              _hover={{ bg: 'blue.600' }}
            />
          </Link>
          <Link href="https://www.twitter.com" isExternal>
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter />}
              w={20}
              h={20}
              color="#4299E1"
              _hover={{ bg: 'blue.600' }}
            />
          </Link>
          <Link href="https://www.instagram.com" isExternal>
            <IconButton
              aria-label="Instagram"
              icon={<FaInstagram />}
              w={20}
              h={20}
              color="#4299E1"
              _hover={{ bg: 'blue.600' }}
            />
          </Link>
          <Link href="https://www.linkedin.com" isExternal>
            <IconButton
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              w={20}
              h={20}
              color="#4299E1"
              _hover={{ bg: 'blue.600' }}
            />
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;
