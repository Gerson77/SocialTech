import { Loader2 } from 'lucide-react';

export default function Spinner() {
  return (
    <div className="w-full flex items-center justify-center relative text-sky-400">
      <Loader2 className="animate-spin h-5 w-5 absolute" />
      <Loader2 className="animate-spin-reverse h-8 w-8" />
    </div>
  );
}
