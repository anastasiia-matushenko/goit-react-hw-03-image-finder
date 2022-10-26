import axios from 'axios';

const baseRequest = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '29900073-a785e0856aaf71ac0f5f90a4d',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const fetchApi = async (page, query) => {
  const config = {
    params: {
      page: page,
      q: query,
    },
  };

  const searchResult = await baseRequest.get('', config);
  const response = searchResult.data.hits;
  if (!response.length) {
    throw new Error('Oops, no hits found!');
  }

  return response;
};
