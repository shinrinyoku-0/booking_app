import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  IconButton,
  Divider,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useQueryClient } from "@tanstack/react-query";
import type { UserPublic } from "../../client";

const FlightDetailsModal = ({
  isOpen,
  onClose,
  flight,
  passengers,
  totalPrice,
  onBookNow,
}) => {
  if (!flight) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white">
        <ModalHeader>Flight Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={4}>
            <Text>From: {flight.origin}</Text>
            <Text>To: {flight.destination}</Text>
            <Text>Airline: {flight.airline}</Text>
            <Text>Departure: {flight.start_time}</Text>
            <Text>Arrival: {flight.end_time}</Text>
            <Text>
              Duration: {Math.floor(flight.time_duration / 60)} hour(s){" "}
              {flight.time_duration % 60} minutes
            </Text>
            <Divider />
            <Text fontWeight="bold">Passenger Details:</Text>
            <Text>Adults: {passengers.adults}</Text>
            <Text>Children: {passengers.children}</Text>
            <Text>Infants: {passengers.infants}</Text>
            <Text>Pets: {passengers.pets}</Text>
            <Divider />
            <Text fontWeight="bold" fontSize="xl">
              Total Price: ${totalPrice}
            </Text>
            <Button colorScheme="blue" onClick={onBookNow}>
              Book Now for ${totalPrice}
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const CreditCardForm = ({ totalPrice, onSubmit }) => {
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ cardHolder, cardNumber, expiryDate, cvc });
  };

  return (
    <Box bg="gray.800" color="white" p={4}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">
            Credit Card
          </Text>
          <Input
            placeholder="Card Holder"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            required
          />
          <Input
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          <HStack>
            <Input
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
            <Input
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              required
            />
          </HStack>
          <Button type="submit" colorScheme="blue" width="100%">
            Pay now ${totalPrice}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

const ConfirmationScreen = ({ onClose, email }) => {
  return (
    <Box bg="gray.800" color="white" p={4}>
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="bold">
          Confirmation
        </Text>
        <Box borderWidth={1} borderColor="green.500" p={4} borderRadius="md">
          <Text textAlign="center">
            Your payment has been processed and your ticket has been booked. The
            eTicket of your reservation will be sent to your email at {email}
          </Text>
        </Box>
        <Button onClick={onClose} colorScheme="blue">
          Close
        </Button>
      </VStack>
    </Box>
  );
};

const FlightSearchResults = ({
  fromCity,
  toCity,
  departDate,
  returnDate,
  onBack,
  passengers,
}) => {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"]);

  useEffect(() => {
    const fetchFlights = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/flights/search",
          {
            params: { origin: fromCity, destination: toCity },
          }
        );
        const flightData = Array.isArray(response.data) ? response.data : [];
        setFlights(flightData);
      } catch (error) {
        console.error(
          "Error fetching flights:",
          error.response ? error.response.data : error.message
        );
        setError(
          error.response
            ? error.response.data.detail
            : "Failed to fetch flights. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlights();
  }, [fromCity, toCity]);

  const calculatePrice = () => {
    const { adults, children, infants, pets } = passengers;
    return adults * 50 + children * 30 + infants * 20 + pets * 10;
  };

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
    onOpen();
  };

  const handleBookNow = () => {
    onClose();
    setShowCreditCardForm(true);
  };

  const handlePayment = async (paymentDetails) => {
    if (!currentUser) {
      console.error("User is not logged in");
      setBookingError("Please log in to book a ticket.");
      return;
    }

    console.log("Booking payload:", {
      customer_id: currentUser.id,
      flight_id: selectedFlight.flight_id,
      price: calculatePrice(),
    });

    console.log("Payment details:", paymentDetails);
    setBookingError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/flights/book",
        {
          customer_id: currentUser.id,
          flight_id: selectedFlight.flight_id,
          price: calculatePrice(),
        }
      );

      if (response.data.message === "Ticket booked successfully") {
        setShowCreditCardForm(false);
        setShowConfirmation(true);
      } else {
        throw new Error("Booking failed");
      }
    } catch (error) {
      console.error("Error booking ticket:", error);
      setBookingError("Failed to book the ticket. Please try again.");
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    setSelectedFlight(null);
  };

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  if (showConfirmation) {
    return (
      <ConfirmationScreen
        onClose={handleConfirmationClose}
        email={currentUser.email}
      />
    );
  }

  if (showCreditCardForm) {
    return (
      <CreditCardForm totalPrice={calculatePrice()} onSubmit={handlePayment} />
    );
  }

  return (
    <Box bg="gray.900" minHeight="100vh" color="white" p={4}>
      <VStack spacing={4} align="stretch">
        <HStack>
          <IconButton
            icon={<ChevronLeftIcon />}
            onClick={onBack}
            variant="ghost"
            color="gray.200"
            _hover={{ bg: "gray.700" }}
          />
          <Text fontWeight="bold" fontSize="lg">
            {fromCity} - {toCity}
          </Text>
        </HStack>

        <Box bg="gray.800" p={3} borderRadius="md">
          <HStack justify="space-between">
            <Text>{departDate}</Text>
            <Text>-</Text>
            <Text>{returnDate}</Text>
          </HStack>
        </Box>

        <HStack>
          <Text>⇌ Return</Text>
          <Text>Adults {passengers.adults}</Text>
          <Text>Children {passengers.children}</Text>
          <Text>Infants {passengers.infants}</Text>
          <Text>Pets {passengers.pets}</Text>
        </HStack>

        <HStack spacing={2}>
          <Button colorScheme="blue" size="sm">
            Best
          </Button>
          <Button colorScheme="blue" size="sm">
            Cheapest
          </Button>
          <Button colorScheme="blue" size="sm">
            Fastest
          </Button>
          <Button colorScheme="blue" size="sm">
            Nonstop
          </Button>
        </HStack>

        {bookingError && (
          <Text color="red.500" textAlign="center" mt={4}>
            {bookingError}
          </Text>
        )}

        {flights.map((flight) => (
          <Box
            key={flight.flight_id}
            bg="white"
            color="black"
            p={4}
            borderRadius="md"
            cursor="pointer"
            onClick={() => handleFlightSelect(flight)}
          >
            <VStack align="stretch" spacing={3}>
              <HStack justify="space-between">
                <HStack>
                  <Text fontWeight="bold">{flight.start_time.slice(0, 5)}</Text>
                  <Text>✈</Text>
                  <Text fontWeight="bold">{flight.end_time.slice(0, 5)}</Text>
                </HStack>
                <Text>direct flight</Text>
              </HStack>
              <Text fontSize="sm">
                {flight.origin} - {flight.destination}, {flight.airline}
              </Text>
              <Divider />
              <HStack justify="space-between">
                <Text fontSize="sm">
                  {Math.floor(flight.time_duration / 60)} hour(s){" "}
                  {flight.time_duration % 60} minutes
                </Text>
                <Text fontWeight="bold">${calculatePrice()}</Text>
              </HStack>
            </VStack>
          </Box>
        ))}
      </VStack>
      {selectedFlight && (
        <FlightDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          flight={selectedFlight}
          passengers={passengers}
          totalPrice={calculatePrice()}
          onBookNow={handleBookNow}
        />
      )}
    </Box>
  );
};

export default FlightSearchResults;
