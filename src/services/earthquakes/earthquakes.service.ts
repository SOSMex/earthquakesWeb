'use server';

import { BASE_URL } from '@/config';

export async function getEarthquakesData(limit: number = 10, page: number = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/earthquakes/latest?key=${process.env.SELF_SECRET}&limit=${limit}&page=${page}`,
    );
    const data = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {};
  }
}

export async function getEarthquakeDetail(id: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/earthquakes/detail?key=${process.env.SELF_SECRET}&id=${id}`,
    );
    const data = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {};
  }
}
