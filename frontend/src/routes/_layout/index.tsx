import { Box, Container, Text } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import Header from "../../components/Common/Header";
import ExploreCard from "../../components/Common/ExploreCard";
import BottomNav from "../../components/Common/BottomNav";
import PassengerSelector from "../../components/Common/PassengerSelector";

import useAuth from "../../hooks/useAuth";

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});

function Dashboard() {
  const { user: currentUser } = useAuth();

  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontSize="2xl">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text>Welcome back, nice to see you again!</Text>
        </Box>
        <Header />
      </Container>
    </>
  );
}
