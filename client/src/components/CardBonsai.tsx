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
  Flex,
} from "@chakra-ui/react";
import DisplayPourcentTime from "./DisplayPourcentTime";

interface CardBonsaiProps {
  id: number;
  name: string;
  photo?: string;
  updatedAt: Date;
  repotting: Date;
  nextRepotting: Date;
  ligaturing: Date;
  deligaturing: Date;
}
export default function CardBonsai({
  id,
  name,
  photo,
  updatedAt,
  repotting,
  nextRepotting,
  ligaturing,
  deligaturing,
}: CardBonsaiProps) {
  return (
    <Card
      maxW={{ base: "100%", sm: "100%", md: "sm" }}
      width={{ base: "100%", sm: "100%", md: "sm" }}
      minH={{ base: "100%", sm: "100%", md: "xl" }}
      height={{ base: "100%", sm: "100%", md: "100%" }}
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
            <Text>
              {`Dérnier entretien: ${new Date(updatedAt).toLocaleDateString(
                "fr-fr"
              )}`}
            </Text>
          )}
          <Flex
            flexDir={{ base: "row", md: "column" }}
            justifyContent={"space-evenly"}
          >
            {nextRepotting && (
              <Flex justifyContent={"space-around"} alignItems={"center"}>
                <DisplayPourcentTime
                  image="/src/assets/images/repotting.png"
                  startDate={repotting}
                  endDate={nextRepotting}
                  title="Rempotage"
                />

                <Text display={{ base: "none", md: "block" }}>
                  {new Date(nextRepotting).toLocaleDateString("fr-fr")}
                </Text>
              </Flex>
            )}
            {deligaturing && (
              <Flex justifyContent={"space-around"} alignItems={"center"}>
                <DisplayPourcentTime
                  image="/src/assets/images/ligaturing.png"
                  startDate={ligaturing}
                  endDate={deligaturing}
                  title="Déligaturage"
                />

                <Text display={{ base: "none", md: "block" }}>
                  {new Date(deligaturing).toLocaleDateString("fr-fr")}
                </Text>
              </Flex>
            )}
          </Flex>
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
