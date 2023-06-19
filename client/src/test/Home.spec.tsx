import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { GetCurrentUserDocument } from "../gql/generated/schema";

const userProfileMock = [
  {
    request: {
      query: GetCurrentUserDocument,
    },
    result: {
      data: {
        getCurrentUser: {
          id: 1,
          firstname: "John",
          email: "john@gmail.com",
          password: "123456",
          role: "ADMIN",
          createdAt: "2021-07-01T14:00:00.000Z",
          updatedAt: "2021-07-01T14:00:00.000Z",
          bonsais: {
            id: 1,
            name: "Bonsai 1",
            specie: { name: "Espèce 1" },
            age: 1,
            photo: "photo1.jpg",
            createdAt: "2021-07-01T14:00:00.000Z",
            updatedAt: "2021-07-01T14:00:00.000Z",
            repotting: "2021-07-01T14:00:00.000Z",
            nextRepotting: "2021-07-01T14:00:00.000Z",
            ligaturing: "2021-07-01T14:00:00.000Z",
          },
        },
      },
    },
  },
];

describe("Home", () => {
  it("displays the heading", () => {
    const view = render(
      <MockedProvider mocks={userProfileMock} addTypename={false}>
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </MockedProvider>,
      { wrapper: BrowserRouter } //On utilise le BrowserRouter pour éviter les erreurs liées aux routes
    );

    expect(screen.getByText(/Bienvenue sur le site de test/)).toBeVisible(); //On vérifie que le texte est bien affiché

    expect(view.baseElement).toMatchSnapshot(); //Ceci est un snapshot, il permet de vérifier que le rendu est toujours le même
  });
});
