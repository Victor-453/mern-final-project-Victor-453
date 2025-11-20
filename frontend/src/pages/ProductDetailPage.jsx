import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Grid,
  Image,
  VStack,
  Heading,
  Text,
  Button,
  Badge,
  HStack,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { fetchProductById } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';
import Loader from '../components/Loader';
import { getSocket } from '../api/socket';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { currentProduct: product, loading } = useSelector(
    (state) => state.products
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const bgColor = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    const socket = getSocket();
    if (socket && product) {
      socket.on('stockUpdated', (data) => {
        if (data.productId === product._id) {
          dispatch(fetchProductById(id));
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('stockUpdated');
      }
    };
  }, [product, dispatch, id]);

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast({
        title: 'Out of stock',
        description: 'This product is currently out of stock',
        status: 'error',
        duration: 2000,
      });
      return;
    }

    if (quantity > product.stock) {
      toast({
        title: 'Insufficient stock',
        description: `Only ${product.stock} items available`,
        status: 'warning',
        duration: 2000,
      });
      return;
    }

    dispatch(addToCart({ product, quantity, variant: selectedVariant }));
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart`,
      status: 'success',
      duration: 2000,
      position: 'bottom-right',
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <Container maxW='container.xl' py={8}>
        <Text>Product not found</Text>
      </Container>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <Container maxW='container.xl' py={8}>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
        {/* Product Image */}
        <Box>
          <Image
            src={product.image || 'https://via.placeholder.com/500'}
            alt={product.name}
            w='100%'
            borderRadius='lg'
            objectFit='cover'
          />
        </Box>

        {/* Product Details */}
        <Box bg={bgColor} p={6} borderRadius='lg'>
          <VStack align='stretch' spacing={4}>
            <Box>
              <Text fontSize='sm' color='gray.500' textTransform='uppercase'>
                {product.category || 'Uncategorized'}
              </Text>
              <Heading size='xl' mt={2}>
                {product.name}
              </Heading>
            </Box>

            <HStack>
              <Text fontSize='3xl' fontWeight='bold' color='primary.500'>
                ${product.price?.toFixed(2)}
              </Text>
              {isOutOfStock ? (
                <Badge colorScheme='red' fontSize='md'>
                  Out of Stock
                </Badge>
              ) : product.stock < 10 ? (
                <Badge colorScheme='orange' fontSize='md'>
                  Only {product.stock} left
                </Badge>
              ) : (
                <Badge colorScheme='green' fontSize='md'>
                  In Stock
                </Badge>
              )}
            </HStack>

            <Divider />

            <Box>
              <Text fontWeight='semibold' mb={2}>
                Description
              </Text>
              <Text color='gray.600'>{product.description}</Text>
            </Box>

            {/* Variants (if any) */}
            {product.variants && product.variants.length > 0 && (
              <Box>
                <Text fontWeight='semibold' mb={2}>
                  Select Variant
                </Text>
                <Select
                  placeholder='Choose a variant'
                  onChange={(e) => setSelectedVariant(e.target.value)}
                >
                  {product.variants.map((variant, index) => (
                    <option key={index} value={variant}>
                      {variant}
                    </option>
                  ))}
                </Select>
              </Box>
            )}

            {/* Quantity Selector */}
            <Box>
              <Text fontWeight='semibold' mb={2}>
                Quantity
              </Text>
              <NumberInput
                value={quantity}
                onChange={(_, val) => setQuantity(val)}
                min={1}
                max={product.stock}
                isDisabled={isOutOfStock}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>

            <Divider />

            {/* Action Buttons */}
            <VStack spacing={3}>
              <Button
                colorScheme='primary'
                size='lg'
                width='100%'
                leftIcon={<FiShoppingCart />}
                onClick={handleAddToCart}
                isDisabled={isOutOfStock}
              >
                Add to Cart
              </Button>
              <Button
                variant='outline'
                colorScheme='primary'
                size='lg'
                width='100%'
                onClick={handleBuyNow}
                isDisabled={isOutOfStock}
              >
                Buy Now
              </Button>
            </VStack>

            {/* Additional Info */}
            <Box
              bg={useColorModeValue('gray.50', 'gray.700')}
              p={4}
              borderRadius='md'
            >
              <VStack align='stretch' spacing={2} fontSize='sm'>
                <HStack justify='space-between'>
                  <Text color='gray.600'>Stock:</Text>
                  <Text fontWeight='semibold'>{product.stock} units</Text>
                </HStack>
                <HStack justify='space-between'>
                  <Text color='gray.600'>SKU:</Text>
                  <Text fontWeight='semibold'>{product._id.slice(-8)}</Text>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
