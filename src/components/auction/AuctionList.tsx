import Image from 'next/image';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { TAuction } from '@/types/auction.types';

import { Icons } from '../Icons';
import CountDown from './CountDown';
import PlaceBidForm from './PlaceBidDialog';

type TAuctionList = {
  auctions: TAuction[];
};

function AuctionList({ auctions }: TAuctionList) {
  return (
    <div className='w-3/3 mx-auto mb-6 grid grid-cols-1 gap-8 pt-4 md:grid-cols-2 lg:grid-cols-3'>
      {auctions?.map((auction) => (
        <Card key={auction.id}>
          <CardHeader className='py-3'>
            <div className='column flex items-center gap-2'>
              <Icons.barcode className='h-4 w-4' />
              <CardTitle className='md:text-1xl text-base'>
                {auction.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className='p-0'>
            <Image
              src={auction.image as string}
              alt={auction.title}
              width='100'
              height='100'
              className='mb-2 aspect-square w-full object-cover'
            />

            <CardContent>
              <div className='flex flex-row items-center justify-between py-2'>
                <div className='flex flex-col items-center justify-center'>
                  <span className='mb-2 grow font-semibold'>
                    {!auction?.highestBid.amount
                      ? 'No Bid'
                      : `₱${auction?.highestBid.amount}`}
                  </span>
                  <p className='text-sm font-light uppercase tracking-wide'>
                    Higest Bid
                  </p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <CountDown deadline={auction.endingAt} />
                  <p className='text-sm font-light uppercase tracking-wide'>
                    Time Remaining
                  </p>
                </div>
              </div>
            </CardContent>
          </CardContent>
          <CardFooter>
            <PlaceBidForm auction={auction} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default AuctionList;
