export type TAuction = {
  id: string;
  title: string;
  status: string;
  seller: 'OPEN' | 'CLOSED';
  image?: string;
  endingAt: string;
  highestBid: {
    bidder?: string;
    amount: number;
  };
};

export type TAuctionPlayload = {
  image: string;
  title: string;
};

export type TImagePayload = {
  file: string;
};
