import type { MDXComponents } from "mdx/types";
import { useMDXComponents as defaultMDXComponents } from "@mdx-js/react";

export function useMDXComponents(
  components: MDXComponents = {}
): MDXComponents {
  return {
    ...defaultMDXComponents(components),
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-border">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
    tbody: ({ children }) => (
      <tbody className="divide-y divide-border bg-background">{children}</tbody>
    ),
    tr: ({ children }) => <tr className="hover:bg-muted/50">{children}</tr>,
    th: ({ children }) => (
      <th className="px-4 py-3.5 text-left text-sm font-semibold text-foreground">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
        {children}
      </td>
    ),
  };
}
