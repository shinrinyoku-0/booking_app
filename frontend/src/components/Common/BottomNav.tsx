import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { FaHotel, FaPlane, FaBookmark, FaCompass } from "react-icons/fa";

const BottomNav = () => {
  return (
    <Box position="fixed" bottom="0" width="100%" bg="black" p={2}>
      <Flex justify="space-around" color="white">
        <IconButton
          icon={<FaCompass />}
          aria-label="Explore"
          colorScheme="whiteAlpha"
        />
        <IconButton
          icon={<FaHotel />}
          aria-label="Hotels"
          colorScheme="whiteAlpha"
        />
        <IconButton
          icon={<FaPlane />}
          aria-label="Flights"
          colorScheme="whiteAlpha"
        />
        <IconButton
          icon={<FaBookmark />}
          aria-label="Saved"
          colorScheme="whiteAlpha"
        />
      </Flex>
    </Box>
  );
};

export default BottomNav;
