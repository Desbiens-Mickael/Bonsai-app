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

const CreateBonsai = () => {
  const [name, setName] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [photo, setPhoto] = useState<string>("");
  const [CreateBonsai, { loading, error, client }] = useCreateBonsaiMutation();

  const { data: dataSpecies } = useGetSpeciesQuery();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      const bonsai = CreateBonsai({
        variables: {
          data: {
            name,
            specieId: parseInt(species, 10),
            age,
            photo,
          },
        },
      });
      console.log(bonsai);
    } catch (error) {
      console.error(error);
    } finally {
      setName("");
      setSpecies("");
      setAge(0);
      setPhoto("");
    }
  };

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
          {/* <AutocompleteMultiple suggestions={test} /> */}
          <Select
            placeholder="Choisiez une espèce"
            variant="outline"
            onChange={(e) => setSpecies(e.target.value)}
          >
            {dataSpecies?.species.map((specie) => (
              <option key={specie.id} value={specie.id}>
                {specie.name}
              </option>
            ))}
          </Select>
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
        <Button colorScheme="blue" onClick={handleSubmit} isLoading={loading}>
          Button
        </Button>
      </Box>
    </Layout>
  );
};

export default CreateBonsai;
