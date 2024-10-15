import React, { useState } from "react";
import PassengerSelector from "./PassengerSelector";
import FlightSearchResults from "./FlightSearchResults";

const FlightSearchContainer = () => {
  const [passengers, setPassengers] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [showResults, setShowResults] = useState(false);
  const [searchParams, setSearchParams] = useState({
    fromCity: "",
    toCity: "",
    departDate: "",
    returnDate: "",
  });

  const handlePassengersChange = (newPassengers) => {
    setPassengers(newPassengers);
  };

  const handleSearch = (params) => {
    setSearchParams(params);
    setShowResults(true);
  };

  const handleBack = () => {
    setShowResults(false);
  };

  return (
    <div>
      {!showResults ? (
        <>
          <PassengerSelector onPassengersChange={handlePassengersChange} />
          {/* Add your search form components here */}
          <button
            onClick={() =>
              handleSearch({
                fromCity: "Hanoi",
                toCity: "Singapore",
                departDate: "2023-06-01",
                returnDate: "2023-06-07",
              })
            }
          >
            Search Flights
          </button>
        </>
      ) : (
        <FlightSearchResults
          fromCity={searchParams.fromCity}
          toCity={searchParams.toCity}
          departDate={searchParams.departDate}
          returnDate={searchParams.returnDate}
          passengers={passengers}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default FlightSearchContainer;
