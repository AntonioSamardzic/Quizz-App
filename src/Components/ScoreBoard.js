import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Table from "react-bootstrap/Table"
import Axios from "axios"
import { BrowserRouter as Router, Link } from "react-router-dom"

function ScoreBoard() {
  const [user, setUser] = useState([])
  const [score, setScore] = useState(0)

  let x = JSON.parse(localStorage.getItem("curr"))[0]
  x = x.email

  useEffect(() => {
    fetch(`http://localhost:3004/bruno@gmail.com`)
      .then((response) => response.json())
      .then((data) => setUser(data))
  }, [])

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>antonio@gmail.com</td>
            <td>{user.score}</td>
          </tr>
          <tr>
            <td>bruno@gmail.com</td>
            <td>{user.score}</td>
          </tr>
        </tbody>
      </Table>
      <Link to="/start">
        <button className="bg-white text-blue font-bold rounded p-2 shadow-md">
          Back
        </button>
      </Link>
    </div>
  )
}

export default ScoreBoard
