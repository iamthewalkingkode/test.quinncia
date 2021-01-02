/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import './App.scss';
import 'antd/dist/antd.css';

// screens
import Home from './screens/Home';

const routes = [
  { name: 'Home', path: '/', exact: true, component: Home, },
];

const App = () => (
  <React.Fragment>
    <div style={{
      width: '60vw', margin: '0 auto', padding: 20,
    }}
    >
      <Router>
        <Switch>
          {routes.map((row) => (
            <Route
              key={row.name}
              path={row.path}
              name={row.name}
              exact={row.exact}
              render={(props) => (
                <row.component {...props} />
              )}
            />
          ))}

          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  </React.Fragment>
);

export default App;
