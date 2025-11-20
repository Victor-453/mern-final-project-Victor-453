import { Box, Spinner, Text } from '@chakra-ui/react';

const Loader = ({ text = 'Loading...' }) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minH='400px'
      gap={4}
    >
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='primary.500'
        size='xl'
      />
      <Text color='gray.600'>{text}</Text>
    </Box>
  );
};

export default Loader;
