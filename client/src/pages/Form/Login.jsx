import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UserService from '../../services/UserService';
import { setLogin } from '../../state/slices/auth';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const user = {
      email, password,
    };

    setLoading((prevState) => !prevState);
    const loggedIn = await UserService.login(user);

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        }),
      );
      setLoading(false);
      navigate('/');
    } else {
      navigate('/login');
    }
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Email"
        onChange={handleEmailChange}
        value={email}
        name="email"
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handlePasswordChange}
        value={password}
      />
      <button
        type="submit"
        disabled={!email || !password}
        className={`${!email || !password ? 'bg-gray-500 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600'} font-bold transition-all text-lg text-gray-50 py-4 rounded-md`}
      >
        {loading ? <Spinner /> : 'Login'}
      </button>
      <Link className="py-4 text-sky-500 underline" to="/register">
        Not have an account yet? Register here.
      </Link>
    </form>
  );
}
