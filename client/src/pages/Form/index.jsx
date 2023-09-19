import Login from './Login';
import Register from './Register';

export default function Form() {
  const { pathname } = window.location;

  return (
    <div className="max-w-screen-2xl m-auto pt-8 px-4">
      <div className="flex p-8 flex-col md:w-4/6 bg-white dark:bg-gray-800 m-auto rounded-lg">
        <h2 className="font-bold dark:text-gray-50 text-gray-600">
          Welcome to Socialtech, the Social Media for people tech!
        </h2>
        {pathname === '/login' && <Login />}
        {pathname === '/register' && <Register />}
      </div>
    </div>
  );
}
