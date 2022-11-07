import React from 'react';
import { useNavigate } from 'react-router';

const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <button onClick={() => navigate('/adminpage/admin')}>Create Quiz</button>
      <button onClick={() => navigate('/adminpage/createlink')}>
        Create Link
      </button>
    </div>
  );
};

export default AdminPage;
