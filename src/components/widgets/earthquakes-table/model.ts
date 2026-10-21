export interface EarthquakeProps {
  id: string;
  magnitude: number;
  town: string;
  state: String;
  lat: number;
  lng: number;
  depth?: string;
  date: string;
  time: string;
  details: string;
  isoDate: string;
}
