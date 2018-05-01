import * as firebase from 'firebase';

const prodConfig = {
  apiKey: "AIzaSyAyvzboD3bLLWMcOouQigIeX5bCcRkYaG8",
  authDomain: "myproject-e1ee6.firebaseapp.com",
  databaseURL: "https://myproject-e1ee6.firebaseio.com",
  projectId: "myproject-e1ee6",
  storageBucket: "myproject-e1ee6.appspot.com",
  messagingSenderId: "947248939476"
};

const devConfig = {
  apiKey: "AIzaSyAyvzboD3bLLWMcOouQigIeX5bCcRkYaG8",
  authDomain: "myproject-e1ee6.firebaseapp.com",
  databaseURL: "https://myproject-e1ee6.firebaseio.com",
  projectId: "myproject-e1ee6",
  storageBucket: "myproject-e1ee6.appspot.com",
  messagingSenderId: "947248939476"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
