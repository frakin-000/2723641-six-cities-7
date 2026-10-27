import type {Amenity} from '../types/amenity.type.js';
import type {CityName} from '../types/city.type.js';
import type {HousingType} from '../types/housing-type.type.js';
import type {Offer} from '../types/offer.type.js';
import type {UserType} from '../types/user.type.js';

import {CITY_LOCATIONS} from './city.constant.js';

export type OfferInput = Omit<Offer, 'commentCount'>;

export function parseOffer(line: string): OfferInput {
  const [
    title,
    description,
    publicationDate,
    city,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    housingType,
    roomCount,
    guestCount,
    rentPrice,
    amenities,
    authorName,
    authorEmail,
    authorAvatar,
    authorPassword,
    authorType,
    latitude,
    longitude
  ] = line.split('\t');

  const cityName = city as CityName;

  return {
    title,
    description,
    publicationDate: new Date(publicationDate),

    city: {
      name: cityName,
      location: CITY_LOCATIONS[cityName]
    },

    previewImage,

    images: images.split(';'),

    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',

    rating: Number(rating),

    housingType: housingType as HousingType,

    roomCount: Number(roomCount),
    guestCount: Number(guestCount),

    rentPrice: Number(rentPrice),

    amenities: amenities.split(';') as Amenity[],

    author: {
      name: authorName,
      email: authorEmail,
      avatar: authorAvatar || undefined,
      password: authorPassword,
      type: authorType as UserType
    },

    location: {
      latitude: Number(latitude),
      longitude: Number(longitude)
    }
  };
}