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
  Collapse,
  ScaleFade,
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
import { EditIcon } from "@chakra-ui/icons";
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

type activateType = {
  photo: boolean;
  name: boolean;
  specie: boolean;
  age: boolean;
  repotting: boolean;
  nextRepotting: boolean;
  ligaturing: boolean;
  deligaturing: boolean;
};

export default function EditeBonsai() {
  const [activate, setActivate] = useState<activateType>({
    photo: false,
    name: false,
    specie: false,
    age: false,
    repotting: false,
    nextRepotting: false,
    ligaturing: false,
    deligaturing: false,
  });
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
        <Flex flexDir={"column"} justifyContent={"center"}>
          <Box>
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
            <EditIcon
              onClick={() =>
                setActivate({ ...activate, photo: !activate.photo })
              }
            />
          </Box>

          <Collapse in={activate.photo} animate>
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
          </Collapse>
        </Flex>

        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent={"space-around"}
          alignItems="baseline"
          width={{ base: "100%", md: "60%" }}
          mx={"auto"}
          p={4}
        >
          <Flex flexDir={"column"}>
            <Flex alignItems={"center"}>
              {editeBonsai.name ?? "Pas de nom renseigné"}
              <EditIcon
                ms={2}
                onClick={() =>
                  setActivate({ ...activate, name: !activate.name })
                }
              />
            </Flex>
            <Collapse in={activate.name} animate>
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
            </Collapse>
          </Flex>

          <Flex flexDir={"column"} mt={3}>
            <Flex alignItems={"center"}>
              {editeBonsai.age !== 0 &&
              !Number.isNaN(editeBonsai.age) &&
              editeBonsai.age !== null
                ? editeBonsai.age
                : "Pas d'âge renseigné"}
              <EditIcon
                ms={2}
                onClick={() => setActivate({ ...activate, age: !activate.age })}
              />
            </Flex>
            <Collapse in={activate.age} animate>
              <FormControl as="fieldset" mb={6}>
                <FormLabel as="legend" htmlFor={"age"}>
                  Age du bonsaï
                </FormLabel>
                <Input
                  type={"number"}
                  name="age"
                  variant="outline"
                  value={editeBonsai.age ?? 0}
                  onChange={(e) =>
                    setEditeBonsai({
                      ...editeBonsai,
                      age: parseInt(e.target.value, 10),
                    })
                  }
                />
                <FormHelperText>Texte d'aide de test</FormHelperText>
              </FormControl>
            </Collapse>
          </Flex>

          <Flex flexDir={"column"} mt={3}>
            <Flex alignItems={"center"}>
              {editeBonsai.specieId
                ? species.species.filter(
                    (specie) => specie.id === editeBonsai.specieId
                  )[0].name
                : "Pas d'espèce renseigné"}
              <EditIcon
                ms={2}
                onClick={() =>
                  setActivate({ ...activate, specie: !activate.specie })
                }
              />
            </Flex>
            <Collapse in={activate.specie} animate>
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
                <FormHelperText>Texte d'aide de test</FormHelperText>
              </FormControl>
            </Collapse>
          </Flex>

          <Flex flexDir={"column"} mt={3}>
            <Flex alignItems={"center"}>
              {editeBonsai.repotting ?? "Pas de date renseigné"}
              <EditIcon
                ms={2}
                onClick={() =>
                  setActivate({ ...activate, repotting: !activate.repotting })
                }
              />
            </Flex>
            <Collapse
              in={activate.repotting}
              animate
              style={{ overflow: "unset" }}
            >
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
            </Collapse>
          </Flex>

          <Flex flexDir={"column"} mt={3}>
            <Flex alignItems={"center"}>
              <Image
                src="/src/assets/images/ligaturing.png"
                alt="Ligaturnig"
                w={"60px"}
                me={2}
              />
              {editeBonsai.ligaturing ?? "Pas de date renseigné"}
              <EditIcon
                ms={2}
                onClick={() =>
                  setActivate({ ...activate, ligaturing: !activate.ligaturing })
                }
              />
            </Flex>
            <Collapse
              in={activate.ligaturing}
              animate
              style={{ overflow: "unset" }}
            >
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
            </Collapse>
          </Flex>

          <Button
            colorScheme="blue"
            onClick={save}
            isLoading={loading}
            width={{ base: "100%", md: "100px" }}
            mt={4}
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
