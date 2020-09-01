import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Table from "react-bootstrap/Table"
import Container from "react-bootstrap/Container"
import Axios from "axios"
import AddQForm from "./AddQForm"
import { BrowserRouter as Router, Link } from "react-router-dom"
import "react-sticky-header/styles.css"
import StickyHeader from "react-sticky-header"

function AddQ() {
  const [question, setQuestion] = useState([])
  const [options, setOptions] = useState([])

  const handleEdit = (e) => {
    Axios.get(`http://localhost:3004/QuizzData/${e}`).then((data) => {
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

  let MyHeader = () => (
    <StickyHeader
      // This is the sticky part of the header.
      header={<AddQForm></AddQForm>}
    ></StickyHeader>
  )

  return (
    <div>
      <div>{MyHeader()}</div>
      <div className="form">
        <Table
          className=" bg-blue-500 text-center  font-semibold"
          bordered
          size
        >
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
                    className="bg-red-500 rounded text-black p-1 shadow-md"
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-white rounded text-black p-1 ml-2 shadow-md"
                    onClick={() => handleEdit(data.id)}
                  >
                    {" "}
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Link to="/">
        <button className="bg-white text-blue font-bold rounded p-2 mb-10 shadow-md">
          Exit Admin Mode
        </button>
      </Link>
    </div>
  )
}

export default AddQ
