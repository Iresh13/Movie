import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View, FlatList, StyleSheet, SafeAreaView} from 'react-native';

import GenericText from '../../app/ui/text';
import {COLORS} from '../../app/themes/color';
import {STYLES} from '../../app/themes/styles';
import GenericButton from '../../app/ui/button';
import GenericToolbar from '../../app/ui/toolbar';
import {APP_SCREENS} from '../../app/app.screens';
import {IMovies, IRootState} from '../../app/app.types';

import MoviesComponent from '../components/movie-poster';
import {CustomNavigation} from '../../helpers/navigation.helper';

interface IProps {
  componentId: string;
}

const Movies = ({componentId}: IProps) => {
  const {movies} = useSelector((state: IRootState) => state);

  const [movieList, setMovieList] = useState<IMovies[]>();

  return (
    <SafeAreaView style={styles.main}>
      <GenericToolbar />
      <FlatList
        data={movies}
        numColumns={2}
        ListEmptyComponent={
          <GenericText text="No movies found" variation="bold" />
        }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => (Math.random() + index).toString()}
        renderItem={({item}: {item: IMovies}) => {
          return (
            <View>
              <MoviesComponent movie={item} componentId={componentId} />
            </View>
          );
        }}
      />

      <GenericButton
        variation="fab"
        onButtonPressed={() =>
          CustomNavigation.showModal(APP_SCREENS.SEARCH_MOVIE)
        }
        style={styles.fabButton}>
        <AntDesign name="search1" size={20} color={COLORS.WHITE} />
      </GenericButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingBottom: 50,
    marginHorizontal: 20,
  },
  image: {height: 100, width: 100, marginBottom: 10},
  fabButton: {
    right: 20,
    bottom: 60,
    elevation: 2,
    position: 'absolute',
    shadowColor: STYLES.SHADOW_COLOR,
    shadowOffset: STYLES.SHADOW_OFFSET,
    shadowOpacity: STYLES.SHADOW_OPACITY,
  },
});

export default Movies;
