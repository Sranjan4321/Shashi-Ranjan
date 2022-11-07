import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const Quiz = () => {
  let { token, questid } = useParams();
  const getquestion = async () => {
    let res = await fetch(`http://localhost:8000/question`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        auths: `Bearer ${token}`,
        questid: `${questid}`,
      },
    });
    let data = await res.json();
    console.log(data);
  };
  useEffect(() => {});
  return <div>this is testing</div>;
};

export default Quiz;
