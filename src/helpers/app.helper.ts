import axios from 'axios';
import moment from 'moment';

const url: string = 'https://tmdb-one-blue.vercel.app/api/graphql';

export const fetchAPIResponse = async (queryCall: string) => {
  try {
    const response = await axios.post(url, {
      query: queryCall,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getYear = (dateString: string) => {
  return moment(dateString).format('YYYY');
};
