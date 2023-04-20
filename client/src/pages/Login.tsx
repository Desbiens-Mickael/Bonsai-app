import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../gql/generated/schema";
import Layout from "../containers/Layout";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Box,
  Heading,
} from "@chakra-ui/react";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [login, { loading, error, client }] = useLoginMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const user = await login({
        variables: { data: { email, password } },
      });
      window.localStorage.setItem("IsLoged", "true");
      navigate("/");
    } catch (err) {
      setErrors({ err });
      console.error("error", err);
    } finally {
      setEmail("");
      setPassword("");
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
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
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
        <Heading as={"p"} fontSize={".8rem"} fontWeight={"normal"}>
          Pas encore de compte?{" "}
          <Link to={"/register"} color={"blue"}>
            Inscription
          </Link>
        </Heading>
      </Box>
    </Layout>
  );
};

export default Login;
