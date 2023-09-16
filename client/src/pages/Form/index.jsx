import Login from './Login';
import Register from './Register';

export default function Form() {
  const { pathname } = window.location;

  return (
    <div className="w-[1600px] m-auto pt-8">
      <div className="flex  p-8 flex-col w-[1024px] bg-white dark:bg-gray-800 m-auto rounded-lg">
        <h2 className="font-bold dark:text-gray-50 text-gray-600">
          Welcome to Socialtech, the Social Media for people tech!
        </h2>
        {pathname === '/login' && <Login />}
        {pathname === '/register' && <Register />}
      </div>
    </div>
  );
}
