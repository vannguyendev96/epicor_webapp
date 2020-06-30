import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import PrivateRoute from './views/PrivateRoute/privateRoute';


// "start": "set PORT=8080 && react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "test:cov": "npm test -- --coverage --watchAll=false",
//     "test:debug": "react-scripts --inspect-brk test --runInBand",
//     "eject": "react-scripts eject",
//     "heroku-postbuild": "npm run build"

// "dev": "react-scripts start",
//     "start": "serve -s build",
//     "build": "react-scripts build",
//     "test": "react-scripts test --env=jsdom",
//     "eject": "react-scripts eject",
//     "heroku-postbuild": "npm run build"

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));


// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));



class App extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <PrivateRoute path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </React.Suspense>
      </HashRouter>

    );
  }
}

export default App;
