import React from "react";
import { Box, Text } from "@chakra-ui/react";

const PriceDisplay = ({ price, tripType }) => {
  return (
    <Box bg="blue.500" color="white" p={4} borderRadius="lg" mt={4}>
      <Text fontSize="xl" fontWeight="bold">
        Total Price: ${price}
      </Text>
      <Text>Trip Type: {tripType}</Text>
    </Box>
  );
};

export default PriceDisplay;
