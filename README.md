# Take Home Exercise

You will have **a week** to complete the following take-home exercise. Please use Javascript to code the following exercise. We know Javascript is not everyone's primary coding language.**We will NOT be grading you on how well you know Javascript**, but rather on the deeper technical knowledge of code design patterns and best practices.

When submitting your exercise please include:

- A Readme for how to run the application and any tests (including any dependencies that must be downloaded). Also feel free to include any notes or tidbits about thought process as you tackled the exercise.

- Any comments to explain particular logic or call out something cool!

To submit your exercise, please create a repository in Github and email the link to [eng@join-real.com](mailto:eng@join-real.com). Also please email with any questions you may have. Happy Coding!

---

## Exercise: Course Sign-up

Create an application (Frontend and Backend) that allows people to sign up for courses. Courses are structured in the following way:

- Each course has 4 sessions, and each session's content is released on a weekly basis.

- A new section of the course is opened for sign up every 2 weeks.

- There is a cap of 10 people per course section.

## Notes
- Make sure you have `yarn` installed on your machine. If you do not, please run:
```
brew install yarn
```

- A basic NodeJS `express` server is set up, though feel free to use any NodeJS framework you may be comfortable with. To run the app:

```
yarn && yarn start
```

- A `create-react-app` project is included to use for frontend, but again feel free to use whatever framework (or none) you are comfortable with! (We are not judging design/ your CSS skills). To run the app:

```
yarn && yarn start
```

- There is some test data included in `data/` as a starting point to seed your database.

## Requirements

- A Postgres database should be set up to store courses, sections, sessions, and sign ups. Included is a `docker-compose.yml` file that spins up a Postgres db on `localhost:5560`.

- All session titles and descriptions for a course should be visible to users before sign up.

- A session's content should be visible only by people who have signed up for the course.

- A list of users signed up for each course section should be visible.

- A user should be able to register for a course and remove themselves from the course.

-------------------------------------------------------------------

## Mimi's notes - Running the app

- if you don't have postgres installed on your machine, install and set up based on the instructions here: https://www.postgresql.org/download/

- if you don't have yarn installed on your machine, do so using the instructions found here: https://classic.yarnpkg.com/en/docs/install/#mac-stable

Now you're ready to start the app!

- fork and clone the repo from https://github.com/mimi1694/fullstack-take-home

```
cd fullstack-take-home
```
- creat the database using either run createdb course-db, or through the pgAdmin app

- from the root folder of the app run
```
yarn fullDevStart
```
- This will take care of dependency installation, so now the app should be up and running!

## Mimi's notes on development:

- Backend:
The backend mainly consists of the database model and the routes which handle GET/PUT/POST/DELETE requests.
Each model gets its own file and is exported through db/models/index.js. That file also creates the associations between the models.
Each route is served from localhost:{PORT}/api/{model-name}, and each route can get the information for a specific item through localhost:{PORT}/api/{model-name}/:modelId.

- Frontend:
Similarly, the frontend is organize by components and the api.
The api folder has a file for each model, and a list of exported axios calls to that model's corresponding routes.
Generally, due to the nature of how the information is presented, there is a component for each model as well.

- Choices made/challenges while coding:

- One interesting choice I made was regarding limiting section sign ups to 10 users.
I wanted the front end to both recieve the error, be able to handle it gracefully, but
also not even allow the user to get into an error state. In order to achieve this, I checked
for a certain amount of users in each course before attempting to add one. If the course is full,
send back a 400 status with an error message.  Then on the front end, prevent the user from even
pressing the "enroll" button if the course is full, but if somehow they do anyway, catch that error in 
the promise and log it.

Regarding the app set up, since I am not well versed with Docker for the sake of time I utilized a local postgres database & server.
