import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useColorModeValue,
  Container,
  Text,
  Avatar,
} from '@chakra-ui/react';
import {
  FiShoppingCart,
  FiSearch,
  FiSun,
  FiMoon,
  FiUser,
  FiLogOut,
  FiPackage,
} from 'react-icons/fi';
import { MdAdminPanelSettings } from 'react-icons/md';
import { logout } from '../store/authSlice';
import { setFilters } from '../store/productsSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchInput, setSearchInput] = useState('');

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { itemCount } = useSelector((state) => state.cart);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(setFilters({ search: searchInput }));
      navigate('/');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <Box
      bg={bgColor}
      borderBottom='1px'
      borderColor={borderColor}
      position='sticky'
      top={0}
      zIndex={1000}
      shadow='sm'
    >
      <Container maxW='container.xl'>
        <Flex h={16} alignItems='center' justifyContent='space-between'>
          {/* Logo */}
          <Link to='/'>
            <Text
              fontSize='2xl'
              fontWeight='bold'
              bgGradient='linear(to-r, primary.400, primary.600)'
              bgClip='text'
            >
              Cartify
            </Text>
          </Link>

          {/* Search Bar */}
          <Box
            flex={1}
            maxW='500px'
            mx={8}
            display={{ base: 'none', md: 'block' }}
          >
            <form onSubmit={handleSearch}>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <FiSearch color='gray.300' />
                </InputLeftElement>
                <Input
                  type='text'
                  placeholder='Search products...'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </InputGroup>
            </form>
          </Box>

          {/* Right Menu */}
          <Flex alignItems='center' gap={2}>
            {/* Theme Toggle */}
            <IconButton
              aria-label='Toggle theme'
              icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
              variant='ghost'
            />

            {/* Cart */}
            <Box position='relative'>
              <IconButton
                aria-label='Shopping cart'
                icon={<FiShoppingCart />}
                variant='ghost'
                onClick={() => navigate('/cart')}
              />
              {itemCount > 0 && (
                <Badge
                  position='absolute'
                  top='-1'
                  right='-1'
                  colorScheme='red'
                  borderRadius='full'
                  fontSize='xs'
                >
                  {itemCount}
                </Badge>
              )}
            </Box>

            {/* User Menu */}
            {isAuthenticated ? (
              <Menu>
                <MenuButton
                  as={Button}
                  variant='ghost'
                  leftIcon={<Avatar size='sm' name={user?.name} />}
                >
                  {user?.name}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    icon={<FiUser />}
                    onClick={() => navigate('/profile')}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    icon={<FiPackage />}
                    onClick={() => navigate('/profile')}
                  >
                    My Orders
                  </MenuItem>
                  {isAdmin && (
                    <>
                      <MenuItem
                        icon={<MdAdminPanelSettings />}
                        onClick={() => navigate('/admin/products')}
                      >
                        Admin Dashboard
                      </MenuItem>
                    </>
                  )}
                  <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button colorScheme='primary' onClick={() => navigate('/login')}>
                Login
              </Button>
            )}
          </Flex>
        </Flex>

        {/* Mobile Search */}
        <Box pb={4} display={{ base: 'block', md: 'none' }}>
          <form onSubmit={handleSearch}>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <FiSearch color='gray.300' />
              </InputLeftElement>
              <Input
                type='text'
                placeholder='Search products...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </InputGroup>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
