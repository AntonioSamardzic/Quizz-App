import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Table from "react-bootstrap/Table"
import Axios from "axios"
import { BrowserRouter as Router, Link } from "react-router-dom"

function ScoreBoard() {
  const [user, setUser] = useState([])

  // let x = JSON.parse(localStorage.getItem("curr"))[0]
  // x = x.email

  useEffect(() => {
    fetch(`http://localhost:3004/scoreboard`)
      .then((response) => response.json())
      .then((data) => setUser(data))
    console.log(user)
  }, [])

  return (
    <div>
      <Table className="bg-blue-500 text-center  font-semibold" bordered size>
        <thead>
          <tr>
            <th>Question</th>
          </tr>
        </thead>
        <tbody>
          {user.map((data, index) => (
            <tr key={index}>
              <td>{data.x}</td>
            </tr>
          ))}
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
