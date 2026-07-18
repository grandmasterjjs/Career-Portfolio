import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { sanityDataset, sanityProjectId } from "./src/sanity/env";

export default defineConfig({
  name: "careerPortfolio",
  title: "Career Portfolio",
  projectId: sanityProjectId || "missingprojectid",
  dataset: sanityDataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
