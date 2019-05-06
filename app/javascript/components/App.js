import "@babel/polyfill"
import React from 'react'

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import Home from 'screens/Home'
import Bookings from 'screens/Bookings'
import BookingView from 'screens/Bookings/View'
import BookMovie from 'screens/BookMovie'
import NotFound from 'screens/NotFound'
import '../styles/app.scss'

const client = new ApolloClient({
  uri: '/graphql',
  fetchOptions: {
    fetch,
    credentials: 'same-origin',
  },
  request: async (operation) => {
    const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content')
    operation.setContext({
      headers: {
        'X-CSRF-Token': csrfToken,
      },
    })
  },
})

const App = () => (
  <main>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/bookings" component={Bookings} />
          <Route path="/booking/:bookingId" component={BookingView} />
          <Route path="/movie/:movieId" component={BookMovie} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  </main>
)

export default App
