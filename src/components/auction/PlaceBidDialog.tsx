import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  PlaceBidPayload,
  PlaceBidValidator,
} from '@/lib/schema/auction.schema';
import { TAuction } from '@/types/auction.types';

import { Label } from '../ui/label';
import { usePlaceBid } from './hooks';

const PlaceBidForm = ({
  auction: { id, title, status, endingAt },
}: {
  auction: TAuction;
}) => {
  const {
    mutation: { mutateAsync, isPending },
    open,
    setOpen,
  } = usePlaceBid();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlaceBidPayload>({
    resolver: zodResolver(PlaceBidValidator),
    defaultValues: {
      amount: '',
    },
  });

  useEffect(() => reset(), [open, reset]);

  const handlePlaceBid = async (data: PlaceBidPayload) => {
    const payload = {
      id,
      amount: data.amount,
    };
    await mutateAsync(payload);
  };

  function buttonDisabled(): boolean {
    let disabled = false;

    if (status === 'CLOSED') disabled = true;
    if (new Date().toISOString() >= endingAt) disabled = true;

    return disabled;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={buttonVariants({
            variant: 'destructive',
            className: 'w-full uppercase',
          })}
          disabled={buttonDisabled()}
        >
          {status === 'OPEN' ? 'Bid Now' : 'Closed'}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Bid on &quot;{title}&quot;</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handlePlaceBid)}>
          <div className='flex items-center space-x-2'>
            <div className='grid flex-1 gap-2'>
              <Label htmlFor='amount' className='sr-only'>
                Link
              </Label>
              <Input id='amount' type='string' {...register('amount')} />
            </div>
            <Button
              isLoading={isPending}
              type='submit'
              size='sm'
              className='px-3'
            >
              Place Bid
            </Button>
          </div>
          {errors.amount && (
            <p className='ml-2 mt-2 text-xs text-red-500'>
              {' '}
              {errors.amount?.message}{' '}
            </p>
          )}
        </form>
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceBidForm;
