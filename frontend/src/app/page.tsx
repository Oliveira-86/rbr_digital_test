import { redirect } from 'next/navigation';

export default function Home({ children }: { children: React.ReactNode }) {
  return redirect('/dashboard');
}
