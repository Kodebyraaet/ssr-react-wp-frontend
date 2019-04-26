# Server side rendered React app for headless Wordpress

SSR provided by Next (https://nextjs.org)

### Backend 
This setup is meant to be used with WordPress headless backend. You can grab it here: https://github.com/Kodebyraaet/ssr-react-wp-backend

### Setup
1. Set up WP backend (link above) & have `http://localhost:8080` running 
2. Get dependencies with `npm i` 
3. Create .env file by rinning `cp .env.example .env` and make sure API_BASE in that env matches your backend URL
3. Start the server with `npm run dev`. Node server should now be running on http://localhost:3000

### Deployment with "Now"
Make sure you have "now" CLI installed (`now help`). If not - get it with `sudo npm i -g --unsafe-perm now`

Deply to now with `now`

### TODO:

+ ~fix featured image in post previews~
+ ~add support translation strings to config object~
+ ~abstract config & menu loading loading from pages/index.js so its easyer to create more pages~
+ ~add ACF options to global config endpoint~
+ ~add generic loader component~
+ ~addd cookie notice popup~
-> add page load progress bar