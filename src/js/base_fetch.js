import axios from 'axios';
import { API_KEY } from './api_key';

export class FetchService {
  constructor() {}

  BASE_URL = `https://app.ticketmaster.com/discovery/v2/events.json?`;

  config = {
    params: {
      apikey: API_KEY,
      classificationName: 'music',
      size: 16,
      page: 0,
    },
  };

  baseFetch = async function () {
    try {
      const response = await axios.get(this.BASE_URL, this.config);
      console.log(response);
      console.log(response.data._embedded.events);
      return response.data;
    } catch {
      error => {
        console.log(error);
      };
    }
  };
}

const fetchService = new FetchService();

fetchService.baseFetch();
