import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import Layout from "../containers/Layout";
import {
  useCreateBonsaiMutation,
  useGetSpeciesQuery,
} from "../gql/generated/schema";
import AutocompleteMultiple from "../components/AutocompleteMultiple";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const CreateBonsai = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [specie, setSpecie] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [photo, setPhoto] = useState<string>("");
  const [CreateBonsai, { loading: createLoading, error, client }] =
    useCreateBonsaiMutation();

  const { data: dataSpecies, loading: speciesLoading } = useGetSpeciesQuery();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const bonsai = await CreateBonsai({
        variables: {
          data: {
            name,
            specieId: specie,
            age,
            photo,
          },
        },
      });
      navigate(`/edit-bonsai/${bonsai.data?.createBonsai.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setName("");
      setSpecie(0);
      setAge(0);
      setPhoto("");
    }
  };

  if (speciesLoading || !dataSpecies) return <Loader />;

  return (
    <Layout>
      <h1>Création d'un Bonsai</h1>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent={"space-around"}
        alignItems="baseline"
        width={"60%"}
        height={"60vh"}
        mx={"auto"}
      >
        <FormControl as="fieldset">
          <FormLabel as="legend" htmlFor={"name"}>
            Nom du bonsaï
          </FormLabel>
          <Input
            type={"text"}
            name="name"
            variant="outline"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormHelperText>Texte d'aide de test</FormHelperText>
        </FormControl>
        <FormControl as="fieldset" mb={6}>
          <FormLabel as="legend" htmlFor={"species"}>
            Espèce du bonsaï
          </FormLabel>
          <AutocompleteMultiple
            suggestions={dataSpecies?.species}
            value={(selectedSpecie) => {
              if (selectedSpecie) {
                setSpecie(selectedSpecie as number);
              }
            }}
          />
          <FormHelperText>Texte d'aide de test</FormHelperText>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend" htmlFor={"age"}>
            Age du bonsaï
          </FormLabel>
          <Input
            type={"number"}
            name="age"
            variant="outline"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value, 10))}
          />
          <FormHelperText>Texte d'aide de test</FormHelperText>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend" htmlFor={"species"}>
            Photo du bonsaï
          </FormLabel>
          <Input
            name="photo"
            variant="outline"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
          <FormHelperText>Texte d'aide de test</FormHelperText>
        </FormControl>
        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          isLoading={createLoading}
        >
          Créer
        </Button>
      </Box>
    </Layout>
  );
};

export default CreateBonsai;
