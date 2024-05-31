import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import ItemCard from "../components/itemCard";
import { GET_SECTION, Item } from "../graphql/queries";

export default function Section() {
  const { sectionId } = useParams();
  const { loading, error, data } = useQuery(GET_SECTION, {
    variables: { sectionId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Box
      id="section"
      opacity={data.section.available ? 1 : 0.5}
      pointerEvents={data.section.available ? "auto" : "none"}
    >
      <Text>{data.section.label}</Text>
      <Text>{data.section.available ? "Available" : "Not available"}</Text>
      <SimpleGrid minChildWidth="300px" spacing="40px">
        {data.section.items.map((item: Item) => (
          <ItemCard key={item.identifier} item={item} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
