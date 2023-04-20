import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // instance de ApolloClient
  cache: new InMemoryCache(), // instance de InMemoryCache (cache) qui permet de stocker les données en mémoire
  defaultOptions: {
    // options par défaut
    query: {
      // options par défaut pour les requêtes
      fetchPolicy: "cache-first", // récupérer les données en cache avant de faire une requête
    },
  },
  link: createHttpLink({
    // instance de createHttpLink (lien) qui permet de faire des requêtes HTTP
    uri: "http://localhost:4000", // url du serveur GraphQL
    credentials: "include", // inclure les cookies dans les requêtes
  }),
});

export default client;
