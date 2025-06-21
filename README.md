This is an opinionated nextjs project template using prisma and next-auth. Credential authentication is setup by default.

## Getting Started

First, install required dependencies

npm install 

## Setup postgres database

To setup locally:

psql postgres

CREATE DATABASE app_database_name;

Now create .env file and allocate the following environment variables (below are example secrets, use real secrets for application security):

DATABASE_URL='postgresql://username:password@localhost:5432/app_database_name?schema=public' 
NEXTAUTH_SECRET='cXzepgoK7OYHb1AhZA9C2dyHOjQPmon5X2q0t2IcOTo=' 
JWT_SECRET='super-secret' 

## Prisma migration

Back in the standard terminal, initialise the prisma:

npx prisma migrate dev --name init
npx prisma generate

## Run application

npm run dev

Pages are grouped by (auth) pages, (dashboard) pages and (public) pages, however this is not opinionated and can be edited as required.

The base layout.js file provides the AuthProvider and no navbar or topbar components.

Within the (auth) pages, the grid-auth class is applied (from globals.css), and no additional components are provided.

Within the (dashboard) pages, both a topbar and sidebar is provided for page navigation. These pages can only be accessed when authenticated and will redirect to /login when a user is not authenticated.

(public) pages provided a topbar for basic navigation and site display.

bcryptjs is used for encryption of passwords before being stored in the postgres database. jwt are used to provide authenticated user sessions.

Within the api routes, auth and register are provided to allow for creation of a user and authentication of a user with an account. A reset-password endpoint is present but is yet to be implemented. Future implementation of password reset functionality will be by email using node mailer.

Some base styles are provided in globals.css


