import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Eye, EyeOff } from 'lucide-react';
import UserService from '../../services/UserService';
import { setLogin } from '../../state/slices/auth';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import BoxDialog from '../../components/Content/BoxDialog';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);

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

    try {
      const loggedIn = await UserService.login(user);

      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        }),
      );
      setLoading(false);
      navigate('/');
    } catch {
      setShowModalAlert((prevState) => !prevState);
    }
  }

  function closeBox() {
    setLoading(false);
    setShowModalAlert((prevState) => !prevState);
  }

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit}
    >
      <Input
        type="email"
        placeholder="Email"
        onChange={handleEmailChange}
        value={email}
        name="email"
      />
      <div className="relative">
        <Input
          type={!showPass ? 'password' : 'text'}
          name="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
        <button type="button" className="text-white" onClick={() => setShowPass((prevState) => !prevState)}>
          {!showPass ? (
            <EyeOff className="absolute top-10 right-2" />
          ) : (
            <Eye className="absolute top-10 right-2" />
          )}
        </button>
      </div>
      <button
        type="submit"
        disabled={!email || !password}
        className={`${!email || !password
          ? 'bg-gray-500 cursor-not-allowed'
          : 'bg-sky-500 hover:bg-sky-600'} font-bold transition-all text-lg text-gray-50 py-4 mb-4 rounded-md`}
      >
        {loading ? <Spinner /> : 'Login'}
      </button>
      <div className="flex justify-start mt-6">
        <Link className=" text-sky-500 underline" to="/register">
          Not have an account yet? Register here.
        </Link>
      </div>
      {showModalAlert && (
        <BoxDialog
          title="Tentar novamente"
          textEvent="Email ou Senha incorreto!"
          buttonEvent
          cancelAcion={closeBox}
        />
      )}
    </form>
  );
}
