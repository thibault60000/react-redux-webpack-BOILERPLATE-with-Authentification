import React, { Component } from 'react';

import { db } from '../../firebase';
import * as routes from '../../constants/routes';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from '../Session/withAuthorization';



class ArticlePage extends Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  componentDidMount() {
    const { onSetArticles } = this.props;

    db.onceGetArticles().then(snapshot =>
      onSetArticles(snapshot.val())
    );
  }
  
  render(){
    const { articles, history } = this.props;
    return(
      <div>
        <h1>Article</h1>
        <ArticleCreateForm history={history} />
        { !!articles && <ArticleList articles={articles} /> }
      </div>
    )
  }
} 

/* Liste d'articles */
const ArticleList = ({ articles, history }) =>
  <div>
    <h2>Liste des articles </h2>

    {Object.keys(articles).map(key =>
      <ul key={key}>
        <li>{articles[key].title}</li>  
      </ul>
    )}
  </div>


/* Update By Proprety Name */
const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

/* State Initial */
const INITIAL_STATE = {
  user: '',
  id: '',
  title: '',
  date: '',
  description: '',
  comments: {},
  likes: null,
  error: null,
};

/* Formulaire Création d'Article */
class ArticleCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    console.log(this.props);
  }

  onSubmit = (event) => {

    const {
      id,
      title,
      date,
      description,
      comments,
      likes,
    } = this.state;

                                                   console.log(" STATE DU ONSUBMIT", this.state)
    const { history, authUser } = this.props;

                                              console.log(" PROPS DU ONSUBMIT" , history, authUser);

    this.setState({
      user: authUser.uid,
      id: authUser.uid + Date.now(),
      date: Date.now(),
      comments: null, 
      likes: null,
    });

    console.log("NOUVEAU STATE ON SUBMIT : " , this.state);

      // Création d'un utilisateur dans la base de données
      db.doCreateArticle(authUser.uid, id, title, date, description, comments, likes)
        .then(() => {
          this.setState(() => ({ ...INITIAL_STATE }));
          history.push(routes.ARTICLE);
        })
        .catch(error => {
          this.setState(updateByPropertyName('error', error));
        });

    event.preventDefault();
  }

  render() {
    const {
      title,
      description,
      error
    } = this.state;

    const isInvalid =
      title === '' ||
      description === '';

      const authUser = this.state.user;
    return (

      authUser.username,

      <form onSubmit={this.onSubmit}>
        <input
          value={title}
          onChange={event => this.setState(updateByPropertyName('title', event.target.value))}
          type="text"
          placeholder="Titre"
        />
        <textarea
          value={description}
          onChange={event => this.setState(updateByPropertyName('description', event.target.value))}
          placeholder="Description"
        />
       
        <button disabled={isInvalid} type="submit">
          Valider
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}


const mapStateToProps = (state) => ({
  articles: state.articleState.articles,
  authUser: state.sessionState.authUser,
});

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
  onSetArticles: (articles) => dispatch({ type: 'ARTICLES_SET', articles}),
});

const authCondition = (authUser) => !!authUser;


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(ArticlePage, ArticleCreateForm);
