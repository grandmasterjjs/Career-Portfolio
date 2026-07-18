import { defineCliConfig } from "sanity/cli";
import { sanityDataset, sanityProjectId } from "./src/sanity/env";

export default defineCliConfig({
  api: {
    projectId: sanityProjectId || "missingprojectid",
    dataset: sanityDataset,
  },
});
