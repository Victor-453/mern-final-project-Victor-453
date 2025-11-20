import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { login, clearError } from '../store/authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const bgColor = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <Container maxW='container.sm' py={20}>
      <Box bg={bgColor} p={8} borderRadius='lg' shadow='md'>
        <VStack spacing={6} align='stretch'>
          <Heading textAlign='center'>Welcome Back to Cartify</Heading>
          <Text textAlign='center' color='gray.500'>
            Login to your account to continue shopping
          </Text>

          {error && (
            <Alert status='error' borderRadius='md'>
              <AlertIcon />
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    placeholder='Enter your password'
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                      icon={showPassword ? <FiEyeOff /> : <FiEye />}
                      onClick={() => setShowPassword(!showPassword)}
                      variant='ghost'
                      size='sm'
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                type='submit'
                colorScheme='primary'
                width='100%'
                size='lg'
                isLoading={loading}
              >
                Login
              </Button>
            </VStack>
          </form>

          <Text textAlign='center'>
            Don't have an account?{' '}
            <Link
              to='/register'
              style={{ color: '#0ea5e9', fontWeight: 'bold' }}
            >
              Register here
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default LoginPage;
