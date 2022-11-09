import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const Quiz = () => {
  let { id } = useParams();
  const [start, setStart] = useState(false);
  const [quizinfo, setQuizinfo] = useState({});
  const [ques, setQues] = useState([]);
  const [curQuestion, setCurQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const getQuestion = async (val) => {
    let res = await fetch(`http://localhost:8000/questions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(val),
    });
    let data = await res.json();
    console.log(data);
    if (data.message === 'got question') {
      setQues(data.result);
    }
  };
  const getQuizinfo = async () => {
    let res = await fetch(`http://localhost:8000/quiz`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        quizs: `Bearer ${id}`,
      },
    });
    let val = await res.json();
    console.log(val);
    if (val.message == 'got quiz') {
      setQuizinfo(val.data);
      getQuestion({ userId: val.data.userId, quizId: val.data.quizId });
    }
  };

  /////////option

  const handleOption = (val) => {
    if (curQuestion == ques.length - 1) {
      setShowScore(true);
    } else if (ques[curQuestion].answer == val) {
      setScore(score + 1);
      setCurQuestion(curQuestion + 1);
    } else {
      setCurQuestion(curQuestion + 1);
    }
  };
  const Restart = () => {
    setCurQuestion(0);
    setShowScore(false);
    setScore(0);
  };
  useEffect(() => {
    getQuizinfo();
  }, []);

  return (
    <div
      className="container  d-flex justify-content-center"
      style={{ marginTop: '50px' }}
    >
      <button
        style={{ display: `${start ? 'none' : 'block'}` }}
        onClick={() => setStart(true)}
      >
        button
      </button>
      {start ? (
        <div>
          {showScore ? (
            <div>
              <p>{`Your Score Is ${score}/${ques.length}`}</p>
              <button onClick={Restart}>restart</button>
            </div>
          ) : (
            <div>
              <h3>QNo{`${curQuestion + 1}:` + ques[curQuestion].question}</h3>
              <div className="d-flex flex-column ">
                <button
                  className="btn btn-outline-dark btn-block"
                  onClick={() => handleOption(1)}
                >
                  {ques[curQuestion].option1}
                </button>
                <button
                  className="btn btn-outline-dark btn-block"
                  onClick={() => handleOption(2)}
                >
                  {ques[curQuestion].option2}
                </button>
                <button
                  className="btn btn-outline-dark btn-block"
                  onClick={() => handleOption(3)}
                >
                  {ques[curQuestion].option3}
                </button>
                <button
                  className="btn btn-outline-dark btn-block"
                  onClick={() => handleOption(4)}
                >
                  {ques[curQuestion].option4}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        'start quiz'
      )}
    </div>
  );
};

export default Quiz;
