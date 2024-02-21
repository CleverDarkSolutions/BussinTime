import {LatLngExpression} from 'leaflet';
import {UserNewApi} from '@/types/auth';

export type Event = {
  eventId: string,
  title: string,
  description: string,
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  cords: LatLngExpression,
  participants?: Array<number>,
  tags: Array<string>
  location: string,
}

export type EventNewApi = {
  id: number
  name: string,
  description: string,
  isActive: true,
  startDate: string,
  endDate: string,
  photoPath: string,
  localization: {
    id: number
    latitude: number,
    longitude: number,
    city: string,
    postalCode: string,
    address: string
  }
  eventVisibility: 'PUBLIC' | 'PRIVATE'
}

export type AverageRatingType = {
  averageScore: string | number
}

export type RatingType = {
  id: string | number,
  entityId: string | number,
  score: number,
  content: string,
  creationDate: string,
  entityType: string,
  account: UserNewApi
}
