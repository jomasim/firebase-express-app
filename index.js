import express from "express";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";


// load env variables
dotenv.config();
// initialize express app
const app = express();
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSENGER_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId:process.env.MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Welcome to firebNode");
});
app.post('/register', (req,res) => {
    const { email = "", password = "" } = req.body;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        res.status(400).send(errorMessage)
      });
});

app.post('/login', (req, res) => {
    const { email = "", password = "" } = req.body;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) =>{
        res.status(200).send(response);
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        res.status(400).send(errorMessage)
      });
});

app.get('/companies', async(req, res) =>  {
   const user =  await firebase.auth().currentUser;
   const token = user ? user.getIdToken(true) : '';
   console.log('token found', token); // after getting the token you can attach it to the client;
   res.status(200).send('get companies here');
});

app.listen("3000", () => console.log("app is running on port 3000"));

export default app;
