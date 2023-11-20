import { Loader2 } from 'lucide-react';
import { useState } from 'react';

import useCountDown from '@/hooks/useCountDown';

const CountDown = ({ deadline }: { deadline: string }) => {
  const { hours, minutes, seconds } = useCountDown(deadline);
  const hour = hours === 1 || hours === 0 ? 'hour' : 'hours';

  const content = `${hours} ${hour} ${minutes} mins ${seconds} secs`;

  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1200);

  return (
    <p className='mb-2 text-sm font-semibold'>
      {loading ? <Loader2 className='h-4 w-4 animate-spin' /> : content}
    </p>
  );
};

export default CountDown;
