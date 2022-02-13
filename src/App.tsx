// @ts-ignore
import React from 'react';
import './App.css';
import { Father } from 'my-test';
import { useAuth } from 'context/auth-context';
import { AuthenticatedApp } from 'authenticated-app';
import { UnauthenticatedApp } from 'unauthenticated-app';

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      {/* <Father /> */}
    </div>
  );
}

export default App;
