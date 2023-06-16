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
  Select,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import Loader from "../components/Loader";
import Layout from "../containers/Layout";
import {
  GetBonsaiByIdDocument,
  GetBonsaiByIdQuery,
  Specie,
  UpdateBonsaiInput,
  useUpdateBonsaiMutation,
  useGetSpeciesQuery,
} from "../gql/generated/schema";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import client from "../gql/client";
import AutocompleteMultiple from "../components/AutocompleteMultiple";
import { set } from "date-fns";
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

  useEffect(() => {
    if (id)
      client
        .query<GetBonsaiByIdQuery>({
          query: GetBonsaiByIdDocument,
          variables: { bonsaiId: parseInt(id, 10) },
        })
        .then(({ data }) => {
          if (data && data.getBonsaiById && data.getBonsaiById.specie) {
            setEditeBonsai({
              ...data.getBonsaiById,
              specieId: data.getBonsaiById.specie.id,
            });
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

    return () => {
      setEditeBonsai(undefined);
    };
  }, []);

  const [updateBonsai, { loading }] = useUpdateBonsaiMutation();
  const { data: species } = useGetSpeciesQuery();

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
  if (!editeBonsai || !id || !species) return <Loader />;

  const save = () => {
    updateBonsai({
      variables: {
        updateBonsaiId: parseInt(id, 10),
        data: {
          name: editeBonsai.name,
          specieId: editeBonsai.specieId,
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
            <AutocompleteMultiple
              // multiple
              defaultValue={
                species?.species
                  .filter((specie) => specie.id === editeBonsai.specieId)
                  .map((specie) => specie.name)[0]
              }
              suggestions={species?.species}
              value={(selectedSpecie) => {
                if (selectedSpecie) {
                  setEditeBonsai({
                    ...editeBonsai,
                    specieId: selectedSpecie as number,
                  });
                }
              }}
            />
            {/* <Select
              defaultValue={editeBonsai.specieId}
              onChange={(e) =>
                setEditeBonsai({
                  ...editeBonsai,
                  specieId: parseInt(e.target.value, 10),
                })
              }
            >
              {species?.species.map((specie) => (
                <option key={specie.id} value={specie.id}>
                  {specie.name}
                </option>
              ))}
            </Select> */}
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
