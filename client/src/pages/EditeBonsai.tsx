import {
  Center,
  Heading,
  Flex,
  Image,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import Loader from "../components/Loader";
import Layout from "../containers/Layout";
import {
  GetBonsaiByIdDocument,
  GetBonsaiByIdQuery,
  UpdateBonsaiInput,
  useUpdateBonsaiMutation,
} from "../gql/generated/schema";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import client from "../gql/client";
const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function EditeBonsai() {
  const { id } = useParams() as { id: string };
  const [editeBonsai, setEditeBonsai] = useState<UpdateBonsaiInput>();
  const [errors, setErrors] = useState<boolean>(false);

  const [repottingDate, setRepottingDate] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);
  const [ligaturingDate, setLigaturingDate] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);
  console.log(editeBonsai?.repotting);

  useEffect(() => {
    if (id)
      client
        .query<GetBonsaiByIdQuery>({
          query: GetBonsaiByIdDocument,
          variables: { bonsaiId: parseInt(id, 10) },
        })
        .then(({ data }) => {
          if (data) {
            setEditeBonsai(data.getBonsaiById);
            setRepottingDate([
              data.getBonsaiById.repotting &&
                new Date(data.getBonsaiById.repotting),
              data.getBonsaiById.nextRepotting &&
                new Date(data.getBonsaiById.nextRepotting),
            ]);
            setLigaturingDate([
              data.getBonsaiById.ligaturing &&
                new Date(data.getBonsaiById.ligaturing),
              data.getBonsaiById.deligaturing &&
                new Date(data.getBonsaiById.deligaturing),
            ]);
          }
        })
        .catch(() => setErrors(true));
  }, [id]);

  const [updateBonsai, { loading }] = useUpdateBonsaiMutation();

  if (errors) {
    return (
      <Layout>
        <Center h="600px">
          <Heading
            fontSize={{ base: "4xl", md: "xxx-large" }}
            textAlign={"center"}
          >
            Oups il semblerait que ce bonsai n'existe pas 😥!
          </Heading>
        </Center>
      </Layout>
    );
  }
  if (!editeBonsai || !id) return <Loader />;

  const save = () => {
    const newBonsai = updateBonsai({
      variables: {
        bonsaiId: parseInt(id, 10),
        data: {
          name: editeBonsai.name,
          species: editeBonsai.species,
          age: editeBonsai.age,
          photo: editeBonsai.photo,
          repotting: repottingDate[0],
          nextRepotting: repottingDate[1],
          ligaturing: ligaturingDate[0],
          deligaturing: ligaturingDate[1],
        },
      },
      refetchQueries: [
        {
          query: GetBonsaiByIdDocument,
          variables: { bonsaiId: parseInt(id, 10) },
        },
      ],
    });
    console.log(newBonsai);
  };

  return (
    <Layout>
      <Center h="100px">
        <Heading fontSize={"xxx-large"}>{editeBonsai.name}</Heading>
      </Center>
      <Flex
        flexDir={"column"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"space-around"}
        gap={4}
        mb={4}
      >
        <Image
          borderRadius="full"
          boxSize="200px"
          src={
            editeBonsai.photo
              ? editeBonsai.photo
              : "/src/assets/images/bonsai-default.jpg"
          }
          alt={editeBonsai.name}
        />

        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent={"space-around"}
          alignItems="baseline"
          width={{ base: "100%", md: "60%" }}
          mx={"auto"}
          p={4}
        >
          <FormControl as="fieldset" mb={6}>
            <FormLabel as="legend" htmlFor={"name"}>
              Nom du bonsaï
            </FormLabel>
            <Input
              type={"text"}
              name="name"
              variant="outline"
              placeholder="Nom"
              value={editeBonsai.name}
              onChange={(e) =>
                setEditeBonsai({ ...editeBonsai, name: e.target.value })
              }
            />
            <FormHelperText>Texte d'aide de test</FormHelperText>
          </FormControl>
          <FormControl as="fieldset" mb={6}>
            <FormLabel as="legend" htmlFor={"species"}>
              Espèce du bonsaï
            </FormLabel>
            <Input
              type={"text"}
              name="species"
              variant="outline"
              placeholder="Espèce"
              value={editeBonsai.species}
              onChange={(e) =>
                setEditeBonsai({ ...editeBonsai, species: e.target.value })
              }
            />
            <FormHelperText>Texte d'aide de test</FormHelperText>
          </FormControl>
          <FormControl as="fieldset" mb={6}>
            <FormLabel as="legend" htmlFor={"age"}>
              Age du bonsaï
            </FormLabel>
            <Input
              type={"number"}
              name="age"
              variant="outline"
              value={editeBonsai.age ? editeBonsai.age?.toString() : 0}
              onChange={(e) =>
                setEditeBonsai({
                  ...editeBonsai,
                  age: parseInt(e.target.value, 10),
                })
              }
            />
            <FormHelperText>Texte d'aide de test</FormHelperText>
          </FormControl>
          <FormControl as="fieldset" mb={6}>
            <FormLabel as="legend" htmlFor={"species"}>
              Photo du bonsaï
            </FormLabel>
            <Input
              name="photo"
              variant="outline"
              value={editeBonsai.photo?.toString()}
              onChange={(e) =>
                setEditeBonsai({ ...editeBonsai, photo: e.target.value })
              }
            />
            <FormHelperText>Texte d'aide de test</FormHelperText>
          </FormControl>
          <FormControl as="fieldset" mb={6}>
            <FormLabel as="legend" htmlFor={"species"}>
              Date du rempotage
            </FormLabel>
            <RangeDatepicker
              selectedDates={repottingDate}
              onDateChange={setRepottingDate}
              configs={{
                dateFormat: "dd-MM-yyyy",
                monthNames: MONTHS,
                dayNames: DAYS,
              }}
            />
            <FormHelperText>
              Date du rempotage et date du prochain rempotage
            </FormHelperText>
          </FormControl>
          <FormControl as="fieldset" mb={6}>
            <FormLabel as="legend" htmlFor={"species"}>
              Date de ligaturage
            </FormLabel>
            <RangeDatepicker
              selectedDates={ligaturingDate}
              onDateChange={setLigaturingDate}
              configs={{
                dateFormat: "dd-MM-yyyy",
                monthNames: MONTHS,
                dayNames: DAYS,
              }}
            />
            <FormHelperText>
              Date du ligaturage et date du prochain ligaturage
            </FormHelperText>
          </FormControl>
          <Button
            colorScheme="blue"
            onClick={save}
            isLoading={loading}
            width={{ base: "100%", md: "100px" }}
            mx={"auto"}
            p={4}
          >
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </Layout>
  );
}
