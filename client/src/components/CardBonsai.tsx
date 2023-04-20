import { Link } from "react-router-dom";
import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

interface CardBonsaiProps {
  id: number;
  name: string;
  photo?: string;
  updatedAt: Date;
  nextRepotting: Date;
  deligaturing: Date;
}
export default function CardBonsai({
  id,
  name,
  photo,
  updatedAt,
  nextRepotting,
  deligaturing,
}: CardBonsaiProps) {
  return (
    <Card
      maxW={{ base: "100%", sm: "100%", md: "sm" }}
      width={{ base: "100%", sm: "100%", md: "sm" }}
      minH={{ base: "100%", sm: "100%", md: "lg" }}
      height={{ base: "100%", sm: "100%", md: "lg" }}
      direction={{ base: "row", sm: "row", md: "column" }}
      overflow="hidden"
      variant="outline"
      boxShadow={"md"}
      _hover={{ boxShadow: "xl" }}
    >
      <VStack flex={1}>
        <Image
          objectFit="contain"
          maxW={{ base: "200px", sm: "200px", md: "100%" }}
          src={photo ? photo : "/src/assets/images/bonsai-default.jpg"}
          alt={name}
        />
        <Heading textAlign={"center"} size="md" mb={"1rem"}>
          {name}
        </Heading>
      </VStack>

      <Stack flex={2}>
        <CardBody>
          {updatedAt && (
            <Text>{`Dérnier entretien: ${new Date(updatedAt).toLocaleDateString(
              "fr-fr"
            )}`}</Text>
          )}
          {nextRepotting && (
            <Text>{`Prochain rempotage: ${new Date(
              nextRepotting
            ).toLocaleDateString("fr-fr")}`}</Text>
          )}
          {deligaturing && (
            <Text>{`Pense à enlever la ligature le: ${new Date(
              deligaturing
            ).toLocaleDateString("fr-fr")} 😉`}</Text>
          )}
        </CardBody>

        <CardFooter
          display={"flex"}
          justifyContent={"center"}
          px={{ base: 0, md: "1rem" }}
        >
          <Button
            width={{ base: "170px", sm: "170px", md: "100%" }}
            variant="solid"
            colorScheme="blue"
            as={Link}
            to={`/edit-bonsai/${id}`}
          >
            Voir la fiche
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}
