import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
let token = JSON.parse(localStorage.getItem('token'));
const Admin = () => {
  const [questno, setQuestion] = useState(0);
  const [quizid, setQuizid] = useState(uuidv4());
  const [questioninfo, setQuestioninfo] = useState({});
  const [quizName, setQuizName] = useState('');
  const handlQuestion = async (e) => {
    e.preventDefault();
    setQuestion(questno + 1);
    let res = await fetch('http://localhost:8000/question', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        auths: `Bearer ${token}`,
      },
      body: JSON.stringify(questioninfo),
    });
    let data = await res.json();
    console.log(data);
  };
  const questionChange = (e) => {
    setQuestioninfo({
      ...questioninfo,
      quizId: quizid,
      [e.target.name]: e.target.value,
    });
  };
  const createQuiz = async () => {
    let payload = {
      quizId: quizid,
      quizname: quizName,
    };
    let res = await fetch('http://localhost:8000/quizinfo', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        auths: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    let data = await res.json();
    if (data.message == 'quiz created') {
      console.log(data);
      alert('Quiz is created');
      setQuizid(uuidv4());
    }
  };

  useEffect(() => {
    setQuizid(uuidv4());
  }, []);

  return (
    <div className="container-fluid m-40 ">
      <p>Add New Quiz </p>
      <input
        type="text"
        placeholder="Quiez Name"
        onChange={(e) => setQuizName(e.target.value)}
      />
      <div
        style={{
          margin: 'auto',
          border: '2px dotted black',
          width: '50%',
          textAlign: 'center',
          padding: '5px',
        }}
      >
        <Form className=" justify-content-between">
          <span>Enter Question With Option And Answer </span>
          <p className="text-info">Question Added:{questno}</p>
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="qustion"
              name="question"
              onChange={(e) => questionChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="text"
              placeholder="option1"
              name="option1"
              onChange={(e) => questionChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="text"
              placeholder="option2"
              name="option2"
              onChange={(e) => questionChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="text"
              placeholder="option3"
              name="option3"
              onChange={(e) => questionChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="text"
              placeholder="option4"
              name="option4"
              onChange={(e) => questionChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="text"
              placeholder="answer ex:1/2/3/4 "
              name="answer"
              onChange={(e) => questionChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="text"
              placeholder="level 1 to 10 "
              name="level"
              onChange={(e) => questionChange(e)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            onClick={(e) => handlQuestion(e)}
          >
            Submit
          </Button>
        </Form>
      </div>
      <button
        type="button"
        className="btn btn-primary btn-md"
        onClick={createQuiz}
      >
        Create Quiz
      </button>
      <button
        type="button"
        className="btn btn-primary btn-md r-20 position-absolute m-20"
        onClick={() => localStorage.removeItem('token')}
      >
        Logout
      </button>
    </div>
  );
};

export default Admin;
