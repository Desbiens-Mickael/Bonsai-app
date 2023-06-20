import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box background={"#000"} h={"100vh"}>
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        h={"100%"}
      >
        <Image
          src="./src/assets/images/404.jpg"
          alt="404 Not Found"
          maxW={"100%"}
        />
        <Heading
          color={"#fff"}
          textAlign={"center"}
          fontSize={{ base: "4xl", md: "xxx-large" }}
        >
          Désolé, cette page n'existe pas !
        </Heading>
        <Button
          colorScheme="red"
          variant="link"
          mt={"2rem"}
          fontSize={"2rem"}
          leftIcon={<ArrowBackIcon fontSize={"2rem"} />}
          as={Link}
          to={"/"}
        >
          Retour à l'accueil
        </Button>
      </Flex>
    </Box>
  );
};

export default NotFound;
