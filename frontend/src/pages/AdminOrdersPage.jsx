import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Select,
  useToast,
  Text,
} from '@chakra-ui/react';
import { fetchAllOrders, updateOrderStatus } from '../store/ordersSlice';
import Loader from '../components/Loader';
import { getSocket } from '../api/socket';

const AdminOrdersPage = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      // Real-time order updates for admin
      socket.on('newOrder', () => {
        dispatch(fetchAllOrders());
        toast({
          title: 'New Order',
          description: 'A new order has been placed',
          status: 'info',
          duration: 3000,
        });
      });
    }

    return () => {
      if (socket) {
        socket.off('newOrder');
      }
    };
  }, [dispatch, toast]);

  const handleStatusChange = async (orderId, newStatus) => {
    const result = await dispatch(
      updateOrderStatus({ id: orderId, status: newStatus })
    );
    if (result.type.includes('fulfilled')) {
      toast({
        title: 'Order status updated',
        status: 'success',
        duration: 2000,
      });
    }
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

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxW='container.xl' py={8}>
      <Heading mb={6}>Manage Orders</Heading>

      {orders.length === 0 ? (
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
                <Th>Customer</Th>
                <Th>Date</Th>
                <Th>Total</Th>
                <Th>Items</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order._id}>
                  <Td>{order._id.slice(-8)}</Td>
                  <Td>
                    <Text fontWeight='semibold'>{order.user?.name}</Text>
                    <Text fontSize='sm' color='gray.500'>
                      {order.user?.email}
                    </Text>
                  </Td>
                  <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
                  <Td fontWeight='semibold'>${order.total?.toFixed(2)}</Td>
                  <Td>{order.items?.length} items</Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Select
                      size='sm'
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value='pending'>Pending</option>
                      <option value='processing'>Processing</option>
                      <option value='shipped'>Shipped</option>
                      <option value='delivered'>Delivered</option>
                      <option value='cancelled'>Cancelled</option>
                    </Select>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Container>
  );
};

export default AdminOrdersPage;
