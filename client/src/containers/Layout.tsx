import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import NavBar from "../components/NavBar";
// import NavBar from "../components/NavBar";

function Layout({ children }: PropsWithChildren) {
  return (
    <Box minH="100vh">
      <NavBar />
      {children}
    </Box>
  );
}

export default Layout;
