/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query UsersList($pagination: PaginationInput, $query: UserQuery) {\n    users(pagination: $pagination, query: $query) {\n      meta { page limit total }\n      data { _id name email role isActive }\n    }\n  }\n": types.UsersListDocument,
    "\n  mutation DeleteUser($deleteUserId: ID!) {\n    deleteUser(id: $deleteUserId) {\n      _id\n    }\n  }\n": types.DeleteUserDocument,
    "\n  mutation UpdateUser($updateUserId: ID!, $body: UpdateUserInput) {\n    updateUser(id: $updateUserId, body: $body) {\n      email\n      name\n      role\n    }\n  }\n": types.UpdateUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UsersList($pagination: PaginationInput, $query: UserQuery) {\n    users(pagination: $pagination, query: $query) {\n      meta { page limit total }\n      data { _id name email role isActive }\n    }\n  }\n"): (typeof documents)["\n  query UsersList($pagination: PaginationInput, $query: UserQuery) {\n    users(pagination: $pagination, query: $query) {\n      meta { page limit total }\n      data { _id name email role isActive }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteUser($deleteUserId: ID!) {\n    deleteUser(id: $deleteUserId) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($deleteUserId: ID!) {\n    deleteUser(id: $deleteUserId) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUser($updateUserId: ID!, $body: UpdateUserInput) {\n    updateUser(id: $updateUserId, body: $body) {\n      email\n      name\n      role\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($updateUserId: ID!, $body: UpdateUserInput) {\n    updateUser(id: $updateUserId, body: $body) {\n      email\n      name\n      role\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;