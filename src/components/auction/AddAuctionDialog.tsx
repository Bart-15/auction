import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
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
import {
  CreateAuctionPayload,
  CreateAuctionValidaton,
} from '@/lib/schema/auction.schema';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAddAuction } from './hooks';
import UploadPhoto from './UploadPhoto';

const AddAuctionDialog: FC = () => {
  const {
    mutation: { mutateAsync, isPending },
    open,
    setOpen,
  } = useAddAuction();

  const [imgLink, setImgLink] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateAuctionPayload>({
    mode: 'onChange',
    resolver: zodResolver(CreateAuctionValidaton),
    defaultValues: {
      title: '',
      image: null,
    },
  });

  useEffect(() => reset(), [open, reset]);

  async function handleCreateAuction(data: CreateAuctionPayload) {
    const payload = {
      image: imgLink,
      title: data.title,
    };

    await mutateAsync(payload);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={buttonVariants({
            variant: 'destructive',
            className: 'mb-2 text-sm uppercase',
          })}
        >
          Add Auction
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Create Auction</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleCreateAuction)}
          id='add-auction-form'
        >
          <div className='mb-2 space-x-2'>
            <div className='grid flex-1 gap-2'>
              <Label htmlFor='amount' className='sr-only'>
                Title
              </Label>
              <Input id='amount' type='string' {...register('title')} />
            </div>
            {errors.title && (
              <p className='mt-2 text-xs text-red-500'>
                {' '}
                {errors.title?.message}{' '}
              </p>
            )}
          </div>
          <UploadPhoto
            register={register}
            setImgLink={setImgLink}
            setValue={setValue}
          />
          {errors.image && (
            <p className='ml-3 text-xs text-red-500'>
              {' '}
              {errors.image?.message as string}{' '}
            </p>
          )}
        </form>
        <DialogFooter className='gap-2 sm:justify-start'>
          <Button isLoading={isPending} form='add-auction-form' type='submit'>
            Submit
          </Button>
          <DialogClose asChild className='order-first sm:order-last'>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAuctionDialog;
