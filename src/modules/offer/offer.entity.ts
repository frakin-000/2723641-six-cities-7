import type {Types} from 'mongoose';

import type {Amenity} from '../../types/amenity.type.js';
import type {City} from '../../types/city.type.js';
import type {HousingType} from '../../types/housing-type.type.js';
import type {Location} from '../../types/location.type.js';

export type OfferEntity = {
  title: string;
  description: string;
  publicationDate: Date;

  city: City;

  previewImage: string;
  images: string[];

  isPremium: boolean;
  isFavorite: boolean;

  rating: number;

  housingType: HousingType;

  roomCount: number;
  guestCount: number;

  rentPrice: number;

  amenities: Amenity[];

  author: Types.ObjectId;

  commentCount: number;

  location: Location;

  createdAt: Date;
  updatedAt: Date;
};