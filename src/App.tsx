import { AuthenticatedApp } from 'authenticated-app'
// import { ErrorBoundary } from 'components/error-boundary'
// import { FullPageErrorFallback } from 'components/lib'
import { useAuth } from 'context/auth-context'
import { UnauthenticatedApp } from 'unauthenticated-app'
import './App.css';

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      { user ? <AuthenticatedApp /> : <UnauthenticatedApp /> }
      {/* <ErrorBoundary fallbackRender={FullPageErrorFallback}>
      </ErrorBoundary> */}
    </div>
  );
}

export default App;
