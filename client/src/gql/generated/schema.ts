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
  specie?: Maybe<Specie>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BonsaiInput = {
  age?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  photo?: InputMaybe<Scalars['String']>;
  specieId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBonsai: Bonsai;
  createPropagationMethod: PropagationMethod;
  createSpecie: Specie;
  createUser: User;
  deleteBonsai: Scalars['Boolean'];
  deleteSpecie: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login: Scalars['String'];
  logout: Scalars['Boolean'];
  updateBonsai: Bonsai;
  updatePropagationMethod: PropagationMethod;
  updateSpecie: Specie;
  updateUser: User;
};


export type MutationCreateBonsaiArgs = {
  data: BonsaiInput;
};


export type MutationCreatePropagationMethodArgs = {
  data: PropagationMethodeInput;
};


export type MutationCreateSpecieArgs = {
  data: SpecieInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteBonsaiArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteSpecieArgs = {
  specieId: Scalars['Int'];
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


export type MutationUpdatePropagationMethodArgs = {
  data: PropagationMethodeInput;
  id: Scalars['Float'];
};


export type MutationUpdateSpecieArgs = {
  data: SpecieInput;
  specieId: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  data: UserInput;
  id: Scalars['Int'];
};

export type PropagationMethod = {
  __typename?: 'PropagationMethod';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
  species: Array<Specie>;
  steps?: Maybe<Array<PropagationSteps>>;
};

export type PropagationMethodeInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  speciesIds: Array<Scalars['Int']>;
  stepsIds?: InputMaybe<Array<Scalars['Int']>>;
};

export type PropagationStepInput = {
  explanation: Scalars['String'];
  photo?: InputMaybe<Scalars['String']>;
  stepNumber: Scalars['Int'];
  title: Scalars['String'];
};

export type PropagationSteps = {
  __typename?: 'PropagationSteps';
  explanation?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  photo?: Maybe<Scalars['String']>;
  propagationMethod: PropagationMethod;
  stepNumber: Scalars['Float'];
  title: Scalars['String'];
};

export type PruningMethod = {
  __typename?: 'PruningMethod';
  description: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  species: Array<Specie>;
  steps?: Maybe<Array<PruningStep>>;
};

export type PruningMethodeInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  stepsIds: Array<Scalars['Int']>;
};

export type PruningStep = {
  __typename?: 'PruningStep';
  explanation?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  photo?: Maybe<Scalars['String']>;
  pruningMethod: PruningMethod;
  stepNumber: Scalars['Float'];
  title: Scalars['String'];
};

export type PruningStepInput = {
  explanation: Scalars['String'];
  photo?: InputMaybe<Scalars['String']>;
  stepNumber: Scalars['Int'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bonsais: Array<Bonsai>;
  getBonsaiById: Bonsai;
  getBonsaisByUser: Array<Bonsai>;
  getCurrentUser: User;
  getUserById: User;
  propagationMethod: PropagationMethod;
  propagationMethods: Array<PropagationMethod>;
  propagationSteps: Array<PropagationSteps>;
  pruningMethods: Array<PruningMethod>;
  pruningSteps: Array<PruningStep>;
  specie: Specie;
  species: Array<Specie>;
  users: Array<User>;
};


export type QueryGetBonsaiByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryPropagationMethodArgs = {
  id: Scalars['Float'];
};

export type Specie = {
  __typename?: 'Specie';
  bonsais: Array<Bonsai>;
  culture?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  propagationMethods: Array<PropagationMethod>;
  pruningMethods: Array<PruningMethod>;
};

export type SpecieInput = {
  culture?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  name: Scalars['String'];
  photo?: InputMaybe<Scalars['String']>;
  propagationMethodId?: InputMaybe<Array<Scalars['Int']>>;
  pruningMethodId?: InputMaybe<Array<Scalars['Int']>>;
};

export type UpdateBonsaiInput = {
  age?: InputMaybe<Scalars['Int']>;
  deligaturing?: InputMaybe<Scalars['DateTime']>;
  ligaturing?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  nextRepotting?: InputMaybe<Scalars['DateTime']>;
  photo?: InputMaybe<Scalars['String']>;
  repotting?: InputMaybe<Scalars['DateTime']>;
  specieId: Scalars['Int'];
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

export type CreateBonsaiMutationVariables = Exact<{
  data: BonsaiInput;
}>;


export type CreateBonsaiMutation = { __typename?: 'Mutation', createBonsai: { __typename?: 'Bonsai', id: number, name: string, age?: number | null, photo?: string | null, createdAt: any, updatedAt?: any | null, repotting?: any | null, nextRepotting?: any | null, ligaturing?: any | null, specie?: { __typename?: 'Specie', id: number, name: string } | null } };

export type CreateUserMutationVariables = Exact<{
  data: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, firstname: string, email: string, password: string, role: string, createdAt: any } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: number, firstname: string, email: string, password: string, role: string, createdAt: any, updatedAt?: any | null, bonsais?: Array<{ __typename?: 'Bonsai', id: number, name: string, age?: number | null, photo?: string | null, createdAt: any, updatedAt?: any | null, repotting?: any | null, nextRepotting?: any | null, ligaturing?: any | null, specie?: { __typename?: 'Specie', name: string } | null }> | null } };

export type GetSpeciesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSpeciesQuery = { __typename?: 'Query', species: Array<{ __typename?: 'Specie', id: number, name: string }> };

export type GetUserByIdQueryVariables = Exact<{
  UserdId: Scalars['Int'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById: { __typename?: 'User', id: number, firstname: string, email: string, password: string, role: string } };

export type LoginMutationVariables = Exact<{
  data: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateBonsaiMutationVariables = Exact<{
  data: UpdateBonsaiInput;
  updateBonsaiId: Scalars['Int'];
}>;


export type UpdateBonsaiMutation = { __typename?: 'Mutation', updateBonsai: { __typename?: 'Bonsai', name: string, age?: number | null, photo?: string | null, repotting?: any | null, nextRepotting?: any | null, ligaturing?: any | null, deligaturing?: any | null, specie?: { __typename?: 'Specie', id: number, name: string } | null } };

export type UpdateUserMutationVariables = Exact<{
  data: UserInput;
  updateUserId: Scalars['Int'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, firstname: string, email: string, password: string, role: string, createdAt: any, updatedAt?: any | null } };

export type GetBonsaiByIdQueryVariables = Exact<{
  bonsaiId: Scalars['Int'];
}>;


export type GetBonsaiByIdQuery = { __typename?: 'Query', getBonsaiById: { __typename?: 'Bonsai', name: string, age?: number | null, photo?: string | null, repotting?: any | null, nextRepotting?: any | null, ligaturing?: any | null, deligaturing?: any | null, specie?: { __typename?: 'Specie', id: number, name: string } | null } };

export type GetBonsaisByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBonsaisByUserQuery = { __typename?: 'Query', getBonsaisByUser: Array<{ __typename?: 'Bonsai', id: number, name: string, age?: number | null, photo?: string | null, createdAt: any, updatedAt?: any | null, repotting?: any | null, nextRepotting?: any | null, ligaturing?: any | null, deligaturing?: any | null, specie?: { __typename?: 'Specie', id: number, name: string } | null }> };


export const CreateBonsaiDocument = gql`
    mutation CreateBonsai($data: BonsaiInput!) {
  createBonsai(data: $data) {
    id
    name
    specie {
      id
      name
    }
    age
    photo
    createdAt
    updatedAt
    repotting
    nextRepotting
    ligaturing
  }
}
    `;
export type CreateBonsaiMutationFn = Apollo.MutationFunction<CreateBonsaiMutation, CreateBonsaiMutationVariables>;

/**
 * __useCreateBonsaiMutation__
 *
 * To run a mutation, you first call `useCreateBonsaiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBonsaiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBonsaiMutation, { data, loading, error }] = useCreateBonsaiMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBonsaiMutation(baseOptions?: Apollo.MutationHookOptions<CreateBonsaiMutation, CreateBonsaiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBonsaiMutation, CreateBonsaiMutationVariables>(CreateBonsaiDocument, options);
      }
export type CreateBonsaiMutationHookResult = ReturnType<typeof useCreateBonsaiMutation>;
export type CreateBonsaiMutationResult = Apollo.MutationResult<CreateBonsaiMutation>;
export type CreateBonsaiMutationOptions = Apollo.BaseMutationOptions<CreateBonsaiMutation, CreateBonsaiMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: UserInput!) {
  createUser(data: $data) {
    id
    firstname
    email
    password
    role
    createdAt
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
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
      specie {
        name
      }
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
export const GetSpeciesDocument = gql`
    query GetSpecies {
  species {
    id
    name
  }
}
    `;

/**
 * __useGetSpeciesQuery__
 *
 * To run a query within a React component, call `useGetSpeciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpeciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpeciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSpeciesQuery(baseOptions?: Apollo.QueryHookOptions<GetSpeciesQuery, GetSpeciesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpeciesQuery, GetSpeciesQueryVariables>(GetSpeciesDocument, options);
      }
export function useGetSpeciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpeciesQuery, GetSpeciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpeciesQuery, GetSpeciesQueryVariables>(GetSpeciesDocument, options);
        }
export type GetSpeciesQueryHookResult = ReturnType<typeof useGetSpeciesQuery>;
export type GetSpeciesLazyQueryHookResult = ReturnType<typeof useGetSpeciesLazyQuery>;
export type GetSpeciesQueryResult = Apollo.QueryResult<GetSpeciesQuery, GetSpeciesQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($UserdId: Int!) {
  getUserById(id: $UserdId) {
    id
    firstname
    email
    password
    role
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      UserdId: // value for 'UserdId'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UpdateBonsaiDocument = gql`
    mutation UpdateBonsai($data: UpdateBonsaiInput!, $updateBonsaiId: Int!) {
  updateBonsai(data: $data, id: $updateBonsaiId) {
    name
    age
    photo
    repotting
    nextRepotting
    ligaturing
    deligaturing
    specie {
      id
      name
    }
  }
}
    `;
export type UpdateBonsaiMutationFn = Apollo.MutationFunction<UpdateBonsaiMutation, UpdateBonsaiMutationVariables>;

/**
 * __useUpdateBonsaiMutation__
 *
 * To run a mutation, you first call `useUpdateBonsaiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBonsaiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBonsaiMutation, { data, loading, error }] = useUpdateBonsaiMutation({
 *   variables: {
 *      data: // value for 'data'
 *      updateBonsaiId: // value for 'updateBonsaiId'
 *   },
 * });
 */
export function useUpdateBonsaiMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBonsaiMutation, UpdateBonsaiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBonsaiMutation, UpdateBonsaiMutationVariables>(UpdateBonsaiDocument, options);
      }
export type UpdateBonsaiMutationHookResult = ReturnType<typeof useUpdateBonsaiMutation>;
export type UpdateBonsaiMutationResult = Apollo.MutationResult<UpdateBonsaiMutation>;
export type UpdateBonsaiMutationOptions = Apollo.BaseMutationOptions<UpdateBonsaiMutation, UpdateBonsaiMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UserInput!, $updateUserId: Int!) {
  updateUser(data: $data, id: $updateUserId) {
    id
    firstname
    email
    password
    role
    createdAt
    updatedAt
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *      updateUserId: // value for 'updateUserId'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetBonsaiByIdDocument = gql`
    query GetBonsaiById($bonsaiId: Int!) {
  getBonsaiById(id: $bonsaiId) {
    name
    specie {
      id
      name
    }
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
    query GetBonsaisByUser {
  getBonsaisByUser {
    id
    name
    specie {
      id
      name
    }
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
 *   },
 * });
 */
export function useGetBonsaisByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetBonsaisByUserQuery, GetBonsaisByUserQueryVariables>) {
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