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
    "  \n    mutation CreateMessage($body: CreateMessagesInput!) {\n      createMessage(body: $body) {\n        name\n      }\n    }\n": types.CreateMessageDocument,
    "\n  query message($messageId: ID!) {\n      message(id: $messageId) { _id name email unread message createdAt updatedAt}\n  }\n": types.MessageDocument,
    "\n  query Messages($pagination: PaginationInput, $query: MessagesQueryInput) {\n    messages(pagination: $pagination, query: $query) { meta { page limit total unread }\n    data { _id name email unread}\n    }\n  }\n": types.MessagesDocument,
    "\n  mutation UpdateMessage($updateMessageId: ID!, $body: UpdateMessagesInput) {\n    updateMessage(id: $updateMessageId, body: $body) { unread }\n}\n": types.UpdateMessageDocument,
    "\n  mutation RemoveMessage($deleteMessageId: ID!) { deleteMessage(id: $deleteMessageId) { _id }}\n": types.RemoveMessageDocument,
    "\n  query GetProfile {\n    profile { _id name email role }\n  }\n": types.GetProfileDocument,
    "\nquery single_Project($projectId: ID!) {\n project(id: $projectId) { name thumbnail { url } images { url } description packages tags liveUrl\n  githubUrl { frontend backend }\n  user { name email } createdAt updatedAt\n }\n}\n": types.Single_ProjectDocument,
    "\n  query ProjectsList($pagination: PaginationInput, $query: ProjectQueryInput) {\n      projects(pagination: $pagination, query: $query) {\n        meta { page limit total }\n        data { _id name thumbnail{uid name status url} position }\n      }\n    }\n": types.ProjectsListDocument,
    "\n  query Project($projectId: ID!) {\n    project(id: $projectId) {\n      _id position name description packages tags liveUrl\n      thumbnail { uid name status url }\n      images { uid name status url }\n      githubUrl { frontend backend }\n    }\n  }\n": types.ProjectDocument,
    "\nmutation DeleteProject($deleteProjectId: ID!) {\n  deleteProject(id: $deleteProjectId) {    \n      _id\n    }\n  }\n": types.DeleteProjectDocument,
    "\n  mutation UpdateProject($updateProjectId: ID!, $body: UpdateProjectInput) {\n    updateProject(id: $updateProjectId, body: $body) { _id }\n  }\n": types.UpdateProjectDocument,
    "\n  mutation CreateProject($body: CreateProjectInput!) {\n    createProject(body: $body) {\n      _id\n    }\n  }\n": types.CreateProjectDocument,
    "\n  query Skills($pagination: PaginationInput, $query: SkillsQueryInput) {\n    skills(pagination: $pagination, query: $query) { meta { page limit total }\n    data { _id name image { uid name status url size } type createdAt updatedAt\n    }\n    }\n  }\n": types.SkillsDocument,
    "\n  mutation CreateSkill($body: CreateSkillsInput!) { createSkill(body: $body) { _id }}\n": types.CreateSkillDocument,
    "\n  query skill($skillId: ID!) {\n      skill(id: $skillId) { _id name image { uid name status url size } type createdAt updatedAt}\n  }\n": types.SkillDocument,
    "\n  mutation UpdateSkill($updateSkillId: ID!, $body: UpdateSkillsInput) { updateSkill(id: $updateSkillId, body: $body) { _id }}\n": types.UpdateSkillDocument,
    "\n  mutation RemoveSkill($deleteSkillId: ID!) { deleteSkill(id: $deleteSkillId) { _id }}\n": types.RemoveSkillDocument,
    "\n  query User($userId: ID!) {\n    user(id: $userId) { name email role avatar { url } isActive createdAt updatedAt\n    }\n  }\n": types.UserDocument,
    "\n  query UsersList($pagination: PaginationInput, $query: UserQueryInput) {\n      users(pagination: $pagination, query: $query) {\n        meta { page limit total }\n        data { _id name email role isActive avatar { uid name status url } }\n      }\n    }\n": types.UsersListDocument,
    "\n  mutation DeleteUser($deleteUserId: ID!) {\n    deleteUser(id: $deleteUserId) {\n      _id\n    }\n  }\n": types.DeleteUserDocument,
    "\n  mutation UpdateUser($updateUserId: ID!, $body: UpdateUserInput) {\n    updateUser(id: $updateUserId, body: $body) { name }\n  }\n": types.UpdateUserDocument,
    "\n    mutation createUser($body: CreateUserInput!) {\n    register(body: $body) { _id }\n  }  \n": types.CreateUserDocument,
    "\n  query Skills_F($pagination: PaginationInput, $query: SkillsQueryInput) {\n      skills(pagination: $pagination, query: $query) {\n      data { _id name image {url}\n      }\n    }\n  }\n": types.Skills_FDocument,
    "\n  mutation Login($body: LoginInput) {\n    login(body: $body) { accessToken }\n  }\n": types.LoginDocument,
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
export function gql(source: "  \n    mutation CreateMessage($body: CreateMessagesInput!) {\n      createMessage(body: $body) {\n        name\n      }\n    }\n"): (typeof documents)["  \n    mutation CreateMessage($body: CreateMessagesInput!) {\n      createMessage(body: $body) {\n        name\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query message($messageId: ID!) {\n      message(id: $messageId) { _id name email unread message createdAt updatedAt}\n  }\n"): (typeof documents)["\n  query message($messageId: ID!) {\n      message(id: $messageId) { _id name email unread message createdAt updatedAt}\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Messages($pagination: PaginationInput, $query: MessagesQueryInput) {\n    messages(pagination: $pagination, query: $query) { meta { page limit total unread }\n    data { _id name email unread}\n    }\n  }\n"): (typeof documents)["\n  query Messages($pagination: PaginationInput, $query: MessagesQueryInput) {\n    messages(pagination: $pagination, query: $query) { meta { page limit total unread }\n    data { _id name email unread}\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateMessage($updateMessageId: ID!, $body: UpdateMessagesInput) {\n    updateMessage(id: $updateMessageId, body: $body) { unread }\n}\n"): (typeof documents)["\n  mutation UpdateMessage($updateMessageId: ID!, $body: UpdateMessagesInput) {\n    updateMessage(id: $updateMessageId, body: $body) { unread }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveMessage($deleteMessageId: ID!) { deleteMessage(id: $deleteMessageId) { _id }}\n"): (typeof documents)["\n  mutation RemoveMessage($deleteMessageId: ID!) { deleteMessage(id: $deleteMessageId) { _id }}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProfile {\n    profile { _id name email role }\n  }\n"): (typeof documents)["\n  query GetProfile {\n    profile { _id name email role }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery single_Project($projectId: ID!) {\n project(id: $projectId) { name thumbnail { url } images { url } description packages tags liveUrl\n  githubUrl { frontend backend }\n  user { name email } createdAt updatedAt\n }\n}\n"): (typeof documents)["\nquery single_Project($projectId: ID!) {\n project(id: $projectId) { name thumbnail { url } images { url } description packages tags liveUrl\n  githubUrl { frontend backend }\n  user { name email } createdAt updatedAt\n }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ProjectsList($pagination: PaginationInput, $query: ProjectQueryInput) {\n      projects(pagination: $pagination, query: $query) {\n        meta { page limit total }\n        data { _id name thumbnail{uid name status url} position }\n      }\n    }\n"): (typeof documents)["\n  query ProjectsList($pagination: PaginationInput, $query: ProjectQueryInput) {\n      projects(pagination: $pagination, query: $query) {\n        meta { page limit total }\n        data { _id name thumbnail{uid name status url} position }\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Project($projectId: ID!) {\n    project(id: $projectId) {\n      _id position name description packages tags liveUrl\n      thumbnail { uid name status url }\n      images { uid name status url }\n      githubUrl { frontend backend }\n    }\n  }\n"): (typeof documents)["\n  query Project($projectId: ID!) {\n    project(id: $projectId) {\n      _id position name description packages tags liveUrl\n      thumbnail { uid name status url }\n      images { uid name status url }\n      githubUrl { frontend backend }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteProject($deleteProjectId: ID!) {\n  deleteProject(id: $deleteProjectId) {    \n      _id\n    }\n  }\n"): (typeof documents)["\nmutation DeleteProject($deleteProjectId: ID!) {\n  deleteProject(id: $deleteProjectId) {    \n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateProject($updateProjectId: ID!, $body: UpdateProjectInput) {\n    updateProject(id: $updateProjectId, body: $body) { _id }\n  }\n"): (typeof documents)["\n  mutation UpdateProject($updateProjectId: ID!, $body: UpdateProjectInput) {\n    updateProject(id: $updateProjectId, body: $body) { _id }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateProject($body: CreateProjectInput!) {\n    createProject(body: $body) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProject($body: CreateProjectInput!) {\n    createProject(body: $body) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Skills($pagination: PaginationInput, $query: SkillsQueryInput) {\n    skills(pagination: $pagination, query: $query) { meta { page limit total }\n    data { _id name image { uid name status url size } type createdAt updatedAt\n    }\n    }\n  }\n"): (typeof documents)["\n  query Skills($pagination: PaginationInput, $query: SkillsQueryInput) {\n    skills(pagination: $pagination, query: $query) { meta { page limit total }\n    data { _id name image { uid name status url size } type createdAt updatedAt\n    }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSkill($body: CreateSkillsInput!) { createSkill(body: $body) { _id }}\n"): (typeof documents)["\n  mutation CreateSkill($body: CreateSkillsInput!) { createSkill(body: $body) { _id }}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query skill($skillId: ID!) {\n      skill(id: $skillId) { _id name image { uid name status url size } type createdAt updatedAt}\n  }\n"): (typeof documents)["\n  query skill($skillId: ID!) {\n      skill(id: $skillId) { _id name image { uid name status url size } type createdAt updatedAt}\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateSkill($updateSkillId: ID!, $body: UpdateSkillsInput) { updateSkill(id: $updateSkillId, body: $body) { _id }}\n"): (typeof documents)["\n  mutation UpdateSkill($updateSkillId: ID!, $body: UpdateSkillsInput) { updateSkill(id: $updateSkillId, body: $body) { _id }}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveSkill($deleteSkillId: ID!) { deleteSkill(id: $deleteSkillId) { _id }}\n"): (typeof documents)["\n  mutation RemoveSkill($deleteSkillId: ID!) { deleteSkill(id: $deleteSkillId) { _id }}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query User($userId: ID!) {\n    user(id: $userId) { name email role avatar { url } isActive createdAt updatedAt\n    }\n  }\n"): (typeof documents)["\n  query User($userId: ID!) {\n    user(id: $userId) { name email role avatar { url } isActive createdAt updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UsersList($pagination: PaginationInput, $query: UserQueryInput) {\n      users(pagination: $pagination, query: $query) {\n        meta { page limit total }\n        data { _id name email role isActive avatar { uid name status url } }\n      }\n    }\n"): (typeof documents)["\n  query UsersList($pagination: PaginationInput, $query: UserQueryInput) {\n      users(pagination: $pagination, query: $query) {\n        meta { page limit total }\n        data { _id name email role isActive avatar { uid name status url } }\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteUser($deleteUserId: ID!) {\n    deleteUser(id: $deleteUserId) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($deleteUserId: ID!) {\n    deleteUser(id: $deleteUserId) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUser($updateUserId: ID!, $body: UpdateUserInput) {\n    updateUser(id: $updateUserId, body: $body) { name }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($updateUserId: ID!, $body: UpdateUserInput) {\n    updateUser(id: $updateUserId, body: $body) { name }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation createUser($body: CreateUserInput!) {\n    register(body: $body) { _id }\n  }  \n"): (typeof documents)["\n    mutation createUser($body: CreateUserInput!) {\n    register(body: $body) { _id }\n  }  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Skills_F($pagination: PaginationInput, $query: SkillsQueryInput) {\n      skills(pagination: $pagination, query: $query) {\n      data { _id name image {url}\n      }\n    }\n  }\n"): (typeof documents)["\n  query Skills_F($pagination: PaginationInput, $query: SkillsQueryInput) {\n      skills(pagination: $pagination, query: $query) {\n      data { _id name image {url}\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($body: LoginInput) {\n    login(body: $body) { accessToken }\n  }\n"): (typeof documents)["\n  mutation Login($body: LoginInput) {\n    login(body: $body) { accessToken }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;