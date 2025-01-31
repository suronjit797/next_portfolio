import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";


dotenv.config();


const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_API_ROUTE + "graphql",
  documents: ["src/**/*.{graphql,gql,ts,tsx}"], // Includes GraphQL files and inline queries in .ts/.tsx
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql", // Matches gql usage in your app
      },
      plugins: [], // No additional plugins needed with the 'client' preset
    },
  },
  ignoreNoDocuments: true, // Avoids errors when no documents are found
};

export default config;
