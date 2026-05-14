import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const nextUser = await login(email, password);
      toast.success('Logged in successfully');
      navigate(nextUser.role === 'consumer' ? '/consumer' : '/farmer');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-md">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Welcome back</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Login to CropChain</h1>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" loading={loading} className="w-full">Login</Button>
        </form>
        <p className="mt-6 text-sm text-slate-400">
          New here? <Link to="/register" className="text-brand-300">Create an account</Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
