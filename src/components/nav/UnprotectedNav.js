// This navbar will show up when the user is not logged in.
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import { firebaseAuth } from '../../../config/firebaseCredentials'
import Logo from './Logo'
import LinkButton from '../helperElements/LinkButton'
import AuthFrame from '../authentication/AuthFrame'
import { SearchHits } from '../helperElements/Search.jsx'

export default class UnprotectedNav extends React.Component {
  constructor() {
    super();

    this.state = {

    };

  }

  componentDidMount() {


    this.state = {};

  }

  /* THIS IS THE UNPROTECTED NAV, MEANING ALL BUTTONS AND ROUTES WILL BE VISIBLE
      ONLY WHEN THE USER IS NOT SIGNED IN */
  render() {
    return (
      <div className="protectednavbar-container">
        <div className="logo-navbar">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="navbar-search-container">
          <div>
            <Link to="/searching">
              <SearchHits />
            </Link>
            {/* <SearchToggler searchBy={this.props.searchBy} /> */}
          </div>
        </div>

        <div className="login-nav">
          <ul className="nav-items">

            {/* <li className="link-button">
              <Link to="/">
                <LinkButton title='Home' clickFunction={() => {}}/>
              </Link>
            </li> */}

            <li className="link-button">
              <Link to="/">
                <LinkButton title='Login' clickFunction={() => {
                  // this needs to set state in the app that will cause the
                  // auth frame to render and then unrender on rerender.
                  this.props.setIsOnAuthFrame(true)
                }} />
              </Link>
            </li>

          </ul>
          {/* <Link to="/searching">
            <SearchHits />
          </Link> */}
          {/*<ul className="nav navbar-nav">
            <li className="navbar-text navbar-center align-top search-bar">
              <SearchBar search={(input) => {console.log(`you searched: ${input}, but this search function doesnt do shit`)}}/>
            </li>
          </ul>*/}

        </div>
      </div>
    )
  }
}
