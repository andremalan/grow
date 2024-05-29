import { Link, Outlet } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Card, Text, CardBody } from "@chakra-ui/react";
type Menu = {
  identifier: string;
  name: string;
  label: string;
  photo: string;
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
        items {
          label
          identifier
          modifierGroups {
            label
            modifiers {
              priceOverride
              displayOrder
            }
          }
        }
      }
    }
  }
`;
export default function Root() {
  const { loading, error, data } = useQuery(GET_MENUS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div id="sidebar">
        <h1>Menus</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            {data.menus.map((menu: Menu) => (
              <li key={menu.identifier}>
                <Link to={`/menus/${menu.identifier}`}>{menu.label}</Link>
              </li>
            ))}
          </ul>
          <Card>
            <CardBody>
              <Text>text inside a card.</Text>
            </CardBody>
          </Card>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
