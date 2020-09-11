# WaitLess

Android app for a restaurant host to organize and prioritize guests on a waitlist and tables in the restaurant. Real-time data is stored in the cloud through AWS services. This app also aims to track and calculate data to pertaining to wait times and turnover rate to provide a better customer experience and a deeper understanding of your restaurant's turnover efficiency.

Motivation for this app comes from years of restaurant work experience, where I wish I had a tool to help multitasking while managing the floor and hosting busy brunch or dinner service. I wanted to create an app that would provide useful data to the host regarding wait times and table turnover rates, as well as keeping track of guests on a waitlist and the availability of tables.

### Dependencies

React Native 0.63 requires:

- Node 10 or newer
- JDK 8 or newer
- Android 10 (API 29)

Install dependencies with:

```
npm install
```

Start a development server with:

```
npm run start
```

Build and run the app with:

```
npm run android
```

### Tech Stack

This project was initialized with `npx react-native init WaitLess --template react-native-template-typescript`.
Additionally:

- React Native
- TypeScript
- React Navigation
- Java
- GraphQL
- AWS Amplify connecting these AWS services for Serverless backend:
  - AWS AppSync API -> GraphQL
  - Cognito -> user authentication
  - DynamoDB
