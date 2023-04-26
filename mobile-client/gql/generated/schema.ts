import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Bonsai = {
  __typename?: 'Bonsai';
  age?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  deligaturing?: Maybe<Scalars['DateTime']>;
  id: Scalars['Float'];
  ligaturing?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  nextRepotting?: Maybe<Scalars['DateTime']>;
  owner: User;
  photo?: Maybe<Scalars['String']>;
  repotting?: Maybe<Scalars['DateTime']>;
  species: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BonsaiInput = {
  age?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  photo?: InputMaybe<Scalars['String']>;
  species: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBonsai: Bonsai;
  createUser: User;
  deleteUser: Scalars['Boolean'];
  login: Scalars['String'];
  logout: Scalars['Boolean'];
  updateBonsai: Bonsai;
  updateUser: User;
};


export type MutationCreateBonsaiArgs = {
  data: BonsaiInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  data: UserLoginInput;
};


export type MutationUpdateBonsaiArgs = {
  data: UpdateBonsaiInput;
  id: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  data: UserInput;
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  bonsais: Array<Bonsai>;
  getBonsaiById: Bonsai;
  getBonsaisByUser: Array<Bonsai>;
  getCurrentUser: User;
  getUserById: User;
  users: Array<User>;
};


export type QueryGetBonsaiByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetBonsaisByUserArgs = {
  userId: Scalars['Int'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};

export type UpdateBonsaiInput = {
  age?: InputMaybe<Scalars['Int']>;
  deligaturing?: InputMaybe<Scalars['DateTime']>;
  ligaturing?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  nextRepotting?: InputMaybe<Scalars['DateTime']>;
  photo?: InputMaybe<Scalars['String']>;
  repotting?: InputMaybe<Scalars['DateTime']>;
  species: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  bonsais?: Maybe<Array<Bonsai>>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['Float'];
  password: Scalars['String'];
  role: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  password: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: number, firstname: string, email: string, password: string, role: string, createdAt: any, updatedAt?: any | null, bonsais?: Array<{ __typename?: 'Bonsai', id: number, name: string, species: string, age?: number | null, photo?: string | null, createdAt: any, updatedAt?: any | null, repotting?: any | null, nextRepotting?: any | null, ligaturing?: any | null }> | null } };

export type LoginMutationVariables = Exact<{
  data: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type GetBonsaiByIdQueryVariables = Exact<{
  bonsaiId: Scalars['Int'];
}>;


export type GetBonsaiByIdQuery = { __typename?: 'Query', getBonsaiById: { __typename?: 'Bonsai', name: string, species: string, age?: number | null, photo?: string | null, repotting?: any | null, nextRepotting?: any | null, ligaturing?: any | null, deligaturing?: any | null } };

export type GetBonsaisByUserQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetBonsaisByUserQuery = { __typename?: 'Query', getBonsaisByUser: Array<{ __typename?: 'Bonsai', id: number, name: string, species: string, age?: number | null, photo?: string | null, createdAt: any, updatedAt?: any | null, repotting?: any | null, nextRepotting?: any | null, ligaturing?: any | null, deligaturing?: any | null }> };


export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    id
    firstname
    email
    password
    role
    createdAt
    updatedAt
    bonsais {
      id
      name
      species
      age
      photo
      createdAt
      updatedAt
      repotting
      nextRepotting
      ligaturing
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const LoginDocument = gql`
    mutation Login($data: userLoginInput!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetBonsaiByIdDocument = gql`
    query GetBonsaiById($bonsaiId: Int!) {
  getBonsaiById(id: $bonsaiId) {
    name
    species
    age
    photo
    repotting
    nextRepotting
    ligaturing
    deligaturing
  }
}
    `;

/**
 * __useGetBonsaiByIdQuery__
 *
 * To run a query within a React component, call `useGetBonsaiByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBonsaiByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBonsaiByIdQuery({
 *   variables: {
 *      bonsaiId: // value for 'bonsaiId'
 *   },
 * });
 */
export function useGetBonsaiByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBonsaiByIdQuery, GetBonsaiByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBonsaiByIdQuery, GetBonsaiByIdQueryVariables>(GetBonsaiByIdDocument, options);
      }
export function useGetBonsaiByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBonsaiByIdQuery, GetBonsaiByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBonsaiByIdQuery, GetBonsaiByIdQueryVariables>(GetBonsaiByIdDocument, options);
        }
export type GetBonsaiByIdQueryHookResult = ReturnType<typeof useGetBonsaiByIdQuery>;
export type GetBonsaiByIdLazyQueryHookResult = ReturnType<typeof useGetBonsaiByIdLazyQuery>;
export type GetBonsaiByIdQueryResult = Apollo.QueryResult<GetBonsaiByIdQuery, GetBonsaiByIdQueryVariables>;
export const GetBonsaisByUserDocument = gql`
    query GetBonsaisByUser($userId: Int!) {
  getBonsaisByUser(userId: $userId) {
    id
    name
    species
    age
    photo
    createdAt
    updatedAt
    repotting
    nextRepotting
    ligaturing
    deligaturing
  }
}
    `;

/**
 * __useGetBonsaisByUserQuery__
 *
 * To run a query within a React component, call `useGetBonsaisByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBonsaisByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBonsaisByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetBonsaisByUserQuery(baseOptions: Apollo.QueryHookOptions<GetBonsaisByUserQuery, GetBonsaisByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBonsaisByUserQuery, GetBonsaisByUserQueryVariables>(GetBonsaisByUserDocument, options);
      }
export function useGetBonsaisByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBonsaisByUserQuery, GetBonsaisByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBonsaisByUserQuery, GetBonsaisByUserQueryVariables>(GetBonsaisByUserDocument, options);
        }
export type GetBonsaisByUserQueryHookResult = ReturnType<typeof useGetBonsaisByUserQuery>;
export type GetBonsaisByUserLazyQueryHookResult = ReturnType<typeof useGetBonsaisByUserLazyQuery>;
export type GetBonsaisByUserQueryResult = Apollo.QueryResult<GetBonsaisByUserQuery, GetBonsaisByUserQueryVariables>;