import { Link, Outlet } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Flex, Box, VStack } from "@chakra-ui/react";
import { Cart } from "../components/cart";
import { GET_MENUS, Menu, MenuSection } from "../graphql/queries";
import CartContextProvider from "../contexts/cartContextProvider";

export default function Root() {
  const { loading, error, data } = useQuery(GET_MENUS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Box w={1500}>
      <CartContextProvider>
        <Flex color="white" flexGrow={1}>
          <Box p="5" w="300px" bg="green.500">
            <nav>
              {data.menus.map((menu: Menu) => (
                <VStack key={menu.identifier}>
                  {menu.sections.map((section: MenuSection) => {
                    return (
                      <Box key={section.identifier}>
                        <Link to={`/sections/${section.identifier}`}>
                          {menu.label} / {section.label}
                        </Link>
                      </Box>
                    );
                  })}
                </VStack>
              ))}
              <Box>
                <Cart />
              </Box>
            </nav>
          </Box>
          <Box flex="1" p="10">
            <Outlet />
          </Box>
        </Flex>
      </CartContextProvider>
    </Box>
  );
}
