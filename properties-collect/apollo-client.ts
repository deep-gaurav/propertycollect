import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://properties.sodeep.me/api/",
    cache: new InMemoryCache(),
});

export default client;