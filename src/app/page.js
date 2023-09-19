'use client';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

export default function Welcome() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (user.length > 2) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [user]);

  useEffect(() => {
    const getUserName = sessionStorage.getItem('nameUser');

    if (getUserName) {
      router.push('/nav/Game');
    }
  }, []);

  const handleLogin = e => {
    e.preventDefault();
    sessionStorage.setItem('nameUser', user);
    router.push('/nav/Game');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="max-w-md space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Modyo Games
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div>
            <input
              maxLength={8}
              placeholder="PIN de juego"
              id="alias"
              type="text"
              className="mt-1 p-3 rounded-md border border-gray-300 w-full"
              onChange={e => setUser(e.target.value)}
              value={user}
              required
            />
          </div>
          <div>
            <button
              disabled={disableButton}
              onClick={event => handleLogin(event)}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-950 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
