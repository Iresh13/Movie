import {Reducer} from 'react';
import {store} from '../redux/redux.store';

export type TReducers = Reducer<unknown, any>;

export interface IReducer {
  type: string;
  [key: string]: any;
}

export type TDispatch = typeof store.dispatch;

export interface IStyles {
  [key: string]: any;
}

export interface IMovies {
  id: string;
  title: string;
  runtime: string;
  popularity: string;
  poster_path: string;
  vote_average: string;
  release_date: string;
}

export interface IRootState {
  movies: IMovies[];
}

export interface IMovieDetails {
  id: string;
  title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  vote_average: string;
  release_date: string;
  original_title: string;
  reviews: [
    {
      content: string;
      id: string;
      created_at: string;
      author_details: {
        username: string;
      };
    },
  ];
  production_companies: [
    {
      id: string;
      name: string;
      logo_path: string;
      origin_country: string;
    },
  ];
  credits: {
    id: string;
  };
}

export const DEFAULT_MOVIE = {
  id: '',
  title: '',
  overview: '',
  popularity: '',
  poster_path: '',
  vote_average: '',
  release_date: '',
  original_title: '',
  reviews: [
    {
      content: '',
      id: '',
      created_at: '',
      author_details: {
        username: '',
      },
    },
  ],
  production_companies: [
    {
      id: '',
      name: '',
      logo_path: '',
      origin_country: '',
    },
  ],
  credits: [
    {
      id: '',
    },
  ],
};

export interface IYears {
  id: number;
  title: string;
  isSelected: boolean;
}

export interface IRatings {
  id: number;
  title: string;
  isSelected: boolean;
}
