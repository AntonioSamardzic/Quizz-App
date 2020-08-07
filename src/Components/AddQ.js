import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Table from "react-bootstrap/Table"
import Container from "react-bootstrap/Container"
import Axios from "axios"
import AddQForm from "./AddQForm"
import { BrowserRouter as Router, Link } from "react-router-dom"

function AddQ() {
  const [question, setQuestion] = useState([])
  const [options, setOptions] = useState([])

  const handleEdit = (e) => {
    Axios.get(`http://localhost:3004/QuizzApp/${e}`).then((data) => {
      console.log(data)
    })
  }

  useEffect(() => {
    fetch("http://localhost:3004/QuizzData")
      .then((response) => response.json())
      .then((data) => setQuestion(data))
  }, [])

  const handleDelete = (e) => {
    Axios.delete(`http://localhost:3004/QuizzData/${e}`).then((res) => {
      console.log(res.data)
      window.location.reload()
    })
  }

  return (
    <div>
      <AddQForm className="form"></AddQForm>
      <Container className="adminTable" fluid>
        <Table className="bg-blue-500 text-center  font-semibold" bordered size>
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Options</th>
              <th>Correct Answer</th>
            </tr>
          </thead>
          <tbody>
            {question.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td dangerouslySetInnerHTML={{ __html: data.question }}></td>
                <td dangerouslySetInnerHTML={{ __html: data.options }}></td>
                <td dangerouslySetInnerHTML={{ __html: data.answer }}></td>
                <td>
                  <button
                    className="bg-white rounded text-black p-1 shadow-md"
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </button>
                  <button onClick={() => handleEdit(data.id)}> Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Link to="/">
          <button className="bg-white text-blue font-bold rounded p-2 shadow-md">
            Exit Admin Mode
          </button>
        </Link>
      </Container>
    </div>
  )
}

export default AddQ
