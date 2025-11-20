import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

const PrivacyPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bgColor} minH='calc(100vh - 128px)' py={12}>
      <Container maxW='container.lg'>
        <VStack spacing={6} align='stretch'>
          <Heading size='2xl' textAlign='center'>
            Privacy Policy
          </Heading>

          <Text textAlign='center' color='gray.600'>
            Last updated: November 20, 2025
          </Text>

          <Box bg={cardBg} p={8} borderRadius='lg' shadow='md'>
            <VStack spacing={6} align='stretch'>
              <Box>
                <Heading size='md' mb={3}>
                  1. Information We Collect
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  We collect information you provide directly to us, such as
                  when you create an account, place an order, or contact us.
                  This may include your name, email address, postal address,
                  phone number, and payment information.
                </Text>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  2. How We Use Your Information
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  We use the information we collect to:
                </Text>
                <VStack align='stretch' spacing={2} pl={4} mt={2}>
                  <Text color='gray.600'>
                    • Process and fulfill your orders
                  </Text>
                  <Text color='gray.600'>
                    • Send you order confirmations and updates
                  </Text>
                  <Text color='gray.600'>
                    • Respond to your comments and questions
                  </Text>
                  <Text color='gray.600'>
                    • Improve our website and services
                  </Text>
                  <Text color='gray.600'>
                    • Send you marketing communications (with your consent)
                  </Text>
                </VStack>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  3. Information Sharing
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties without your consent, except as
                  described in this Privacy Policy or as required by law.
                </Text>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  4. Data Security
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  We implement appropriate security measures to protect your
                  personal information. However, no method of transmission over
                  the internet is 100% secure, and we cannot guarantee absolute
                  security.
                </Text>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  5. Cookies
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  We use cookies and similar tracking technologies to enhance
                  your experience on our website. You can choose to disable
                  cookies through your browser settings.
                </Text>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  6. Your Rights
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  You have the right to access, correct, or delete your personal
                  information. You can update your account information at any
                  time through your profile settings.
                </Text>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  7. Children's Privacy
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  Our services are not intended for children under 13 years of
                  age. We do not knowingly collect personal information from
                  children under 13.
                </Text>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  8. Changes to This Policy
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date.
                </Text>
              </Box>

              <Box>
                <Heading size='md' mb={3}>
                  9. Contact Us
                </Heading>
                <Text color='gray.600' lineHeight='tall'>
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                  <br />
                  Email: privacy@cartify.com
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

export default PrivacyPage;
