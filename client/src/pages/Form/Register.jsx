/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Dropzone from 'react-dropzone';
import { Camera } from 'lucide-react';
import isEmailValid from '../../utils/isEmailValid';
import UserService from '../../services/UserService';
import useErrors from '../../hooks/useErros';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [picturePath, setPicturePath] = useState('');
  const [isLoading, setIstLoading] = useState(false);

  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  const isFormValid = firstName
    && errors.length === 0
    && lastName
    && errors.length === 0
    && email
    && errors.length === 0
    && password
    && errors.length === 0;

  function handleFirstChange(event) {
    setFirstName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'firstname', message: 'Nome é obrigatório' });
    } else {
      removeError('firstname');
    }
  }
  function handleLastChange(event) {
    setLastName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'lastname', message: 'Sobrenome é obrigatório' });
    } else {
      removeError('lastname');
    }
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'Email inválido' });
    } else {
      removeError('email');
    }
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'password', message: 'Nome é obrigatório' });
    } else {
      removeError('password');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const user = {
      firstName,
      lastName,
      location,
      occupation,
      picturePath,
      email,
      password,
    };

    try {
      setIstLoading(true);
      const savedUserResponse = await UserService.register(user);

      setTimeout(() => {
        if (savedUserResponse) {
          navigate('/login');
        }
      }, 2000);
    } catch {
    } finally {
      setIstLoading(false);
      navigate('/login');
    }
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Preview image */}
        <div className="border-gray-100 dark:border-gray-700 my-6 p-4 border-[1px] rounded-md w-full lg:w-2/5 h-auto">
          <div className="flex items-center justify-center hover:cursor-pointer dark:text-gray-800 text-gray-50 border-dashed border-[2px] border-sky-500 h-full p-4">
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setPicturePath(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {!picturePath ? (
                    <div className="w-52 p-2 h-52 border-[1px] rounded-full bg-gray-200 dark:bg-gray-700 justify-center flex items-center">
                      <Camera className="w-32 h-32 text-white" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-[300px]">
                      <img
                        src={URL.createObjectURL(picturePath)}
                        alt=""
                        className="w-full md:w-10/12 h-72"
                      />
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
        </div>
        {/* Inputs */}
        <div className="w-full lg:w-7/12 h-full justify-between flex flex-col">
          <Input
            type="text"
            name="firstname"
            value={firstName}
            onChange={handleFirstChange}
            placeholder="First Name"
            error={getErrorMessageByFieldName('firstname')}
          />
          <Input
            type="text"
            name="lastname"
            value={lastName}
            onChange={handleLastChange}
            placeholder="Last Name"
            error={getErrorMessageByFieldName('lastname')}
          />
          <Input
            type="text"
            name="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Loacation"
          />
          <Input
            type="text"
            name="occupation"
            value={occupation}
            onChange={(event) => setOccupation(event.target.value)}
            placeholder="Occupation"
          />
        </div>
      </div>

      <Input
        type="email"
        name="email"
        placeholder="Email..."
        value={email}
        onChange={handleEmailChange}
        error={getErrorMessageByFieldName('email')}
      />
      <Input
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
        error={getErrorMessageByFieldName('password')}
      />
      <button
        disabled={!isFormValid}
        type="submit"
        className={`${
          !isFormValid
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-sky-500 hover:bg-sky-600'
        } font-bold h-16  transition-all text-lg text-gray-50 py-4 rounded-md`}
      >
        {!isLoading ? <p>Register</p> : <Spinner />}
      </button>
      <Link className="py-4 text-sky-500 underline" to="/login">
        Already have an account? Login here.
      </Link>
    </form>
  );
}
