import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import GenericText from '../../app/ui/text';
import {IMovies} from '../../app/app.types';
import {COLORS} from '../../app/themes/color';
import {STYLES} from '../../app/themes/styles';

import {getYear} from '../../helpers/app.helper';
import {APP_SCREENS} from '../../app/app.screens';
import {CustomNavigation} from '../../helpers/navigation.helper';

interface IProps {
  movie: IMovies;
  isModal?: boolean;
  componentId: string;
}

const {width} = Dimensions.get('window');

const MoviesComponent = ({movie, componentId, isModal = false}: IProps) => {
  const imagePath: string = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const goToDetails = () => {
    CustomNavigation.push(componentId, APP_SCREENS.MOVIE_DETAIL, {
      id: movie.id,
      componentId: componentId,
    });
  };

  return (
    <>
      {movie.title ? (
        <TouchableOpacity style={styles.main} onPress={goToDetails}>
          <View style={styles.image}>
            <Image source={{uri: imagePath}} style={styles.image} />
          </View>
          <GenericText
            variation="bold"
            text={movie.title}
            style={styles.text}
          />

          {!isModal && (
            <View style={styles.row}>
              <GenericText
                variation="regular"
                text={getYear(movie.release_date)}
              />

              <GenericText
                variation="regular"
                text={`${parseFloat(movie.popularity).toFixed(1)}/100`}
              />
            </View>
          )}
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    STYLES,
    marginBottom: 10,
    paddingVertical: 5,
    width: width * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    elevation: 1,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    width: width * 0.4,
    borderColor: COLORS.BAR_COLOR,
  },
  row: {
    paddingTop: 10,
    width: width * 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
  },
});

export default MoviesComponent;
