import React from "react";
import { MDXProvider } from "@mdx-js/react";

const components = {
  // Define custom components to be used in MDX content
  // Example: h1: (props) => <h1 style={{ color: 'tomato' }} {...props} />,
};

const MDXProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MDXProviderWrapper;
