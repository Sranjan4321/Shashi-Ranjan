import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import { Route, Routes } from 'react-router';
import AdminPage from './Pages/AdminPage';
import CreateQuizLink from './Pages/CreateQuizLink';
import Quiz from './Pages/quiz/Quiz';
const token = JSON.parse(localStorage.getItem('token'));
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/adminpage" element={token ? <AdminPage /> : <Login />} />
        <Route
          path="/adminpage/admin"
          element={token ? <Admin /> : <Login />}
        />
        <Route
          path="/adminpage/createlink"
          element={token ? <CreateQuizLink /> : <Login />}
        />
        <Route path="/quiz/:id/:userid" element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;
