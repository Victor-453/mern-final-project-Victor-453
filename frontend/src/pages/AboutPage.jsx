import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

const AboutPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box bg={bgColor} minH='calc(100vh - 128px)' py={12}>
      <Container maxW='container.lg'>
        <VStack spacing={6} align='stretch'>
          <Heading size='2xl' textAlign='center'>
            About Cartify
          </Heading>

          <Box
            bg={useColorModeValue('white', 'gray.800')}
            p={8}
            borderRadius='lg'
            shadow='md'
          >
            <VStack spacing={4} align='stretch'>
              <Heading size='lg'>Our Story</Heading>
              <Text fontSize='lg' color='gray.600' lineHeight='tall'>
                Welcome to Cartify, your number one source for all things
                shopping. We're dedicated to giving you the very best of
                products, with a focus on quality, customer service, and
                uniqueness.
              </Text>

              <Text fontSize='lg' color='gray.600' lineHeight='tall'>
                Founded in 2024, Cartify has come a long way from its
                beginnings. When we first started out, our passion for providing
                the best shopping experience drove us to create this platform,
                and gave us the impetus to turn hard work and inspiration into a
                booming online store.
              </Text>

              <Heading size='lg' mt={4}>
                Our Mission
              </Heading>
              <Text fontSize='lg' color='gray.600' lineHeight='tall'>
                We now serve customers all over the world and are thrilled to be
                a part of the eco-friendly, fair trade wing of the e-commerce
                industry. We hope you enjoy our products as much as we enjoy
                offering them to you.
              </Text>

              <Heading size='lg' mt={4}>
                What We Offer
              </Heading>
              <VStack align='stretch' spacing={2} pl={4}>
                <Text fontSize='lg' color='gray.600'>
                  • Wide range of quality products
                </Text>
                <Text fontSize='lg' color='gray.600'>
                  • Secure and fast checkout process
                </Text>
                <Text fontSize='lg' color='gray.600'>
                  • Excellent customer service
                </Text>
                <Text fontSize='lg' color='gray.600'>
                  • Real-time order tracking
                </Text>
                <Text fontSize='lg' color='gray.600'>
                  • Safe and secure payments
                </Text>
              </VStack>

              <Text fontSize='lg' color='gray.600' lineHeight='tall' mt={4}>
                If you have any questions or comments, please don't hesitate to
                contact us.
              </Text>

              <Text
                fontSize='lg'
                fontWeight='semibold'
                color='primary.500'
                mt={4}
              >
                Sincerely,
                <br />
                The Cartify Team
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutPage;
