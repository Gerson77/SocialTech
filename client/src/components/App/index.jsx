import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar';
import HomePage from '../../pages/HomePage';
import Form from '../../pages/Form';
import Profile from '../../pages/Profile';
import { setMode } from '../../state/slices/auth';
import Chat from '../Content/Chat';

function App() {
  const dispatch = useDispatch();
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  const mode = useSelector((state) => state.auth.mode);

  function toggleTheme() {
    dispatch(setMode());
  }

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    }
    if (mode === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <div className="bg-gray-200 dark:bg-gray-950 min-h-screen relative overflow-y-auto">
      {isAuth ? (
        <Navbar theme={mode} toggleTheme={toggleTheme} isAth={isAuth} />
      ) : (
        <Navbar theme={mode} toggleTheme={toggleTheme} isAth={isAuth} />
      )}
      <Routes>
        <Route path="/login" element={<Form />} />
        <Route path="/register" element={<Form />} />
        <Route
          path="/"
          element={isAuth ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:idProfile"
          element={isAuth ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/post/:idPost"
          element={isAuth ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/messages"
          element={isAuth ? <Chat /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
