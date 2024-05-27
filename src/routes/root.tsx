import { Outlet } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Card, Text, CardBody } from "@chakra-ui/react";
type Location = {
  id: string;
  name: string;
  description: string;
  photo: string;
};
const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;
export default function Root() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
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
            <li>
              <a href={`/contacts/1`}>Your Name</a>
            </li>
            <li>
              <a href={`/contacts/2`}>Your Friend</a>
            </li>
          </ul>
          <ul>
            {data.locations.map((location: Location) => (
              <li key={location.id}>
                <a href={`/menus/${location.id}`}>{location.name}</a>
              </li>
            ))}
          </ul>
          <Card>
            <CardBody>
              <Text>
                View a summary of all your customers over the last month.
              </Text>
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
