import { Box, Heading, Text } from "@chakra-ui/react";

export default function Success() {
  return (
    <Box textColor="black">
      <Heading>Purchase Successful</Heading>
      <Text>Your food is on its way!</Text>
    </Box>
  );
}
