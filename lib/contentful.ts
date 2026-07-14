import { createClient } from "contentful";

const space = process.env.CONTENTFUL_SPACE_ID || "yjslma0tc7f3";
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN || "SEKCh5VW6DX_9ysT-o8Ra0b_ZdYe1wr6TBqJeQHCL4Y";
const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";

export const contentfulClient = createClient({
  space,
  environment,
  accessToken,
});