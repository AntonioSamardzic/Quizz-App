import React, { useState, useEffect } from "react"
import "./App.css"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import Quizz from "./Components/Quizz"
import Axios from "axios"
// import Login from "./Components/Login"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import AddQForm from "./Components/AddQForm"
import AddQ from "./Components/AddQ"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" exact component={StartPage}>
          {/* <LoginPage /> */}
        </Route>
        <Route path="/login" component={Login}></Route>
        <PrivateRoute>
          <Route path="/quizz" component={Quizz}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/finish" component={Finish}></Route>
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

function StartPage() {
  return (
    <div>
      <div>
        <Link to="/login">
          <button className="font-bold text-white text-2xl mb-5 bg-blue-700 rounded p-5 shadow-md">
            Start Your Game
          </button>
        </Link>
      </div>
      <div>
        <Link to="/login">
          <button className=" font-bold text-white text-lg mb-5 bg-red-500 rounded p-2 shadow-md">
            Log Out
          </button>
        </Link>
      </div>
      <div>
        <Link to="/admin">
          <button className=" font-bold text-blue-800 text-lg mb-5 bg-white rounded p-2 shadow-md">
            Admin Mode
          </button>
        </Link>
      </div>
    </div>
  )
}

function Admin() {
  return (
    <div>
      <Link to="/admin">
        <AddQ />
      </Link>
    </div>
  )
}

const Finish = () => {
  return (
    <div>
      <h1>Score 7/10</h1>
      <Link to="/quizz">
        <button className="SGbtn">Play Again</button>
      </Link>
    </div>
  )
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false
    setTimeout(cb, 100)
  },
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("loggedin") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  })

  const [user, setUser] = useState({})

  const [check, setCheck] = useState("")

  let history = useHistory()
  let location = useLocation()

  let { from } = location.state || { from: { pathname: "/quizz" } }

  let login = () => {
    fakeAuth.authenticate(() => {
      localStorage.setItem("loggedin", true)
      history.replace(from)
    })
  }
  const pass = () => {
    if (input.email == user.email && input.password == user.password) {
      login()
    } else {
      console.log("error")
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:3004/user`).then((response) => {
      setUser(response.data)
    })
  }, [])

  return (
    <div id="login">
      <h2 className="text-center">Please Log In</h2>
      <Form className="col-lg" id="form">
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="ml-5">Email address</Form.Label>
          <Form.Control
            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
            type="email"
            name="email"
            placeholder="Enter email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="ml-5">Password</Form.Label>
          <Form.Control
            type="password"
            // name="password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox"></Form.Group>
        <div className="grid grid-cols-2 gap-6 mt-6">
          <Button onClick={pass}>Log In</Button>
          <Link className="ml-2 text-center bg-white rounded p-2" to="/">
            <button className="font-bold">Back</button>
          </Link>
        </div>
      </Form>
    </div>
  )
}

export default App
