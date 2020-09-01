import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import axios from "axios"
import Table from "react-bootstrap/Table"

function AddQForm() {
  const [data, setData] = useState({
    question: "",
    options: [],
    answer: "",
  })

  const postData = () => {
    axios.post("http://localhost:3004/QuizzData", data).then((data) => {
      console.log(data)
      window.location.reload()
    })
  }

  return (
    <Form className="forma mt-0">
      <Form.Row>
        <Col>
          <Form.Control
            className="shadow-md"
            placeholder="ID"
            value={data.id}
            onChange={(e) => setData({ ...data, id: e.target.value })}
          />
        </Col>
        <Col>
          <Form.Control
            className="shadow-md"
            placeholder="Question"
            value={data.question}
            onChange={(e) => setData({ ...data, question: e.target.value })}
          />
        </Col>
        <Col>
          <Form.Control
            className="shadow-md"
            placeholder="Options"
            value={data.options}
            onChange={(e) =>
              setData({ ...data, options: e.target.value.split(",") })
            }
          />
        </Col>
        <Col>
          <Form.Control
            className="shadow-md"
            placeholder="Correct Answer"
            value={data.answer}
            onChange={(e) => setData({ ...data, answer: e.target.value })}
          />
        </Col>
      </Form.Row>
      <button
        disabled={(!data.question, !data.options)}
        className="mt-2   mb-2 bg-green-500 rounded p-2 text-black shadow-md "
        onClick={postData}
      >
        Add Question
      </button>
    </Form>
  )
}

export default AddQForm
