const components = {
  h1: (props: any) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
  ),
  p: (props: any) => (
    <p className="my-4 leading-7" {...props} />
  ),
  // Add more component mappings as needed
}

export default components
