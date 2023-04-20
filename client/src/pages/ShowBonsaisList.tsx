import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import CardBonsai from "../components/CardBonsai";
import Loader from "../components/Loader";
import Layout from "../containers/Layout";
import { useGetBonsaisByUserQuery } from "../gql/generated/schema";

export default function ShowBonsaisList() {
  const { id } = useParams() || 0;
  const test = id ?? "0";
  const {
    data,
    loading,
    error,
    refetch: refetchBonsai,
  } = useGetBonsaisByUserQuery({
    variables: { userId: parseInt(test) },
  });
  const bonsais = data?.getBonsaisByUser || [];

  useEffect(() => {
    refetchBonsai();
  }, [data]);

  if (loading) return <Loader />;

  if (error) return <Center h="100px">Error: {error.message}</Center>;
  if (!bonsais.length) {
    return (
      <Layout>
        <Center h="600px">
          <Heading fontSize={{ base: "4xl", md: "xxx-large" }}>
            Tu n'as pas encore de bonsai, tu peux en créer un
            <Text as={NavLink} to="/create-bonsai" color="#008dff">
              ici
            </Text>
          </Heading>
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      <>
        <Center h="100px">
          <Heading fontSize={"xxx-large"}>Bonsais</Heading>
        </Center>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          flexWrap={"wrap"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={4}
          pb={{ base: "1rem ", md: "3rem" }}
        >
          {bonsais.map((bonsai) => (
            <CardBonsai
              key={bonsai.id}
              id={bonsai.id}
              name={bonsai.name}
              photo={bonsai.photo ? bonsai.photo : ""}
              updatedAt={bonsai.updatedAt}
              nextRepotting={bonsai.nextRepotting}
              deligaturing={bonsai.deligaturing}
            />
          ))}
        </Flex>
      </>
    </Layout>
  );
}
