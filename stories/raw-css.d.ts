// Type declarations for raw CSS imports
declare module "*.css?raw" {
  const content: string;
  export default content;
}
