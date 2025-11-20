import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  useToast,
  Select,
  Image,
} from '@chakra-ui/react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../store/productsSlice';
import Loader from '../components/Loader';

const AdminProductsPage = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { products, loading } = useSelector((state) => state.products);

  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: '',
  });

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 100 }));
  }, [dispatch]);

  const handleOpen = (product = null) => {
    if (product) {
      setEditMode(true);
      setCurrentProductId(product._id);
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price,
        category: product.category || '',
        image: product.image || '',
        stock: product.stock || 0,
      });
    } else {
      setEditMode(false);
      setCurrentProductId(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        stock: '',
      });
    }
    onOpen();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };

    let result;
    if (editMode) {
      result = await dispatch(
        updateProduct({ id: currentProductId, productData })
      );
    } else {
      result = await dispatch(createProduct(productData));
    }

    if (result.type.includes('fulfilled')) {
      toast({
        title: editMode ? 'Product updated' : 'Product created',
        status: 'success',
        duration: 2000,
      });
      onClose();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const result = await dispatch(deleteProduct(id));
      if (result.type.includes('fulfilled')) {
        toast({
          title: 'Product deleted',
          status: 'success',
          duration: 2000,
        });
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxW='container.xl' py={8}>
      <HStack justify='space-between' mb={6}>
        <Heading>Manage Products</Heading>
        <Button
          leftIcon={<FiPlus />}
          colorScheme='primary'
          onClick={() => handleOpen()}
        >
          Add Product
        </Button>
      </HStack>

      <Box overflowX='auto'>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product._id}>
                <Td>
                  <Image
                    src={product.image || 'https://via.placeholder.com/50'}
                    alt={product.name}
                    boxSize='50px'
                    objectFit='cover'
                    borderRadius='md'
                  />
                </Td>
                <Td>{product.name}</Td>
                <Td>{product.category}</Td>
                <Td>${product.price?.toFixed(2)}</Td>
                <Td>{product.stock}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      icon={<FiEdit />}
                      size='sm'
                      colorScheme='blue'
                      onClick={() => handleOpen(product)}
                      aria-label='Edit product'
                    />
                    <IconButton
                      icon={<FiTrash2 />}
                      size='sm'
                      colorScheme='red'
                      onClick={() => handleDelete(product._id)}
                      aria-label='Delete product'
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Product Form Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editMode ? 'Edit Product' : 'Add New Product'}
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </FormControl>

                <HStack w='100%'>
                  <FormControl isRequired>
                    <FormLabel>Price</FormLabel>
                    <Input
                      type='number'
                      step='0.01'
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Stock</FormLabel>
                    <Input
                      type='number'
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                    />
                  </FormControl>
                </HStack>

                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value=''>Select Category</option>
                    <option value='electronics'>Electronics</option>
                    <option value='clothing'>Clothing</option>
                    <option value='books'>Books</option>
                    <option value='home'>Home & Garden</option>
                    <option value='sports'>Sports</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Image URL</FormLabel>
                  <Input
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='primary' type='submit' isLoading={loading}>
                {editMode ? 'Update' : 'Create'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AdminProductsPage;
