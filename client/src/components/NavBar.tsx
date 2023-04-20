import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link as LinkChakra,
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
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  useGetCurrentUserQuery,
  useLogoutMutation,
} from "../gql/generated/schema";

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading, error, client, refetch } = useGetCurrentUserQuery({
    errorPolicy: "ignore",
  });
  const [logout] = useLogoutMutation();
  const { email, id } = data?.getCurrentUser || {};
  const colorModel = useColorModeValue("gray.100", "gray.900");

  useEffect(() => {
    refetch();
  }, [email]);

  if (error) return <div>Error</div>;

  return (
    <>
      <Box bg={colorModel} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link to="/">Logo</Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {data && <Link to={"/create-bonsai"}>Créer un bonsai</Link>}
            </HStack>
          </HStack>
          {loading ? (
            <div>Loading</div>
          ) : (
            email && (
              <HStack>
                <Heading as={"h2"} fontSize="1.2rem">
                  Bienvenu {email}
                </Heading>
              </HStack>
            )
          )}

          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                {data && (
                  <>
                    <MenuItem>
                      <Link to={`/show-bonsais-list/${id}`}>Mes bonsais</Link>
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
                        window.localStorage.removeItem("IsLoged");
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
