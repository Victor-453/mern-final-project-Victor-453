import {
  Box,
  Container,
  Flex,
  Text,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiGithub, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      borderTop='1px'
      borderColor={borderColor}
      mt='auto'
      py={8}
    >
      <Container maxW='container.xl'>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align='center'
          gap={4}
        >
          {/* Brand */}
          <Box>
            <Text
              fontSize='xl'
              fontWeight='bold'
              bgGradient='linear(to-r, primary.400, primary.600)'
              bgClip='text'
            >
              Cartify
            </Text>
            <Text fontSize='sm' color='gray.500' mt={1}>
              Your trusted e-commerce platform
            </Text>
          </Box>

          {/* Links */}
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={6}
            align='center'
          >
            <Link href='/about' fontSize='sm'>
              About Us
            </Link>
            <Link href='/contact' fontSize='sm'>
              Contact
            </Link>
            <Link href='/privacy' fontSize='sm'>
              Privacy Policy
            </Link>
            <Link href='/terms' fontSize='sm'>
              Terms of Service
            </Link>
          </Stack>

          {/* Social Media */}
          <Flex gap={4}>
            <Link href='#' aria-label='Facebook'>
              <FiFacebook />
            </Link>
            <Link href='#' aria-label='Twitter'>
              <FiTwitter />
            </Link>
            <Link href='#' aria-label='Instagram'>
              <FiInstagram />
            </Link>
            <Link href='#' aria-label='GitHub'>
              <FiGithub />
            </Link>
          </Flex>
        </Flex>

        <Text textAlign='center' fontSize='sm' color='gray.500' mt={8}>
          © {new Date().getFullYear()} Cartify. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
