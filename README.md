# Introduction
This is my graduation project. It's a social media app centered around creating events and making new friends. I am responsible for web application, while my 2 other friends are responsible for mobile and backend.
It has the following features:
- Interactive map based on OpenStreetMaps
- Creating and joining events
- Social tab inside event to create posts and comments
- Friends system
- Chat with friends
- Payment system using Stripe
- Event feedback system

# WARNING - this version is currently set to run on an internal university server for thesis presentation purposes, so it is unable to be run for a brief while. Ultimately it will be deployed on a remote server accessible for everyone to test the application.

# Prerequisites to run application
1. Install docker - https://docs.docker.com/get-docker/
2. Install docker-compose - https://docs.docker.com/compose/install/
3. Install nodejs - https://nodejs.org/en/download/
4. Install npm - https://www.npmjs.com/get-npm

# Start backend
1. From root directory BussinTime go to /backend - ```cd backend```
2. Run backend containers - ```docker-compose -f compose.dev.yaml up```
3. Swagger url for local development - http://localhost:8443/swagger-ui/index.html?continue&continue&continue&continue#/

# Start frontend
1. From root directory BussinTime go to /frontend - ```cd frontend```
2. Install dependencies - ```npm install```
3. Run frontend - ```npm run dev```

# Start Stripe module
1. From root directory BussinTime go to /frontend/utils/stripe - ```cd frontend/utils/stripe```
2. Run node server - ```node server.js```

# Important resources for frontend development

Tailwind - https://tailwindcss.com/docs/installation

Material UI - https://mui.com/material-ui/

Shadcn UI - https://ui.shadcn.com/docs/components

Formik - https://formik.org/docs/overview

# Mobile
VM - Android studio
Install Android studio emulator and create virtual mashine. Type and brand is whatever
---------------------------------------------------
- Instalation to import all library:
npm install
---------------------------------------------------
- Run project:
At folder mobile/bussin_mobile/utils/const.js repleace API_URL with your local IP address with port :8443
npx expo start --localhost
