// import React, { useState, useCallback } from "react";
// import {
//   Box,
//   Text,
//   Flex,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Button,
//   VStack,
// } from "@chakra-ui/react";
// import { ChevronDownIcon } from "@chakra-ui/icons";
// import PassengerSelector from "./PassengerSelector";

// const TripTypeSelector = () => {
//   const [tripType, setTripType] = useState("Round Trip");
//   const [isOpen, setIsOpen] = useState(false);
//   const [passengers, setPassengers] = useState({
//     adults: 0,
//     children: 0,
//     infants: 0,
//     pets: 0,
//   });

//   const calculatePrice = useCallback(() => {
//     const { adults, children, infants, pets } = passengers;
//     return adults * 50 + children * 30 + infants * 20 + pets * 10;
//   }, [passengers]);

//   const handlePassengersChange = useCallback((newPassengers) => {
//     setPassengers(newPassengers);
//   }, []);

//   return (
//     <VStack spacing={4} align="stretch" width="100%">
//       <Box width="100%">
//         <Flex justify="space-between" align="center" mb={2}>
//           <Text fontSize="lg" fontWeight="bold" color="white">
//             Hanoi to Singapore
//           </Text>
//         </Flex>
//         <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
//           <MenuButton
//             as={Button}
//             rightIcon={<ChevronDownIcon />}
//             onClick={() => setIsOpen(!isOpen)}
//             width="100%"
//             bg="gray.700"
//             color="white"
//             _hover={{ bg: "gray.600" }}
//             _active={{ bg: "gray.600" }}
//             textAlign="left"
//           >
//             {tripType}
//           </MenuButton>
//           <MenuList bg="gray.800" borderColor="gray.600" width="100%">
//             <MenuItem
//               onClick={() => {
//                 setTripType("Round Trip");
//                 setIsOpen(false);
//               }}
//               bg="gray.800"
//               _hover={{ bg: "gray.700" }}
//             >
//               Round Trip
//             </MenuItem>
//             <MenuItem
//               onClick={() => {
//                 setTripType("One Way");
//                 setIsOpen(false);
//               }}
//               bg="gray.800"
//               _hover={{ bg: "gray.700" }}
//             >
//               One Way
//             </MenuItem>
//             <MenuItem
//               onClick={() => {
//                 setTripType("Multi-City");
//                 setIsOpen(false);
//               }}
//               bg="gray.800"
//               _hover={{ bg: "gray.700" }}
//             >
//               Multi-City
//             </MenuItem>
//           </MenuList>
//         </Menu>
//       </Box>
//       <PassengerSelector onPassengersChange={handlePassengersChange} />
//       <Box bg="blue.500" color="white" p={4} borderRadius="lg" mt={4}>
//         <Text fontSize="xl" fontWeight="bold">
//           Total Price: ${calculatePrice()}
//         </Text>
//         <Text>Trip Type: {tripType}</Text>
//       </Box>
//     </VStack>
//   );
// };

// export default TripTypeSelector;
