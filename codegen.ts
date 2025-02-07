import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";


dotenv.config();


const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_API_ROUTE + "graphql",
  documents: ["src/**/*.{graphql,gql,ts,tsx}"], // Includes GraphQL files and inline queries in .ts/.tsx
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql", // Matches gql usage in your app
      },
      plugins: [], // No additional plugins needed with the 'client' preset
      config: {
        dedupeFragments: true, // Prevent duplicate fragments
      },
    },
  },
  ignoreNoDocuments: true, // Avoids errors when no documents are found
};

export default config;
