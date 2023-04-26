import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

// Cela permet de récupérer les variables d'environnement définies dans le fichier app.config.js
const env = Constants.expoConfig?.extra || {};

console.log({ env });

// On crée un lien HTTP qui va permettre de faire les requêtes vers le serveur
const httpLink = createHttpLink({
  uri: env?.REACT_APP_GRAPHQL_API_URL || "http://localhost:4000",
  credentials: "include",
});

/* On crée un lien qui va ajouter le token d'authentification dans les headers de chaque requête,
vu que les cookies ne sont pas gérés par les applications mobiles */
const authLink = setContext(async (_, { headers }) => {
  // On récupère le token depuis le stockage sécurisé
  const token = await SecureStore.getItemAsync("token");

  // On retourne les headers avec le token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${JSON.parse(token)}` : "",
    },
  };
});

// On crée le client Apollo
const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
  link: authLink.concat(httpLink),
});

export default client;
