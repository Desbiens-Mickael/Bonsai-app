import { gql } from "@apollo/client/core";
import client from "./apolloClient";
import db from "../../server/src/db";
import User from "../../server/src/entity/User";

const createUserMutation = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      id
      firstname
    }
  }
`;

const getUserQuery = gql`
  query Users {
    users {
      id
      firstname
      email
    }
  }
`;

describe("UserResolver", () => {
  describe("create user", () => {
    it("should create a user given valid attributes", async () => {
      const res = await client.mutate({
        mutation: createUserMutation,
        variables: {
          data: {
            firstname: "John",
            email: "jhon.doe@gmail.com",
            password: "test1234",
            role: "user",
          },
        },
      });

      expect(res.data.createUser).toHaveProperty("id");
      expect(res.data.createUser).toHaveProperty("firstname", "John");
    });
  });

  it("should not create user given invalid attributes and return an error", () => {
    expect(() =>
      client.mutate({
        mutation: createUserMutation,
        variables: {
          data: {
            firstname: "John",
            email: "",
            password: "test1234",
            role: "user",
          },
        },
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Argument Validation Error"`);
  });

  describe("should retrieve a user", () => {
    it("should retrieve a user given valid attributes", async () => {
      await db.getRepository(User).save([
        {
          firstname: "John",
          email: "jhon.doe@gmail.com",
          password: "test1234",
          role: "user",
          createdAt: new Date(),
        },
        {
          firstname: "Janne",
          email: "Janne.doe@gmail.com",
          password: "test1234",
          role: "user",
          createdAt: new Date(),
        },
      ]);

      const res = await client.query({
        query: getUserQuery,
        fetchPolicy: "no-cache",
      });

      expect(res.data.users).toHaveLength(2);
      res.data.users.forEach((user: User) => {
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("firstname");
        expect(user).toHaveProperty("email");
      });
    });
  });
});
