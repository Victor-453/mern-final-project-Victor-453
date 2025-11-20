import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Heading,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { fetchOrders } from '../store/ordersSlice';
import { updateProfile } from '../store/authSlice';
import Loader from '../components/Loader';
import { getSocket } from '../api/socket';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { orders, loading: ordersLoading } = useSelector(
    (state) => state.orders
  );

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const bgColor = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.on('orderStatusUpdated', (data) => {
        if (orders.some((order) => order._id === data.orderId)) {
          dispatch(fetchOrders());
          toast({
            title: 'Order Updated',
            description: `Your order status has been updated to ${data.status}`,
            status: 'info',
            duration: 3000,
            isClosable: true,
          });
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('orderStatusUpdated');
      }
    };
  }, [orders, dispatch, toast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    toast({
      title: 'Profile updated',
      status: 'success',
      duration: 2000,
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'yellow',
      processing: 'blue',
      shipped: 'purple',
      delivered: 'green',
      cancelled: 'red',
    };
    return colors[status] || 'gray';
  };

  return (
    <Container maxW='container.xl' py={8}>
      <Heading mb={6}>My Account</Heading>

      <Tabs colorScheme='primary'>
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Order History</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box bg={bgColor} p={6} borderRadius='lg' maxW='600px'>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align='stretch'>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type='email'
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </FormControl>

                  <Button
                    type='submit'
                    colorScheme='primary'
                    isLoading={authLoading}
                  >
                    Update Profile
                  </Button>
                </VStack>
              </form>
            </Box>
          </TabPanel>

          <TabPanel>
            {ordersLoading ? (
              <Loader />
            ) : orders.length === 0 ? (
              <Box textAlign='center' py={10}>
                <Text fontSize='lg' color='gray.500'>
                  No orders yet
                </Text>
              </Box>
            ) : (
              <Box overflowX='auto'>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>Order ID</Th>
                      <Th>Date</Th>
                      <Th>Total</Th>
                      <Th>Status</Th>
                      <Th>Items</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {orders.map((order) => (
                      <Tr key={order._id}>
                        <Td>{order._id.slice(-8)}</Td>
                        <Td>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </Td>
                        <Td>${order.total?.toFixed(2)}</Td>
                        <Td>
                          <Badge colorScheme={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </Td>
                        <Td>{order.items?.length} items</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default ProfilePage;
