import { Box, Button, Image, Text, VStack } from "@chakra-ui/react";

const ExploreCard = () => {
  return (
    <Box borderRadius="lg" overflow="hidden" bg="black" color="white" mt={4}>
      <Image src="https://example.com/mount-fuji.jpg" alt="Mount Fuji" />

      <VStack align="start" p={4}>
        <Text fontWeight="bold" fontSize="xl">
          Mount Fuji
        </Text>
        <Text>
          Mount Fuji, located on Honshu island, is the highest mountain in
          Japan.
        </Text>
        <Button colorScheme="blue" w="100%">
          Explore
        </Button>
      </VStack>
    </Box>
  );
};

export default ExploreCard;
