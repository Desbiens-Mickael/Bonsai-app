import { Box, Spinner } from "@chakra-ui/react";
import Layout from "../containers/Layout";

export default function Loader() {
  return (
    <Layout>
      <Box
        h={"600px"}
        w={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    </Layout>
  );
}
