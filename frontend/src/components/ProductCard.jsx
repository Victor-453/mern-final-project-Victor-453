import {
  Box,
  Image,
  Text,
  Button,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useToast } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.stock > 0) {
      dispatch(addToCart({ product, quantity: 1, variant: null }));
      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'bottom-right',
      });
    } else {
      toast({
        title: 'Out of stock',
        description: 'This product is currently out of stock',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const isOutOfStock = product.stock === 0;

  return (
    <Box
      bg={cardBg}
      borderWidth='1px'
      borderColor={borderColor}
      borderRadius='lg'
      overflow='hidden'
      cursor='pointer'
      transition='all 0.2s'
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
      onClick={() => navigate(`/product/${product._id}`)}
      position='relative'
    >
      {/* Out of Stock Badge */}
      {isOutOfStock && (
        <Badge
          position='absolute'
          top={2}
          right={2}
          colorScheme='red'
          zIndex={1}
          fontSize='xs'
        >
          Out of Stock
        </Badge>
      )}

      {/* Product Image */}
      <Box h='200px' bg='gray.100' overflow='hidden'>
        <Image
          src={
            product.image || 'https://via.placeholder.com/300x200?text=No+Image'
          }
          alt={product.name}
          w='100%'
          h='100%'
          objectFit='cover'
          opacity={isOutOfStock ? 0.5 : 1}
        />
      </Box>

      {/* Product Details */}
      <Box p={4}>
        <Text fontSize='sm' color='gray.500' mb={1}>
          {product.category || 'Uncategorized'}
        </Text>
        <Text fontWeight='semibold' fontSize='lg' noOfLines={2} mb={2}>
          {product.name}
        </Text>
        <Text color='gray.600' fontSize='sm' noOfLines={2} mb={3}>
          {product.description}
        </Text>

        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Text fontSize='2xl' fontWeight='bold' color='primary.500'>
            ${product.price?.toFixed(2)}
          </Text>

          <Button
            size='sm'
            colorScheme='primary'
            leftIcon={<FiShoppingCart />}
            onClick={handleAddToCart}
            isDisabled={isOutOfStock}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </Box>

        {!isOutOfStock && product.stock < 10 && (
          <Text fontSize='xs' color='orange.500' mt={2}>
            Only {product.stock} left in stock
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
