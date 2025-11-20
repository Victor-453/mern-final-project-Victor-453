import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { useState } from 'react';

const ContactPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this to your backend
    toast({
      title: 'Message sent!',
      description: "We'll get back to you as soon as possible.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Box bg={bgColor} minH='calc(100vh - 128px)' py={12}>
      <Container maxW='container.lg'>
        <VStack spacing={8} align='stretch'>
          <Box textAlign='center'>
            <Heading size='2xl' mb={4}>
              Contact Us
            </Heading>
            <Text fontSize='lg' color='gray.600'>
              Have a question? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </Text>
          </Box>

          <Box
            display='grid'
            gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
            gap={8}
          >
            {/* Contact Information */}
            <Box bg={cardBg} p={8} borderRadius='lg' shadow='md'>
              <VStack spacing={6} align='stretch'>
                <Heading size='lg' mb={4}>
                  Get in Touch
                </Heading>

                <HStack spacing={4} align='start'>
                  <Box color='primary.500' fontSize='24px'>
                    <FiMail />
                  </Box>
                  <VStack align='start' spacing={1}>
                    <Text fontWeight='semibold'>Email</Text>
                    <Text color='gray.600'>support@cartify.com</Text>
                  </VStack>
                </HStack>

                <HStack spacing={4} align='start'>
                  <Box color='primary.500' fontSize='24px'>
                    <FiPhone />
                  </Box>
                  <VStack align='start' spacing={1}>
                    <Text fontWeight='semibold'>Phone</Text>
                    <Text color='gray.600'>+1 (555) 123-4567</Text>
                  </VStack>
                </HStack>

                <HStack spacing={4} align='start'>
                  <Box color='primary.500' fontSize='24px'>
                    <FiMapPin />
                  </Box>
                  <VStack align='start' spacing={1}>
                    <Text fontWeight='semibold'>Address</Text>
                    <Text color='gray.600'>
                      123 E-commerce Street
                      <br />
                      San Francisco, CA 94102
                      <br />
                      United States
                    </Text>
                  </VStack>
                </HStack>

                <Box mt={4}>
                  <Text fontWeight='semibold' mb={2}>
                    Business Hours
                  </Text>
                  <Text color='gray.600'>
                    Monday - Friday: 9:00 AM - 6:00 PM PST
                    <br />
                    Saturday: 10:00 AM - 4:00 PM PST
                    <br />
                    Sunday: Closed
                  </Text>
                </Box>
              </VStack>
            </Box>

            {/* Contact Form */}
            <Box bg={cardBg} p={8} borderRadius='lg' shadow='md'>
              <Heading size='lg' mb={6}>
                Send us a Message
              </Heading>

              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align='stretch'>
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      placeholder='Your name'
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='your@email.com'
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Subject</FormLabel>
                    <Input
                      name='subject'
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder='How can we help?'
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Message</FormLabel>
                    <Textarea
                      name='message'
                      value={formData.message}
                      onChange={handleChange}
                      placeholder='Your message...'
                      rows={6}
                    />
                  </FormControl>

                  <Button
                    type='submit'
                    colorScheme='primary'
                    size='lg'
                    width='100%'
                  >
                    Send Message
                  </Button>
                </VStack>
              </form>
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactPage;
