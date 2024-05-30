import { Link, Outlet } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Flex, Box, VStack } from "@chakra-ui/react";
import { Cart, CartContext } from "../components/cart";
import { useCartState } from "../hooks/useCartState";
type Menu = {
  identifier: string;
  name: string;
  label: string;
  photo: string;
  sections: Section[];
};
const GET_MENUS = gql`
  query GetMenus {
    menus {
      identifier
      label
      state
      sections {
        label
        identifier
      }
    }
  }
`;

type Section = {
  label: string;
  identifier: string;
};

export default function Root() {
  const { loading, error, data } = useQuery(GET_MENUS);
  const { cart, updateCart } = useCartState();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Box w={1500}>
      <CartContext.Provider value={{ items: cart, addItems: updateCart }}>
        <Flex color="white" flexGrow={1}>
          <Box p="5" w="300px" bg="green.500">
            <nav>
              {data.menus.map((menu: Menu) => (
                <VStack key={menu.identifier}>
                  {menu.sections.map((section: Section) => {
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
                <Cart items={cart} />
              </Box>
            </nav>
          </Box>
          <Box flex="1" p="10">
            <Outlet />
          </Box>
        </Flex>
      </CartContext.Provider>
    </Box>
  );
}
