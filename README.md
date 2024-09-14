## GrowMeOrganic Private Limited - React Task with Vite + Prime React
This project is a task assigned by GrowMeOrganic Private Limited, aimed at creating a React application with Vite and TypeScript that utilizes PrimeReact's DataTable component. The app demonstrates server-side pagination, row selection, and custom row selection persistence.

## Project Overview
This project is built with the following key requirements:

The React app is bootstrapped using Vite.
It uses TypeScript as the primary language.
The PrimeReact DataTable is used to display paginated data.
Implements server-side pagination, fetching data for each page dynamically.
Allows for row selection and deselection with checkboxes.
Custom row selection panel: selections persist across page changes (even if the user revisits the same page).
Additional Considerations:
To avoid memory issues, the application does not store all rows fetched across multiple pages.
Every page change triggers an API call to retrieve that page's data, as described in the provided video.
Demo
The application is deployed via Vercel. You can view the live version here (https://tesked-from-grow-me-organic-private-limited.vercel.app).

## Features
PrimeReact DataTable with Pagination: Fetches the first page of data on the initial load and displays it in a table.
Server-Side Pagination: Data is fetched dynamically from the server on page change.
Row Selection: Users can select individual rows or all rows at once using checkboxes.
Custom Row Selection Persistence: Row selections (and deselections) persist across different pages. For example, if rows on page 2 are selected, the selection remains intact when returning to page 2 from another page.
Installation and Setup
To get started with the project, clone the repository and install the dependencies.

## Prerequisites
Ensure you have the following installed on your local machine:

Node.js (v14 or higher)
npm or yarn
Vite (comes installed with the project)
Clone the Repository
bash
Copy code
git clone https://github.com/your-username/growmeorganic-react-task.git
cd grown organic-react-task
Install Dependencies
bash
Copy code
npm install
Or if you're using yarn:


yarn install
Run the Application
To run the app locally:

npm run dev
Or using yarn:

yarn dev
Build for Production
To build the app for production:

npm run build
Or using yarn:

npm run Build
yarn build

## Deployment
This project is deployed on Vercel. To deploy the app to Vercel, you can follow these steps:

Push your code to a Git repository.
Go to Vercel and sign in with your Git provider (GitHub, GitLab, or Bitbucket).
Once logged in, click "New Project" and import your repository.
After importing, Vercel will automatically build and deploy your project.
PrimeReact DataTable Usage
The application utilizes the PrimeReact DataTable component to display tabular data with the following key features:

Pagination: Server-side pagination ensures efficient data fetching.
Row Selection: Allows users to select or deselect rows using checkboxes.
Custom Row Selection Persistence: Row selections remain intact across different page changes, even when revisiting pages.
