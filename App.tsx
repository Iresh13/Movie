import {useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet} from 'react-native';

import GenericText from './src/app/ui/text';
import {TDispatch} from './src/app/app.types';
import {APP_SCREENS} from './src/app/app.screens';
import {movieSlice} from './src/redux/redux.reducer';

import {fetchAPIResponse} from './src/helpers/app.helper';
import {CustomNavigation} from './src/helpers/navigation.helper';

const App = () => {
  const dispatch: TDispatch = useDispatch();

  useEffect(() => {
    searchMovies();

    setTimeout(() => {
      CustomNavigation.setRoot(APP_SCREENS.MOVIES);
    }, 300);
  }, []);

  const searchMovies = async () => {
    const query = `query {
      person(id: 500) {
      name
      birthday
      cast{
        id
        title
        vote_average 
        release_date
        popularity
        runtime
        poster_path
      }    
  }
}`;

    const {data} = await fetchAPIResponse(query);

    if (data) {
      dispatch(movieSlice.actions.saveMovies(data.person.cast));
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <Image style={styles.image} source={{uri: 'icon'}} />
      <GenericText text="Movie" variation="regular" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {height: 100, width: 100, marginBottom: 10},
});

export default App;
