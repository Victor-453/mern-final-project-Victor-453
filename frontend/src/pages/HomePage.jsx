import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  Box,
  Select,
  Input,
  Button,
  HStack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  fetchProducts,
  setFilters,
  clearFilters,
} from '../store/productsSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { getSocket } from '../api/socket';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, pagination, filters } = useSelector(
    (state) => state.products
  );

  const [localFilters, setLocalFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const bgColor = useColorModeValue('gray.50', 'gray.900');

  useEffect(() => {
    dispatch(fetchProducts({ ...filters, page: 1 }));
  }, [dispatch, filters]);

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.on('stockUpdated', (data) => {
        // Stock updates will be reflected when products are refetched
        console.log('Stock updated:', data);
      });
    }

    return () => {
      if (socket) {
        socket.off('stockUpdated');
      }
    };
  }, []);

  const handleFilterChange = (field, value) => {
    setLocalFilters({ ...localFilters, [field]: value });
  };

  const applyFilters = () => {
    dispatch(setFilters(localFilters));
  };

  const handleClearFilters = () => {
    setLocalFilters({ category: '', minPrice: '', maxPrice: '' });
    dispatch(clearFilters());
  };

  const handlePageChange = (newPage) => {
    dispatch(fetchProducts({ ...filters, page: newPage }));
  };

  return (
    <Box bg={bgColor} minH='calc(100vh - 64px)'>
      <Container maxW='container.xl' py={8}>
        <VStack spacing={6} align='stretch'>
          <Heading>Shop All Products</Heading>

          {/* Filters */}
          <Box
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            borderRadius='lg'
            shadow='sm'
          >
            <VStack spacing={4} align='stretch'>
              <HStack spacing={4} flexWrap='wrap'>
                <Select
                  placeholder='All Categories'
                  value={localFilters.category}
                  onChange={(e) =>
                    handleFilterChange('category', e.target.value)
                  }
                  maxW='200px'
                >
                  <option value='electronics'>Electronics</option>
                  <option value='clothing'>Clothing</option>
                  <option value='books'>Books</option>
                  <option value='home'>Home & Garden</option>
                  <option value='sports'>Sports</option>
                </Select>

                <Input
                  type='number'
                  placeholder='Min Price'
                  value={localFilters.minPrice}
                  onChange={(e) =>
                    handleFilterChange('minPrice', e.target.value)
                  }
                  maxW='150px'
                />

                <Input
                  type='number'
                  placeholder='Max Price'
                  value={localFilters.maxPrice}
                  onChange={(e) =>
                    handleFilterChange('maxPrice', e.target.value)
                  }
                  maxW='150px'
                />

                <Button colorScheme='primary' onClick={applyFilters}>
                  Apply Filters
                </Button>

                <Button variant='outline' onClick={handleClearFilters}>
                  Clear
                </Button>
              </HStack>
            </VStack>
          </Box>

          {/* Products Grid */}
          {loading ? (
            <Loader text='Loading products...' />
          ) : products.length === 0 ? (
            <Box textAlign='center' py={10}>
              <Text fontSize='xl' color='gray.500'>
                No products found
              </Text>
            </Box>
          ) : (
            <>
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
                spacing={6}
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </SimpleGrid>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <HStack justify='center' spacing={2} pt={4}>
                  <Button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    isDisabled={pagination.currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Text>
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </Text>
                  <Button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    isDisabled={
                      pagination.currentPage === pagination.totalPages
                    }
                  >
                    Next
                  </Button>
                </HStack>
              )}
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default HomePage;
