import axios from 'axios';
import { API_KEY } from './api_key';

const config = {
  params: {
    apikey: API_KEY,
    classificationName: 'music',
    size: 16,
    page: 0,
    name: newName,
  },
};

async function baseFetch() {
  try {
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?`,
      config
    );
    console.log(response.data._embedded.events);
  } catch {
    error => {
      console.log(error);
    };
  }
}

baseFetch();
