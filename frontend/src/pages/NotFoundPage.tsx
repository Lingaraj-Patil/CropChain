import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const NotFoundPage = () => (
  <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-4 text-center">
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-brand-300">404</p>
      <h1 className="mt-4 text-5xl font-bold text-white">Page not found</h1>
      <p className="mt-4 text-slate-300">The page you’re looking for doesn’t exist or has moved.</p>
      <div className="mt-8 flex justify-center">
        <Link to="/"><Button>Back to home</Button></Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
