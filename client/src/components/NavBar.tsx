import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  useGetCurrentUserQuery,
  useLogoutMutation,
} from "../gql/generated/schema";

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, client } = useGetCurrentUserQuery({
    errorPolicy: "ignore",
  });
  const [logout] = useLogoutMutation();
  const { id } = data?.getCurrentUser || {};
  const colorModel = useColorModeValue("gray.100", "gray.900");

  if (error) return <div>Error</div>;

  return (
    <>
      <Box bg={colorModel} px={4}>
        <Flex
          h={"100px"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link to="/">
                <Image src="/src/assets/images/logo.png" maxW={"100px"} />
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {data && <Link to={"/create-bonsai"}>Créer un bonsai</Link>}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={"/src/assets/images/avatar.png"} />
              </MenuButton>
              <MenuList>
                {data && (
                  <>
                    <MenuItem>
                      <Link to={"/show-bonsais-list"}>Mes bonsais</Link>
                    </MenuItem>

                    <MenuItem>
                      <Link to={`/profile/${id}`}>Profile</Link>
                    </MenuItem>

                    <MenuItem>
                      <Link to="#">Paramètre</Link>
                    </MenuItem>
                  </>
                )}
                <MenuDivider />
                {data ? (
                  <MenuItem>
                    <Link
                      to="#"
                      onClick={async () => {
                        await logout();
                        client.resetStore();
                      }}
                    >
                      Déconnexion
                    </Link>
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Link to="/auth">Connexion</Link>
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link to={"/create-bonsai"}>Créer un bonsai</Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
