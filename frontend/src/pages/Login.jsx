import { useAuth } from '../components/AuthContext.jsx';
import '../App.css';

export default function Login() {
  const { loginWithGoogle } = useAuth();
  return (
    <div>
      <h1>Welcome to Purrsuit</h1>
      <button onClick={loginWithGoogle}>Sign in with Google</button>
    </div>
  );
}