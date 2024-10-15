import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  VStack,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  HamburgerIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { FaUserCircle } from "react-icons/fa";
import FlightSearchResults from "./FlightSearchResults";
import PassengerSelector from "./PassengerSelector";

const Header: React.FC = () => {
  const [fromCity, setFromCity] = useState("Hanoi");
  const [toCity, setToCity] = useState("Singapore");
  const [departDate, setDepartDate] = useState(new Date(2024, 11, 25));
  const [returnDate, setReturnDate] = useState(new Date(2024, 11, 30));
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2024, 8, 1));
  const [datePickerType, setDatePickerType] = useState("depart");
  const [showResults, setShowResults] = useState(false);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [isPassengerSelectorOpen, setIsPassengerSelectorOpen] = useState(false);
  const handleClosePassengerSelector = () => {
    setIsPassengerSelectorOpen(false);
  };

  const bgColor = "gray.900";
  const textColor = "white";

  const cities = [
    "New York",
    "London",
    "Hanoi",
    "Singapore",
    "Tokyo",
    "Los Angeles",
    "Dubai",
    "Paris",
    "Sydney",
    "Frankfurt",
    "Mumbai",
    "Chicago",
  ];

  const CitySelector = ({ isFrom }) => (
    <Menu>
      <MenuButton as={Text} cursor="pointer" fontWeight="bold">
        {isFrom ? fromCity : toCity}
      </MenuButton>
      <MenuList bg="gray.800" borderColor="gray.700">
        {cities.map((city) => (
          <MenuItem
            key={city}
            onClick={() => (isFrom ? setFromCity(city) : setToCity(city))}
            bg="gray.800"
            _hover={{ bg: "gray.700" }}
          >
            {city}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );

  const openDatePicker = (type) => {
    setDatePickerType(type);
    setIsDatePickerOpen(true);
  };

  const handleDateSelect = (date) => {
    if (datePickerType === "depart") {
      setDepartDate(date);
    } else {
      setReturnDate(date);
    }
    setIsDatePickerOpen(false);
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<Box key={`empty-${i}`} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      days.push(
        <Button
          key={i}
          onClick={() => handleDateSelect(date)}
          variant="ghost"
          size="sm"
          bg={i === 6 ? "blue.500" : "transparent"}
          color={i === 6 ? "white" : "inherit"}
          _hover={{ bg: "blue.500", color: "white" }}
          w="100%"
          h="40px"
        >
          {i}
        </Button>
      );
    }

    return days;
  };

  const handlePassengersChange = (newPassengers) => {
    setPassengers(newPassengers);
  };

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleBack = () => {
    setShowResults(false);
  };

  if (showResults) {
    return (
      <FlightSearchResults
        fromCity={fromCity}
        toCity={toCity}
        departDate={departDate.toLocaleDateString()}
        returnDate={returnDate.toLocaleDateString()}
        passengers={passengers}
        onBack={handleBack}
      />
    );
  }

  return (
    <Box bg={bgColor} p={4} color={textColor}>
      <VStack spacing={6} align="stretch">
        <Flex justify="space-between" align="center">
          <IconButton
            icon={<HamburgerIcon />}
            variant="ghost"
            color={textColor}
            aria-label="Menu"
          />
        </Flex>

        <Flex justify="space-between" align="center" width="100%">
          <CitySelector isFrom={true} />
          <Text fontSize="lg" fontWeight="bold">
            to
          </Text>
          <CitySelector isFrom={false} />
        </Flex>

        <Flex justify="space-between" align="center">
          <Menu w="100%">
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg="gray.700"
              color="white"
              _hover={{ bg: "gray.600" }}
              _active={{ bg: "gray.600" }}
              width="100%"
              textAlign="left"
              borderRadius="md"
              px={4}
              py={2}
            >
              Round Trip
            </MenuButton>
            <MenuList bg="gray.800" borderColor="gray.600">
              <MenuItem bg="gray.700" _hover={{ bg: "gray.500" }}>
                One Way
              </MenuItem>
              <MenuItem bg="gray.700" _hover={{ bg: "gray.500" }}>
                Multi-City
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <HStack
          bg="gray.800"
          borderRadius="full"
          p={2}
          spacing={4}
          justify="space-between"
          onClick={() => openDatePicker("depart")}
        >
          <HStack>
            <CalendarIcon color="blue.500" />
            <VStack align="flex-start" spacing={0}>
              <Text fontSize="xs" color="gray.400">
                Depart
              </Text>
              <Text fontWeight="bold">
                {departDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            </VStack>
          </HStack>
          <VStack
            align="flex-end"
            spacing={0}
            onClick={(e) => {
              e.stopPropagation();
              openDatePicker("return");
            }}
          >
            <Text fontSize="xs" color="gray.400">
              Return
            </Text>
            <Text fontWeight="bold">
              {returnDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </VStack>
        </HStack>

        <Button
          onClick={() => setIsPassengerSelectorOpen(true)}
          colorScheme="blue"
          variant="outline"
        >
          {passengers.adults +
            passengers.children +
            passengers.infants +
            passengers.pets}{" "}
          Passenger(s)
        </Button>

        <Button colorScheme="blue" borderRadius="full" onClick={handleSearch}>
          Search
        </Button>
      </VStack>

      <Modal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          bg="gray.800"
          color="white"
          borderRadius="md"
          width="auto"
        >
          <ModalHeader borderBottomWidth="1px" borderColor="gray.700">
            Select {datePickerType === "depart" ? "Departure" : "Return"} Date
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <VStack spacing={6}>
              <Flex justify="space-between" align="center" w="100%">
                <IconButton
                  icon={<ChevronLeftIcon />}
                  onClick={() =>
                    setCurrentDate(
                      new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth() - 1,
                        1
                      )
                    )
                  }
                  variant="ghost"
                  borderRadius="full"
                />
                <Text fontSize="lg" fontWeight="bold">
                  {currentDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
                <IconButton
                  icon={<ChevronRightIcon />}
                  onClick={() =>
                    setCurrentDate(
                      new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth() + 1,
                        1
                      )
                    )
                  }
                  variant="ghost"
                  borderRadius="full"
                />
              </Flex>
              <SimpleGrid columns={7} spacing={1} w="100%">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <Text key={day} textAlign="center" fontSize="sm" mb={2}>
                      {day}
                    </Text>
                  )
                )}
                {renderCalendar()}
              </SimpleGrid>
              <Button
                onClick={() => setIsDatePickerOpen(false)}
                w="100%"
                colorScheme="blue"
              >
                Confirm
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isPassengerSelectorOpen}
        onClose={handleClosePassengerSelector}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Passengers</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PassengerSelector
              onPassengersChange={handlePassengersChange}
              onClose={handleClosePassengerSelector}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Header;
