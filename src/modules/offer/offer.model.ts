import {
  model,
  Schema
} from 'mongoose';

import type {City} from '../../types/city.type.js';
import type {Location} from '../../types/location.type.js';

import type {OfferEntity} from './offer.entity.js';

const locationSchema = new Schema<Location>(
  {
    latitude: {
      type: Number,
      required: true
    },

    longitude: {
      type: Number,
      required: true
    }
  },
  {
    _id: false
  }
);

const citySchema = new Schema<City>(
  {
    name: {
      type: String,
      required: true
    },

    location: {
      type: locationSchema,
      required: true
    }
  },
  {
    _id: false
  }
);

const offerSchema = new Schema<OfferEntity>(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    publicationDate: {
      type: Date,
      required: true
    },

    city: {
      type: citySchema,
      required: true
    },

    previewImage: {
      type: String,
      required: true
    },

    images: {
      type: [String],
      required: true
    },

    isPremium: {
      type: Boolean,
      required: true
    },

    isFavorite: {
      type: Boolean,
      required: true
    },

    rating: {
      type: Number,
      required: true
    },

    housingType: {
      type: String,
      required: true
    },

    roomCount: {
      type: Number,
      required: true
    },

    guestCount: {
      type: Number,
      required: true
    },

    rentPrice: {
      type: Number,
      required: true
    },

    amenities: {
      type: [String],
      required: true
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    commentCount: {
      type: Number,
      default: 0
    },

    location: {
      type: locationSchema,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'offers'
  }
);

export const OfferModel = model<OfferEntity>(
  'Offer',
  offerSchema
);