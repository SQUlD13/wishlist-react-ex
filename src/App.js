// import logo from './logo.svg';
import { HashRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import WishlistApp from './pages/WishlistApp';


function App() {
  return (
    <div className="app">
      <section className="content">
        <Router>
          <Route exact component={WishlistApp} path='/' />
          <Route exact component={WishlistApp} path='/:title' />
        </Router>
      </section>
    </div>
  );
}

export default App;
