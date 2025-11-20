import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

const TermsPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bgColor} minH='calc(100vh - 128px)' py={12}>
      <Container maxW='container.lg'>
        <VStack spacing={6} align='stretch'>
          <Heading size='2xl' textAlign='center'>
            Terms of Service
          </Heading>

          <Text textAlign='center' color='gray.600'>
            Last updated: November 20, 2025
          </Text>

          <Box bg={cardBg} p={8} borderRadius='lg' shadow='md'>
            <VStack spacing={6} align='stretch'>
              <Box>
                <Heading size='md' mb={3}>
                  1. Acceptance of Terms
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  By accessing and using Cartify, you accept and agree to be
                  bound by the terms and provision of this agreement. If you do
                  not agree to these terms, please do not use our services.
                </Text>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  2. Use of Service
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  You agree to use our service only for lawful purposes and in
                  accordance with these Terms. You agree not to use our service:
                </Text>
                <VStack align='stretch' spacing={2} pl={4} mt={2}>
                  <Text color='gray.600'>
                    • In any way that violates any applicable law or regulation
                  </Text>
                  <Text color='gray.600'>
                    • To transmit any harmful or malicious code
                  </Text>
                  <Text color='gray.600'>
                    • To impersonate or attempt to impersonate Cartify or
                    another user
                  </Text>
                  <Text color='gray.600'>
                    • To engage in any conduct that restricts or inhibits
                    anyone's use of the service
                  </Text>
                </VStack>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  3. Account Registration
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  To place orders, you must create an account. You are
                  responsible for maintaining the confidentiality of your
                  account and password. You agree to accept responsibility for
                  all activities that occur under your account.
                </Text>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  4. Orders and Payment
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  All orders are subject to acceptance and availability. We
                  reserve the right to refuse or cancel any order for any
                  reason. Prices are subject to change without notice. Payment
                  must be received before order processing begins.
                </Text>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  5. Shipping and Delivery
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  We will make reasonable efforts to deliver products within the
                  estimated timeframe. However, we are not responsible for
                  delays caused by circumstances beyond our control.
                </Text>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  6. Returns and Refunds
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  Products may be returned within 30 days of delivery for a
                  refund or exchange, subject to our return policy. Items must
                  be unused and in their original packaging. Refunds will be
                  processed within 7-10 business days.
                </Text>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  7. Intellectual Property
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  All content on this website, including text, graphics, logos,
                  images, and software, is the property of Cartify and protected
                  by copyright and intellectual property laws.
                </Text>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  8. Limitation of Liability
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  Cartify shall not be liable for any indirect, incidental,
                  special, or consequential damages arising out of or in
                  connection with your use of our service.
                </Text>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  9. Modifications to Terms
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  We reserve the right to modify these terms at any time.
                  Changes will be effective immediately upon posting. Your
                  continued use of the service after changes are posted
                  constitutes your acceptance of the modified terms.
                </Text>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  10. Governing Law
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  These terms shall be governed by and construed in accordance
                  with the laws of the jurisdiction in which Cartify operates.
                </Text>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  11. Contact Information
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  If you have any questions about these Terms of Service, please
                  contact us at:
                  <br />
                  Email: legal@cartify.com
                  <br />
                  Phone: +1 (555) 123-4567
                </Text>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default TermsPage;
