import React, { useEffect } from 'react';
import { useState } from 'react';
let token = JSON.parse(localStorage.getItem('token'));
const CreateQuizLink = () => {
  const [quiz, setQuiz] = useState([]);
  const [data, setData] = useState({});
  const [quizlink, setQuizlink] = useState('');
  const [show, setShow] = useState(false);
  const findQuizinfo = async () => {
    let res = await fetch('http://localhost:8000/quizinfo', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        auths: `Bearer ${token}`,
      },
    });
    let data = await res.json();

    if (data.message == 'got quiz') setQuiz(data.result);
    // console.log(data);
  };
  const handleQuiz = (e) => {
    for (let i = 0; i < quiz.length; i++) {
      if (quiz[i].quizId == e.target.value) {
        setData(quiz[i]);
      }
    }
  };
  const createlink = async () => {
    let res = await fetch('http://localhost:8000/createlink', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let val = await res.json();
    console.log(val);
    if (val.message == 'token created') {
      console.log(val);
      setQuizlink(`http://localhost:3000/quiz/${val.token}`);
      setShow(true);
    }
  };
  useEffect(() => {
    findQuizinfo();
    console.log(quiz);
  }, []);

  return (
    <div>
      <span>Quiz Name</span>
      <select
        name="quiz"
        id=""
        label="quez Name"
        onChange={(e) => handleQuiz(e)}
      >
        {quiz.length !== 0 ? (
          quiz.map((el, ind) => (
            <option key={ind} value={el.quizId}>
              {el.quizname}
            </option>
          ))
        ) : (
          <option>not any quiz</option>
        )}
      </select>
      <button onClick={createlink}>Create Link</button>
      <div style={{ width: '50%' }}>
        <div
          style={{
            display: `${show ? 'block' : 'none'}`,
            width: '20%',
            wordWrap: 'normal',
          }}
        >
          {quizlink}
        </div>
      </div>
    </div>
  );
};

export default CreateQuizLink;
