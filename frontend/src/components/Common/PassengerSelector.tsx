import React, { useState } from "react";
import { Box, Flex, Text, IconButton, Button, VStack } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const PassengerSelector = ({ onPassengersChange, onClose }) => {
  const [passengers, setPassengers] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const updatePassenger = (type, change) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + change),
    }));
  };

  const handleConfirm = () => {
    onPassengersChange(passengers);
    if (onClose && typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <Box bg="black" color="white" p={6} borderRadius="lg">
      <VStack spacing={4} align="stretch">
        {Object.entries(passengers).map(([type, count]) => (
          <Flex key={type} justify="space-between" align="center">
            <Text fontWeight="bold">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
            <Flex align="center">
              <IconButton
                icon={<MinusIcon />}
                onClick={() => updatePassenger(type, -1)}
                aria-label={`Decrease ${type}`}
                size="sm"
                colorScheme="whiteAlpha"
              />
              <Text mx={4}>{count}</Text>
              <IconButton
                icon={<AddIcon />}
                onClick={() => updatePassenger(type, 1)}
                aria-label={`Increase ${type}`}
                size="sm"
                colorScheme="whiteAlpha"
              />
            </Flex>
          </Flex>
        ))}
        <Button onClick={handleConfirm} colorScheme="blue" mt={4}>
          Confirm
        </Button>
      </VStack>
    </Box>
  );
};

export default PassengerSelector;
