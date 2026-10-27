import type {OfferInput} from '../types/offer.type.js';
import type {MockServerData} from '../types/mock-server-data.type.js';

import {CITY_LOCATIONS} from './city.constant.js';

import {
  getRandomBoolean,
  getRandomInteger,
  getRandomItem,
  getRandomItems
} from '../utils/random.js';

export class OfferGenerator {
  constructor(
    private readonly mockData: MockServerData
  ) {}

  public generate(): OfferInput {
    const cityName = getRandomItem(this.mockData.cities);
    const cityLocation = CITY_LOCATIONS[cityName];

    return {
      title: getRandomItem(this.mockData.titles),

      description:
        getRandomItem(this.mockData.descriptions),

      publicationDate: new Date(),

      city: {
        name: cityName,
        location: cityLocation
      },

      previewImage:
        getRandomItem(this.mockData.previewImages),

      images:
        getRandomItems(this.mockData.images, 6),

      isPremium: getRandomBoolean(),
      isFavorite: getRandomBoolean(),

      rating: Number(
        (Math.random() * 4 + 1).toFixed(1)
      ),

      housingType:
        getRandomItem(this.mockData.housingTypes),

      roomCount: getRandomInteger(1, 8),
      guestCount: getRandomInteger(1, 10),

      rentPrice: getRandomInteger(100, 100000),

      amenities: getRandomItems(
        this.mockData.amenities,
        getRandomInteger(1, this.mockData.amenities.length)
      ),

      author:
        getRandomItem(this.mockData.users),

      location: cityLocation
    };
  }
}