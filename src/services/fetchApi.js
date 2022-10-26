import axios from 'axios';

const PER_PAGE = 12;
const KEY = '29900073-a785e0856aaf71ac0f5f90a4d';
const DEFAULT_MAX_PAGE = 41;

const baseRequest = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: PER_PAGE,
  },
});

export class FetchApi {
  static maxPage = null;

  static async fetchImages(page, query) {
    if (!query) {
      return;
    }
    const config = {
      params: {
        page: page,
        q: query,
      },
    };

    const searchResult = await baseRequest.get('', config);
    const response = searchResult.data.hits;

    const totalResults = searchResult.data.totalHits;
    const maxHitsPages = Math.ceil(totalResults / PER_PAGE);
    FetchApi.maxPage =
      maxHitsPages < DEFAULT_MAX_PAGE ? maxHitsPages : DEFAULT_MAX_PAGE;

    if (!response.length) {
      throw new Error('Oops, no hits found!');
    }

    return response;
  }
}
