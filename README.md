# Natural cycles FullStack test

This project was made by Ismael Fuentes for Natural cycles, hope is well built enough

## Public url

The public url where the web is working hosted on firebase: https://natural-test-822fc.web.app

## Project Organization

### Front-End

The source code for the front is inside the src folder, it was made using React & Material-ui

### Back-End

The code has been hosted in AWS Lambda functions, using a simple API Gateway to expose them to the web app and they are using a DynamoDB in order to store and read the registered users.
The small and simple source coude is inside the folder BackEnd

I didn't put much effort on this side since it's just a CRUD lambda code

The screenshot of the Dynamodb table is uploaded here -> https://natural-test-822fc.web.app/dynamodb.jpg

## Project Set up

In order to launch the project locally you should install the dependencies and start the project:
`yarn` or `npm install`

### It will say that there is a vulnerability, its because of the react-scripts but i had to use this version because of a bug with ts

And then
`yarn start` or `npm run start`

Remember to write your phone number with the country prefix

## Things that could be better

There are some things that could have been made better if it was a real project and the time and effort would be worth.
We may discuss them and i can make pseudocode if you need me to, but i don't see the point of invest more time for just a test

### Things that would be done in a real project:

- Import paths with ts paths in order to have paths for src, views, components and dont use relative paths out of local folder
- Check params on the post & put methods
- Check if key already exists and don't create the user if it does
- Check if the firebase token is an active & valid token
- Tests for FE, Lambdas, etc
- No browser alerts and notify the users appropiately
- The persistent data in the localStorage should have expiry date (And use a cookie may be?)
- Separate devDependencies and dependencies
- PUT was being rejected by the API Gateway in AWS even after granting CORS for it too, so i just skipped it and use always post
- Mark the inputs with errors as errored in the profile view
- API/BE Url to a constants file
- Use a production build of the Firebase sdk (now we are having a warning in the console)
- Typescript strict mode
- The deployed AWS Api Gateway is using a "default" enviroment for the endpoints, it should be a production one
- Add the country prefix to the phone if the user doesn't do it
