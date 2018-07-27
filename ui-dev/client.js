// @flow

import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PageView from './PageView'
import PageMiddleView from './PageMiddleView'
import DrawerItemView from './DrawerItemView'

const App = () => (
  <div style={{ height: '100%' }}>
    <style
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
      html {
      box-sizing: border-box;
      height: 100%;
      background: #f2f2f2;
      font-family: Roboto, Helvetica, Arial, sans-serif
    }

    body {
      height: 100%;
      margin: 0;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit
    }

    #app {
      height: 100%;
      display: flex;
      flex-direction: column;
      height: 100%
    }
    `,
      }}
    />
    <Router>
      <Fragment>
        <div style={{ borderBottom: '1px solid black' }}>
          <Link to="/">Home</Link>
          {' – '}
          <Link to="/Page">Page</Link>
          {' – '}
          <Link to="/PageMiddle">Page Middle</Link>
          {' – '}
          <Link to="/DrawerItem">DrawerItem</Link>
        </div>
        <div style={{ height: '100%' }}>
          <Route exact path="/" />
          <Route path="/Page" component={PageView} />
          <Route path="/PageMiddle" component={PageMiddleView} />
          <Route path="/DrawerItem" component={DrawerItemView} />
        </div>
      </Fragment>
    </Router>
  </div>
)

// flow-disable-next-line
render(<App />, document.getElementById('app'))