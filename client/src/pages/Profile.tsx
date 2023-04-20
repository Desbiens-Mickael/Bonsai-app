import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Layout from "../containers/Layout";
import client from "../gql/client";
import {
  GetUserByIdDocument,
  GetUserByIdQuery,
  UserInput,
  useUpdateUserMutation,
} from "../gql/generated/schema";

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editUser, setEditUser] = useState<UserInput>();

  useEffect(() => {
    if (id) {
      client
        .query<GetUserByIdQuery>({
          query: GetUserByIdDocument,
          variables: { UserdId: parseInt(id, 10) },
        })
        .then(({ data }) => data && setEditUser(data.getUserById))
        .catch(console.error);
    }
  }, [id]);

  const [UpdateUser] = useUpdateUserMutation();

  if (!editUser || !id) return <Loader />;

  const { firstname, email, password, role } = editUser;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      UpdateUser({
        variables: {
          data: { firstname, email, password, role },
          updateUserId: parseInt(id, 10),
        },
        refetchQueries: [
          {
            query: GetUserByIdDocument,
            variables: { userId: parseInt(id, 10) },
          },
        ],
      });
      // client.resetStore();
      console.log("NewUser");
    } catch (err) {
      console.error("error", err);
    }
  };

  return (
    <Layout>
      <Text as={"h1"}>Profile User</Text>
      <Box
        onSubmit={handleSubmit}
        as="form"
        width="40%"
        mx="auto"
        height="400px"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
      >
        <FormControl id="firstname" isRequired>
          <FormLabel>Prénom</FormLabel>
          <Input
            type="text"
            placeholder="Prénom"
            value={firstname}
            onChange={(e) =>
              setEditUser({ ...editUser, firstname: e.target.value })
            }
          />
          {/* <FormHelperText>
            Nous ne partagerons jamais votre adresse email.
          </FormHelperText> */}
          <FormErrorMessage>Ce champ est obligatoire</FormErrorMessage>
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>addresse Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
          />
          <FormHelperText>
            Nous ne partagerons jamais votre adresse email.
          </FormHelperText>
          <FormErrorMessage>Ce champ est obligatoire</FormErrorMessage>
        </FormControl>

        {/* <FormControl id="password" isRequired>
          <FormLabel>Mot de passe</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "cacher" : "afficher"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormHelperText>
            8 caractères minimum, une majuscule, un chiffre et un caractère
            spécial
          </FormHelperText>
          <FormErrorMessage>Ce champ est obligatoire</FormErrorMessage>
        </FormControl> */}
        <Button type="submit">Valider</Button>
      </Box>
    </Layout>
  );
}

export default Profile;
