import {IRatings, IYears} from './app.types';

export enum EAPP_REDUCERS {
  SAVE_MOVIES = 'saveImages',
}

export const APP: Record<string, string> = {
  IOS: 'ios',
  ANDROID: 'android',
};

export const years: IYears[] = [
  {
    id: 0,
    title: '< 2017',
    isSelected: false,
  },
  {
    id: 1,
    title: '2017',
    isSelected: false,
  },
  {
    id: 2,
    title: '2018',
    isSelected: false,
  },
  {
    id: 3,
    title: '2019',
    isSelected: false,
  },
  {
    id: 4,
    title: '2020',
    isSelected: false,
  },
  {
    id: 5,
    title: '2021',
    isSelected: false,
  },
  {
    id: 6,
    title: '2022',
    isSelected: false,
  },
  {
    id: 7,
    title: '2023',
    isSelected: false,
  },
];

export const rating: IRatings[] = [
  {
    id: 0,
    title: '< 5',
    isSelected: false,
  },
  {
    id: 1,
    title: '5+',
    isSelected: false,
  },
  {
    id: 2,
    title: '6+',
    isSelected: false,
  },
  {
    id: 3,
    title: '7+',
    isSelected: false,
  },
  {
    id: 4,
    title: '8+',
    isSelected: false,
  },
  {
    id: 5,
    title: '9+',
    isSelected: false,
  },
];
