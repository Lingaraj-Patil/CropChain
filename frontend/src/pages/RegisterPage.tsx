import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import { useAuthContext } from '../context/AuthContext';

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'farmer',
    walletAddress: '',
    farmName: '',
    location: '',
    phone: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuthContext();
  const navigate = useNavigate();

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (form.name.trim().length < 2) {
      toast.error('Please enter your full name');
      return;
    }

    if (!isValidEmail(form.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      await register({
        ...form,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        walletAddress: form.walletAddress.trim(),
        farmName: form.farmName.trim(),
        location: form.location.trim(),
        phone: form.phone.trim(),
        bio: form.bio.trim(),
      });
      toast.success('Account created successfully');
      navigate(form.role === 'consumer' ? '/consumer' : '/farmer');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[80vh] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
      <div className="max-w-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Join the network</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Create your CropChain account</h1>
        <p className="mt-4 text-slate-300">Farmers can mint crop NFTs and track their lifecycle. Consumers can verify authenticity instantly.</p>
      </div>
      <Card>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <Input placeholder="Full name" value={form.name} onChange={(e) => update('name', e.target.value)} />
          <Select value={form.role} onChange={(e) => update('role', e.target.value)}>
            <option value="farmer">Farmer</option>
            <option value="consumer">Consumer</option>
          </Select>
          <Input placeholder="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
          <Input placeholder="Password" type="password" value={form.password} onChange={(e) => update('password', e.target.value)} />
          <Input placeholder="Wallet address (optional)" value={form.walletAddress} onChange={(e) => update('walletAddress', e.target.value)} />
          <Input placeholder="Phone (optional)" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          <Input placeholder="Farm name (optional)" value={form.farmName} onChange={(e) => update('farmName', e.target.value)} />
          <Input placeholder="Location (optional)" value={form.location} onChange={(e) => update('location', e.target.value)} />
          <Textarea placeholder="Bio (optional)" className="md:col-span-2" value={form.bio} onChange={(e) => update('bio', e.target.value)} />
          <Button type="submit" loading={loading} className="md:col-span-2">Create account</Button>
        </form>
        <p className="mt-6 text-sm text-slate-400">Already have an account? <Link to="/login" className="text-brand-300">Login</Link></p>
      </Card>
    </div>
  );
};

export default RegisterPage;
