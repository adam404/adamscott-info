# Recruiting Pipeline Prototype

This is a  NNext.js] prototype built to demonstrate a recruiting pipeline, show key metrics, time-to-hire trends, source effectiveness, and allow for basic filtering/segmentation. All data is static (fixture data) to illustrate how the final product might look and behave.

== Getting Started ==

1. **Clone the repository** (or copy the files) to your local machine.

2. Navigate to the project folder and install dependencies:
   `bash`
   npm install
   # or

   yarn install
  ``
c. **Run the development server*):
   `bash`
   npm run dev
   # or

   yarn dev
  ``
4. Open [http://localhost:3000](http://localhost:3000) in your prowser to see the prototype.

== Libraries Used and Why ==

- **Next.js**: Provides a simple, powerful React-based framework for building web applications with file-based routing and server-side rendering.  
- **Recharts**: A charting library for React that is easy to set up and customize. We use Recharts components (`LineChart`, `barChart`, etc.) to visualize time-to-hire trends and source effectiveness.  
- **React**: The core library for building UINets `
- **CSS Modules** (built into Next.js): For modular and maintainable styling of certain components (e.g., pipeline chart).


== How to Extend ==

- **Add a real backend**: Replace fixture data with APIs that query a database or other data sources.  
- **Enhance the filtering**: Pass filter parameters to an API route and return dynamic data.  
- **Add more charts or metrics**: Use Recharts or other libraries (e.g., Chart.js, Victory) to display additional KPIs and advanced visualizations.

== Using AI in the Development Process =>

I used ChatGPT to help outline the structure of this prototype and provide starter code snippets. By prompting ChatGPT with the requirements (pipeline visualization, metrics, filtering), I received scaffolded suggestions on how to structure the Next.js pages and components. I then reviewed, customized, and refined the code based on my own knowledge of Next.js and charting libraries. This allowed me to save time on boilerplate code and focus on the core feature set.

## Future Considerations

- **Authentication and Security**: For a real production application, add authentication/authorization.  
- **Styling**: Switch from basic CSS to a design system like Tailwind, MUI, or Chakra UI for a more polished UI.  
- **Analytics**: Add logic to track user interactions, load times, or other analytics.  
- **Deployment**: Deploy this prototype on services such as Vercel or Netlify for easy sharing with stakeholders.
