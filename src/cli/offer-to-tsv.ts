import type {OfferInput} from '../types/offer.type.js';

function sanitize(value: string): string {
  return value
    .replace(/\t/g, ' ')
    .replace(/\r?\n/g, ' ');
}

export function offerToTsv(
  offer: OfferInput
): string {
  return [
    sanitize(offer.title),
    sanitize(offer.description),

    offer.publicationDate.toISOString(),

    offer.city.name,

    offer.previewImage,

    offer.images.join(';'),

    String(offer.isPremium),
    String(offer.isFavorite),

    String(offer.rating),

    offer.housingType,

    String(offer.roomCount),
    String(offer.guestCount),

    String(offer.rentPrice),

    offer.amenities.join(';'),

    offer.author.name,
    offer.author.email,
    offer.author.avatar ?? '',
    offer.author.password,
    offer.author.type,

    String(offer.location.latitude),
    String(offer.location.longitude)
  ].join('\t');
}