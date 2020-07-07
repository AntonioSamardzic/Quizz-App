import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { Link } from "react-router-dom"
import Axios from "axios"

function Quizz() {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [options, setOptions] = useState([])
  const [score, setScore] = useState(0)
  const [gameEnded, setGameEnded] = useState(false)

  useEffect(() => {
    Axios.get(`http://localhost:3004/QuizzData/${current}`).then((res) => {
      setQuestions(res.data)
    })
  }, [])

  useEffect(() => {
    Axios.get(`http://localhost:3004/QuizzData/${current}`).then((res) => {
      setOptions(res.data.options)
    })
  }, [])

  // const id = () => {
  //   if (current === 1) {
  //     setCurrent(current + 1)
  //   } else {
  //     setCurrent(current + 1)
  //     Axios.get(`http://localhost:3004/QuizzData/${current}`).then((res) => {
  //       setQuestions(res.data)
  //       setOptions(res.data.options)
  //     })
  //   }
  //   console.log(current)
  // }

  const id = (option) => {
    const newCurrent = current + 1

    setCurrent(newCurrent)
    Axios.get(`http://localhost:3004/QuizzData/${newCurrent}`).then((res) => {
      setQuestions(res.data)
      setOptions(res.data.options)
    })

    if (questions.answer === option) {
      setScore(score + 1)
    }

    if (newCurrent >= 10) {
      setGameEnded(true)
    }
    console.log(newCurrent)
    console.log(score)
  }

  return gameEnded ? (
    <h1 className="bg-blue-800 text-white p-10 rounded-lg shadow-md">
      your score was {score} out of {current}
    </h1>
  ) : (
    <div className="container">
      <h2 className="mb-10 text-center text-white">
        Your Quizz Has Started, Good Luck!
      </h2>
      <div className="bg-blue-800 text-white p-10 rounded-lg shadow-md">
        <h2
          className="text-2xl text-center"
          dangerouslySetInnerHTML={{ __html: questions.question }}
        />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        {options.map((option, index) => (
          <button
            onClick={id}
            key={index}
            className={
              questions.answer === option
                ? "bg-purple-300 text-white p-4 font-semibold rounded shadow"
                : "bg-blue-700 text-white p-4 font-semibold rounded shadow"
            }
            dangerouslySetInnerHTML={{ __html: option }}
          ></button>
        ))}
        <Link
          className="bg-red-300 rounded text-center text-red-700 p-2 shadow-md"
          to="/"
        >
          <button className="font-bold">Exit Quizz</button>
        </Link>

        <button
          onClick={id}
          className="bg-white text-blue-700 font-semibold rounded p-2 shadow-md"
        >
          Next Question
        </button>
      </div>
    </div>

    // <div className="App">
    //   <Modal.Dialog>
    //     <Modal.Header>
    //       <Modal.Title>{questions.question}</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       {options.map((option, index) => (
    //         <p key={index} className="ui floating message">
    //           {option}
    //         </p>
    //       ))}
    //     </Modal.Body>

    //     <Modal.Footer>
    //       <Link to="/">
    //         <Button variant="secondary">Exit</Button>
    //       </Link>

    //       <Button onClick={id} variant="primary">
    //         Next Question
    //       </Button>
    //       <Link to="/finish">
    //         <Button variant="primary">Finish</Button>
    //       </Link>
    //     </Modal.Footer>
    //   </Modal.Dialog>
    // </div>
  )
}

export default Quizz
