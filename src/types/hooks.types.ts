import { PlaceBidPayload } from '@/lib/schema/auction.schema';

export type TUseCountDownResult = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type TNewPlaceBidPayload = PlaceBidPayload & {
  id: string;
  image: string;
  amount: number;
};
