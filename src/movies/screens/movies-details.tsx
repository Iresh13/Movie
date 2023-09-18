import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';

import GenericText from '../../app/ui/text';
import {FONTS} from '../../app/themes/fonts';
import {COLORS} from '../../app/themes/color';
import GenericToolbar from '../../app/ui/toolbar';
import {IMovieDetails} from '../../app/app.types';
import {fetchAPIResponse} from '../../helpers/app.helper';
import {CustomNavigation} from '../../helpers/navigation.helper';

interface IProps {
  id: string;
  componentId: string;
}

const {height, width} = Dimensions.get('window');

const MovieDetail = ({componentId, id}: IProps) => {
  const [movieDetails, setMovieDetails] = useState<IMovieDetails>();

  const imagePath: string = `https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`;

  useEffect(() => {
    getDetails();
  }, [componentId, id]);

  const getDetails = useCallback(async () => {
    const query = `query {
        movie(id: ${id} ) {
	  id
      title
      original_title
      overview
      popularity
      vote_average
      release_date
      poster_path
      credits{
        id
      }     
      production_companies{
        id 
        name
        logo_path
        origin_country
      }
      reviews{
        id
        author_details {
            username
        }
        created_at
      }
    }
  }`;

    const {data} = await fetchAPIResponse(query);

    if (data) {
      setMovieDetails(data.movie);
    }
  }, [id]);

  return (
    <ScrollView style={styles.main}>
      <GenericToolbar
        showIcon
        title={movieDetails?.title}
        onBack={() => CustomNavigation.pop(componentId)}
      />

      {movieDetails ? (
        <ImageBackground
          source={{uri: imagePath}}
          style={styles.container}
          imageStyle={styles.imageBg}>
          <View style={styles.imageWrapper}>
            <Image source={{uri: imagePath}} style={styles.image} />

            <GenericText
              variation="bold large"
              style={styles.title}
              text={movieDetails?.title}
            />
          </View>

          <View style={styles.row}>
            <GenericText variation="bold" text={movieDetails?.release_date} />

            <GenericText variation="bold" text={movieDetails?.vote_average} />
          </View>

          <GenericText
            variation="regular"
            text={movieDetails?.overview}
            style={styles.description}
          />

          <GenericText
            style={styles.rating}
            variation="bold"
            text={`Ratings: ${parseFloat(movieDetails?.popularity).toFixed(
              1,
            )}/100`}
          />

          <GenericText variation="bold" text="Comments" />

          {movieDetails?.reviews.map((item, index) => {
            return (
              <View style={styles.rating}>
                <GenericText
                  variation="bold"
                  text={`${index + 1}. ${item.author_details.username}`}
                />
                <GenericText variation="regular bold" text={item.content} />
                <GenericText
                  variation="regular"
                  text={moment(item.created_at).fromNow()}
                />
              </View>
            );
          })}

          {movieDetails?.production_companies.map(item => {
            return (
              <View style={styles.imageWrapper}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${item.logo_path}`,
                  }}
                  style={styles.logo}
                />
                <GenericText
                  text={item.name}
                  variation="regular"
                  style={styles.title}
                />
              </View>
            );
          })}
        </ImageBackground>
      ) : (
        <ActivityIndicator size="small" color={COLORS.GREEN} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingTop: 20,
  },
  image: {height: 250, width: 300, marginBottom: 10, resizeMode: 'stretch'},
  logo: {height: 20, width: 30, marginBottom: 10, resizeMode: 'stretch'},
  text: {
    color: COLORS.WHITE,
  },
  title: {
    color: COLORS.BLACK,
    fontSize: FONTS.PRIMARY_FONT_SIZE,
  },
  rating: {
    paddingVertical: 10,
  },
  container: {
    width: width,
    paddingTop: 20,
    borderRadius: 10,
    paddingBottom: 40,
    height: height * 1.2,
    paddingHorizontal: 20,
    resizeMode: 'stretch',
  },
  imageBg: {opacity: 0.3},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    paddingTop: 10,
  },
});

export default MovieDetail;
