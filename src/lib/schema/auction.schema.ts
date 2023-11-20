/* eslint-disable eqeqeq */
import { object, string, z } from 'zod';

export const PlaceBidValidator = object({
  amount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Expected number, received a string',
  }),
});

export type PlaceBidPayload = z.infer<typeof PlaceBidValidator>;

export const MAX_FILE_SIZE = 2000000;
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const CreateAuctionValidaton = object({
  title: string().min(1, { message: 'Title is required' }),
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 2MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
});

export type CreateAuctionPayload = z.infer<typeof CreateAuctionValidaton>;
