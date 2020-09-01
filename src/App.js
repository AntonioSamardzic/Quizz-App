import React, { useState, useEffect } from "react"
import "./App.css"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import Quizz from "./Components/Quizz"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import AddQ from "./Components/AddQ"
import ScoreBoard from "./Components/ScoreBoard"

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
        <Route exact path="/" exact component={Login}>
          {/* <LoginPage /> */}
        </Route>

        <PrivateRoute>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/start" component={StartPage}></Route>
          <Route path="/scoreboard" component={ScoreBoard}></Route>
          <Route path="/quizz" component={Quizz}></Route>
        </PrivateRoute>
      </Switch>
    </Router>
  )
}
function StartPage() {
  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }
  return (
    <div className="start">
      <div>
        <Link to="/quizz">
          <button className="startButtons">Start The Quizz</button>
        </Link>
      </div>
      <div>
        <Link to="/scoreboard">
          <button className="startButtons">See ScoreBoard</button>
        </Link>
      </div>
      <div>
        <button onClick={logout} className="startButtonsLogout">
          Log Out
        </button>
      </div>
    </div>
  )
}

function Admin() {
  return <AddQ></AddQ>
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
              pathname: "/",
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

  const [user, setUser] = useState([])
  const [admin, setAdmin] = useState([])

  const [check, setCheck] = useState("")

  let history = useHistory()
  let location = useLocation()

  let login = () => {
    let { logg } = location.state || { logg: { pathname: "/admin" } }
    fakeAuth.authenticate(() => {
      localStorage.setItem("loggedin", true)
      history.replace(logg)
    })
  }

  let alogin = () => {
    let { from, log } = location.state || {
      from: { pathname: "/start" },
      log: { pathname: "/admin" },
    }
    fakeAuth.authenticate(() => {
      localStorage.setItem("loggedin", true)
      history.replace(from)
    })
  }

  const pass = () => {
    let curr = []

    for (let i = 0; i < admin.length; i++) {
      if (
        admin[i].email === input.email &&
        admin[i].password === input.password
      ) {
        curr.push(admin[i])
      }
      if (curr.length > 0) {
        localStorage.setItem("curr", JSON.stringify(curr))
        alogin()
      }
    }

    for (let i = 0; i < user.length; i++) {
      if (
        user[i].email === input.email &&
        user[i].password === input.password
      ) {
        curr.push(user[i])
      }
      if (curr.length > 0) {
        localStorage.setItem("curr", JSON.stringify(curr))
        alogin()
      } else {
        alert("Wrong password or email")
      }
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:3004/user`).then((response) => {
      setUser(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:3004/admin`).then((response) => {
      setAdmin(response.data)
      console.log(response.data)
    })
  }, [])

  return (
    <div className="login" id="login">
      <h2 className="text-center">Please Log In</h2>
      <Form id="form">
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
          <Button
            className=" font-bold text-black mb-5 rounded p-2 shadow-md"
            onClick={pass}
          >
            Log In
          </Button>

          <button
            onClick={pass}
            className=" font-bold text-blue-800 text-lg mb-5 bg-white rounded p-2 shadow-md"
          >
            Admin mode
          </button>
        </div>
      </Form>
    </div>
  )
}

export default App
