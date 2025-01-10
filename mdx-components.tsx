import type { MDXComponents } from "mdx/types";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type MDXProps = {
  [key: string]: any;
};

const components: MDXComponents = {
  table: (props: MDXProps) => (
    <div className="my-8 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700" {...props} />
    </div>
  ),
  thead: (props: MDXProps) => <thead className="bg-gray-800/50" {...props} />,
  tbody: (props: MDXProps) => (
    <tbody className="divide-y divide-gray-700 bg-transparent" {...props} />
  ),
  tr: (props: MDXProps) => <tr className="hover:bg-gray-800/50" {...props} />,
  th: (props: MDXProps) => (
    <th className="px-4 py-3.5 text-left text-sm font-semibold" {...props} />
  ),
  td: (props: MDXProps) => (
    <td className="whitespace-nowrap px-4 py-4 text-sm" {...props} />
  ),
  p: (props: MDXProps) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
  ),
  ul: (props: MDXProps) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
  ),
  ol: (props: MDXProps) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
  ),
  li: (props: MDXProps) => <li {...props} />,
  h1: (props: MDXProps) => (
    <h1
      className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight"
      {...props}
    />
  ),
  h2: (props: MDXProps) => (
    <h2
      className="mt-10 scroll-m-20 border-b border-b-gray-700 pb-1 text-3xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h3: (props: MDXProps) => (
    <h3
      className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  a: (props: MDXProps) => (
    <a
      className="font-medium text-blue-400 underline underline-offset-4 hover:text-blue-500"
      {...props}
    />
  ),
};

export function useMDXComponents(
  _components: MDXComponents = {}
): MDXComponents {
  return {
    ...components,
    ..._components,
  };
}
