import { Heading } from "@chakra-ui/react";
import Layout from "../containers/Layout";

const Home = () => {
  return (
    <Layout>
      <Heading
        as={"h1"}
        textAlign="center"
        mt="5rem"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        Bienvenue sur le site de test
      </Heading>
    </Layout>
  );
};

export default Home;
