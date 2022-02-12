import AuthForm from '../components/auth/auth-form';
import { useSession } from 'next-auth/react'

function AuthPage() {
  const { data, status } = useSession()
  if(status === 'loading') {
    return <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Loading..</p>
  }
  if (status === 'authenticated') {
    return <p style={{ textAlign: 'center', fontWeight: 'bold' }}>You are already logged in.</p>
  }
  return <AuthForm />;
}

export default AuthPage;
