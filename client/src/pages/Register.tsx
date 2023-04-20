import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Box,
} from "@chakra-ui/react";
import Layout from "../containers/Layout";
import { useCreateUserMutation } from "../gql/generated/schema";

function Register() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [CreateUser, { loading, error, client }] = useCreateUserMutation({
    errorPolicy: "ignore",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const user = await CreateUser({
        variables: { data: { firstname, email, password } },
      });
      console.log("user", user);
      navigate("/");
    } catch (err) {
      setErrors({ err });
      console.error("error", err);
    } finally {
      setEmail("");
      setPassword("");
      setFirstname("");
      client.resetStore();
    }
  };

  return (
    <Layout>
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
            onChange={({ target }) => setFirstname(target.value)}
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
            onChange={({ target }) => setEmail(target.value)}
          />
          <FormHelperText>
            Nous ne partagerons jamais votre adresse email.
          </FormHelperText>
          <FormErrorMessage>Ce champ est obligatoire</FormErrorMessage>
        </FormControl>

        <FormControl id="password" isRequired>
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
        </FormControl>
        <Button type="submit">Valider</Button>
      </Box>
    </Layout>
  );
}

export default Register;
