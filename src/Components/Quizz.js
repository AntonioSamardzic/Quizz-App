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
  const [score, setScore] = useState({
    score: 0,
  })

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

  // const Count = () => {
  //   if (questions.options === questions.answer) {
  //     setScore(score + 1)
  //   }
  // }

  const shuffledQuestions = [questions.question].sort(() => Math.random() - 0.5)
  const shuffledAnswer = [questions.answer, ...options].sort(
    () => Math.random() - 0.5
  )
  let x = JSON.parse(localStorage.getItem("curr"))[0]
  x = x.email
  let Score = score.score

  // const [send, setSend] = useState({
  //   email: x,
  //   Score: score.score,
  // })

  const id = () => {
    let x = JSON.parse(localStorage.getItem("curr"))[0]
    x = x.email

    let s = score.score
    const newCurrent = current + 1

    setCurrent(newCurrent)
    Axios.get(`http://localhost:3004/QuizzData/${newCurrent}`).then((res) => {
      setQuestions(res.data)
      setOptions(res.data.options)
    }, [])

    if (newCurrent >= 10) {
      setGameEnded(true)
      Axios.post(`http://localhost:3004/count`, { x, s }).then((data) => {
        console.log(data)
      })
    }

    console.log(score.score)
  }

  const reload = () => {
    window.location.reload()
  }

  return gameEnded ? (
    <div className="gameEnded">
      <h1 className="bg-blue-800 text-white p-10 rounded-lg shadow-md">
        your score was {score.score} out of {current}
      </h1>

      <button onClick={reload} className="reload">
        Play Again
      </button>

      <Link className="" to="/start">
        <button className="exitQ">Exit Quizz</button>
      </Link>
    </div>
  ) : (
    <div className="quiz">
      <h2 className="quizh2">Your Quizz Has Started, Good Luck!</h2>
      <div className="questions">
        <h2
          className="questionWords"
          dangerouslySetInnerHTML={{ __html: shuffledQuestions }}
        />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        {shuffledAnswer.map((shuffledAnswer, index) => (
          <button
            onMouseUp={id}
            onMouseDown={() => {
              shuffledAnswer === questions.answer
                ? setScore((prevState) => ({ score: prevState.score + 1 }))
                : console.log("krivi")
            }}
            key={index}
            className={"options"}
            // className={
            //   questions.answer === shuffledAnswer
            //     ? "bg-purple-300 text-white p-4 font-semibold rounded shadow"
            //     : "bg-blue-700 text-white p-4 font-semibold rounded shadow"
            // }
            dangerouslySetInnerHTML={{ __html: shuffledAnswer }}
          ></button>
        ))}
        <Link
          className="bg-red-300 rounded text-center text-red-700 p-2 shadow-md"
          to="/start"
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
  )
}

export default Quizz
