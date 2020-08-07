import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Table from "react-bootstrap/Table"
import Axios from "axios"
import { BrowserRouter as Router, Link } from "react-router-dom"
import Container from "react-bootstrap/Container"

function ScoreBoard() {
  const [user, setUser] = useState([])

  // let x = JSON.parse(localStorage.getItem("curr"))[0]
  // x = x.email

  useEffect(() => {
    fetch(`http://localhost:3004/count`)
      .then((response) => response.json())
      .then((data) => setUser(data))
  }, [])

  return (
    <Container className="mt-20" fluid>
      <Table className="bg-blue-500 text-center  font-semibold" bordered size>
        <thead>
          <tr>
            <th>ID</th>
            <th>Question</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {user.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td dangerouslySetInnerHTML={{ __html: data.x }}></td>
              <td dangerouslySetInnerHTML={{ __html: data.score }}></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/start">
        <button className="bg-white text-blue font-bold rounded p-2 shadow-md">
          Back
        </button>
      </Link>
    </Container>
  )
}

export default ScoreBoard
