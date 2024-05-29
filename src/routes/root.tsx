import { Link, Outlet } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Flex, Center, Box } from "@chakra-ui/react";
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Box w={1080}>
      <Flex color="white" flexGrow={1}>
        <Center w="300px" bg="green.500">
          <nav>
            <ul>
              {data.menus.map((menu: Menu) => (
                <>
                  {menu.sections.map((section: Section) => {
                    return (
                      <li key={section.identifier}>
                        <Link to={`/sections/${section.identifier}`}>
                          {menu.label} / {section.label}
                        </Link>
                      </li>
                    );
                  })}
                </>
              ))}
            </ul>
          </nav>
        </Center>
        <Box flex="1" bg="tomato">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
}
