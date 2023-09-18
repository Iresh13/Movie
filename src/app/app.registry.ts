import {Navigation} from 'react-native-navigation';

import App from '../../App';
import {APP_SCREENS} from './app.screens';
import {ReduxProvider} from '../redux/redux.store';

import Movies from '../movies/screens/movies-list';
import SearchMovie from '../movies/components/search';
import MovieDetail from '../movies/screens/movies-details';

export default function registerScreen() {
  Navigation.registerComponent(APP_SCREENS.APP, () => ReduxProvider(App));

  Navigation.registerComponent(
    APP_SCREENS.MOVIES,
    Navigation.registerComponent(APP_SCREENS.MOVIES, () =>
      ReduxProvider(Movies),
    ),
  );

  Navigation.registerComponent(APP_SCREENS.MOVIE_DETAIL, () =>
    ReduxProvider(MovieDetail),
  );

  Navigation.registerComponent(APP_SCREENS.SEARCH_MOVIE, () =>
    ReduxProvider(SearchMovie),
  );
}
