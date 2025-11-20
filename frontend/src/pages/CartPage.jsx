import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Heading,
  VStack,
  HStack,
  Image,
  Text,
  Button,
  IconButton,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const bgColor = useColorModeValue('white', 'gray.800');

  const handleRemove = (productId, variant) => {
    dispatch(removeFromCart({ productId, variant }));
  };

  const handleUpdateQuantity = (productId, newQuantity, variant) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, quantity: newQuantity, variant }));
  };

  if (items.length === 0) {
    return (
      <Container maxW='container.md' py={20}>
        <VStack spacing={4}>
          <Heading>Your Cart is Empty</Heading>
          <Text color='gray.500'>Add some products to get started!</Text>
          <Button colorScheme='primary' onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW='container.xl' py={8}>
      <Heading mb={6}>Shopping Cart</Heading>

      <Box
        display='grid'
        gridTemplateColumns={{ base: '1fr', lg: '2fr 1fr' }}
        gap={6}
      >
        {/* Cart Items */}
        <VStack spacing={4} align='stretch'>
          {items.map((item) => (
            <Box
              key={`${item._id}-${item.variant}`}
              bg={bgColor}
              p={4}
              borderRadius='lg'
              shadow='sm'
            >
              <HStack spacing={4} align='start'>
                <Image
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.name}
                  boxSize='100px'
                  objectFit='cover'
                  borderRadius='md'
                />

                <Box flex={1}>
                  <Heading size='md'>{item.name}</Heading>
                  {item.variant && (
                    <Text fontSize='sm' color='gray.500'>
                      Variant: {item.variant}
                    </Text>
                  )}
                  <Text
                    fontSize='xl'
                    fontWeight='bold'
                    color='primary.500'
                    mt={2}
                  >
                    ${item.price.toFixed(2)}
                  </Text>

                  <HStack mt={4} spacing={2}>
                    <IconButton
                      size='sm'
                      icon={<FiMinus />}
                      onClick={() =>
                        handleUpdateQuantity(
                          item._id,
                          item.quantity - 1,
                          item.variant
                        )
                      }
                      isDisabled={item.quantity <= 1}
                    />
                    <Text fontWeight='semibold' minW='30px' textAlign='center'>
                      {item.quantity}
                    </Text>
                    <IconButton
                      size='sm'
                      icon={<FiPlus />}
                      onClick={() =>
                        handleUpdateQuantity(
                          item._id,
                          item.quantity + 1,
                          item.variant
                        )
                      }
                      isDisabled={item.quantity >= item.stock}
                    />
                  </HStack>
                </Box>

                <VStack align='end' spacing={2}>
                  <Text fontSize='lg' fontWeight='bold'>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                  <IconButton
                    icon={<FiTrash2 />}
                    colorScheme='red'
                    variant='ghost'
                    onClick={() => handleRemove(item._id, item.variant)}
                    aria-label='Remove item'
                  />
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>

        {/* Order Summary */}
        <Box bg={bgColor} p={6} borderRadius='lg' shadow='md' h='fit-content'>
          <Heading size='md' mb={4}>
            Order Summary
          </Heading>

          <VStack spacing={3} align='stretch'>
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
              onClick={() => navigate('/checkout')}
              mt={4}
            >
              Proceed to Checkout
            </Button>
            <Button variant='outline' onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
};

export default CartPage;
