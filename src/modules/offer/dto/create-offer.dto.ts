import type { Types } from 'mongoose';

import type { Amenity } from '../../../types/amenity.type.js';
import type { City } from '../../../types/city.type.js';
import type { HousingType } from '../../../types/housing-type.type.js';
import type { Location } from '../../../types/location.type.js';

export type CreateOfferDto = {
  title: string;
  description: string;

  publicationDate: Date;

  city: City;

  previewImage: string;
  images: string[];

  isPremium: boolean;
  isFavorite: boolean;

  housingType: HousingType;

  roomCount: number;
  guestCount: number;

  rentPrice: number;

  amenities: Amenity[];

  author: Types.ObjectId;

  location: Location;
};
