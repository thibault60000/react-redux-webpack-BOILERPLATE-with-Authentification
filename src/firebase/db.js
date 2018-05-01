import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, statut) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    statut,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');


// Article API 

export const onceGetArticles = () => 
  db.ref('articles').once('value');

export const doCreateArticle = (user, id, title, date, description, comments, likes) => 
  db.ref(`articles/${id}`).set({
    user,
    id,
    title,
    date,
    description,
    comments,
    likes,
  });
