// Libs
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import styled from 'styled-components'
import Firebase from 'firebase'

// Views
// I don't like relative paths but whatever lets just run
import Index from './views/index'
import Profile from './views/profile'

// Components
import AppBar from './components/AppBar'

function App() {
  React.useEffect(() => {
    // Init the Firebase App
    Firebase.initializeApp({
      apiKey: 'AIzaSyA8MQOC4Qyc_R3cK_GO5Zj1Uv-XGp4uzyI',
      projectId: 'natural-test-822fc',
    })
    Firebase.auth().useDeviceLanguage()
  }, [])

  // Router
  return (
    <Router>
      <AppBar />
      <MainContainer>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/profile" component={Profile} />
          <Redirect to="/" />
        </Switch>
      </MainContainer>
    </Router>
  )
}

export default App

// //
// Styles
// //
const MainContainer = styled.div`
  width: 100%;
  max-width: 700px;
  position: relative;
  padding: 15px;
`
