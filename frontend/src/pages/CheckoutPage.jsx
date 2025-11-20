import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Heading,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Divider,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { createOrder } from '../store/ordersSlice';
import { clearCart } from '../store/cartSlice';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { items, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.orders);

  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const bgColor = useColorModeValue('white', 'gray.800');

  const handleChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (items.length === 0) {
      toast({
        title: 'Cart is empty',
        status: 'warning',
        duration: 2000,
      });
      return;
    }

    const orderData = {
      items: items.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
        variant: item.variant,
      })),
      shippingInfo,
      total,
    };

    const result = await dispatch(createOrder(orderData));

    if (result.type === 'orders/createOrder/fulfilled') {
      dispatch(clearCart());
      toast({
        title: 'Order placed successfully!',
        description: 'Thank you for your purchase',
        status: 'success',
        duration: 3000,
      });
      navigate('/profile');
    } else {
      toast({
        title: 'Order failed',
        description: result.payload || 'Please try again',
        status: 'error',
        duration: 3000,
      });
    }
  };

  if (items.length === 0) {
    return (
      <Container maxW='container.md' py={20}>
        <VStack spacing={4}>
          <Heading>Your Cart is Empty</Heading>
          <Button colorScheme='primary' onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW='container.xl' py={8}>
      <Heading mb={6}>Checkout</Heading>

      <Box
        display='grid'
        gridTemplateColumns={{ base: '1fr', lg: '2fr 1fr' }}
        gap={6}
      >
        {/* Shipping Form */}
        <Box bg={bgColor} p={6} borderRadius='lg' shadow='md'>
          <Heading size='md' mb={4}>
            Shipping Information
          </Heading>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align='stretch'>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input value={user?.name} isReadOnly />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type='email' value={user?.email} isReadOnly />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  name='address'
                  value={shippingInfo.address}
                  onChange={handleChange}
                  placeholder='Street address'
                />
              </FormControl>

              <HStack>
                <FormControl isRequired>
                  <FormLabel>City</FormLabel>
                  <Input
                    name='city'
                    value={shippingInfo.city}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Postal Code</FormLabel>
                  <Input
                    name='postalCode'
                    value={shippingInfo.postalCode}
                    onChange={handleChange}
                  />
                </FormControl>
              </HStack>

              <FormControl isRequired>
                <FormLabel>Country</FormLabel>
                <Input
                  name='country'
                  value={shippingInfo.country}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                  name='phone'
                  type='tel'
                  value={shippingInfo.phone}
                  onChange={handleChange}
                />
              </FormControl>

              <Box
                bg={useColorModeValue('blue.50', 'blue.900')}
                p={4}
                borderRadius='md'
              >
                <Text fontWeight='semibold' mb={2}>
                  Payment Method
                </Text>
                <Text fontSize='sm' color='gray.600'>
                  Cash on Delivery (COD) - Pay when you receive your order
                </Text>
              </Box>
            </VStack>
          </form>
        </Box>

        {/* Order Summary */}
        <Box bg={bgColor} p={6} borderRadius='lg' shadow='md' h='fit-content'>
          <Heading size='md' mb={4}>
            Order Summary
          </Heading>

          <VStack spacing={3} align='stretch'>
            {items.map((item) => (
              <HStack
                key={`${item._id}-${item.variant}`}
                justify='space-between'
              >
                <Text fontSize='sm'>
                  {item.name} x {item.quantity}
                </Text>
                <Text fontSize='sm' fontWeight='semibold'>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </HStack>
            ))}

            <Divider />

            <HStack justify='space-between'>
              <Text>Subtotal:</Text>
              <Text fontWeight='semibold'>${total.toFixed(2)}</Text>
            </HStack>
            <HStack justify='space-between'>
              <Text>Shipping:</Text>
              <Text fontWeight='semibold'>Free</Text>
            </HStack>
            <Divider />
            <HStack justify='space-between'>
              <Text fontSize='lg' fontWeight='bold'>
                Total:
              </Text>
              <Text fontSize='lg' fontWeight='bold' color='primary.500'>
                ${total.toFixed(2)}
              </Text>
            </HStack>

            <Button
              colorScheme='primary'
              size='lg'
              onClick={handleSubmit}
              isLoading={loading}
              mt={4}
            >
              Place Order
            </Button>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
