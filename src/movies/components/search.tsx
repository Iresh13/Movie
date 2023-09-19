import {
  View,
  FlatList,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import React, {useEffect, useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import GenericText from '../../app/ui/text';
import {COLORS} from '../../app/themes/color';
import {IMovies, IRatings, IRootState, IYears} from '../../app/app.types';

import MoviesComponent from './movie-poster';
import GenericButton from '../../app/ui/button';
import {getYear} from '../../helpers/app.helper';
import {rating, years} from '../../app/app.constant';
import GenericRadioButton from '../../app/ui/radio-button';

interface IProps {
  componentId: string;
}

const {width, height} = Dimensions.get('window');

const SearchMovie = ({componentId}: IProps) => {
  const [yearList, setYearList] = useState<IYears[]>(years);
  const [rateList, setRateList] = useState<IRatings[]>(rating);

  const {movies} = useSelector((state: IRootState) => state);

  const [searchText, setSearchText] = useState<string>('');

  const [movieList, setMovieList] = useState<IMovies[]>(movies);

  const [showButton, setShowButton] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<string>('');

  const textInputRef = useRef<typeof TextInput | null>(null);

  const onSearchInput = (input: string) => {
    const newResult = movies.filter((movie: IMovies) => {
      return movie?.title?.toLowerCase().includes(input.toLowerCase());
    });

    return setMovieList(newResult);
  };

  useEffect(() => {
    if (searchText.length >= 2) {
      return onSearchInput(searchText);
    }

    setMovieList(movies);
  }, [movies, searchText]);

  const mapYearSelected = (selectedYear: IYears) => {
    setSelectedDate(selectedYear.title);

    const newData = yearList.map(item => {
      if (item.id === selectedYear.id) {
        if (item.isSelected) {
          setSelectedRating('');
        }

        item.isSelected = !item.isSelected;
      } else {
        item.isSelected = false;
      }

      return item;
    });

    resetRating();

    setYearList(newData);
  };

  const mapRatingSelected = (selectedRate: IRatings) => {
    setSelectedRating(selectedRate.title);

    const newData = rateList.map(item => {
      if (item.id === selectedRate.id) {
        item.isSelected = !item.isSelected;
      } else {
        item.isSelected = false;
      }

      return item;
    });

    resetDate();
    setRateList(newData);
  };

  const onSubmit = () => {
    const newResult = movies.filter((movie: IMovies) => {
      if (selectedDate) {
        return getDatedMovies(movie);
      }

      if (selectedRating) {
        return getRatedMovies(movie);
      }
    });

    textInputRef?.current?.clear();

    resetRating();
    resetDate();

    setShowButton(false);
    return setMovieList(newResult);
  };

  const getDatedMovies = (movie: IMovies) => {
    if (selectedDate === yearList[0].title) {
      return getYear(movie.release_date) < selectedDate;
    }

    return getYear(movie.release_date) === selectedDate;
  };

  const getRatedMovies = (movie: IMovies) => {
    if (selectedRating === rateList[0].title) {
      return getYear(movie.vote_average) < selectedRating;
    }

    return movie.vote_average > (parseFloat(selectedRating) - 1).toString();
  };

  const resetRating = () => {
    const newData = rateList.map(item => {
      item.isSelected = false;

      return item;
    });

    setRateList(newData);
    setSelectedRating('');
  };

  const resetDate = () => {
    const newData = yearList.map(item => {
      item.isSelected = false;

      return item;
    });

    setYearList(newData);

    setSelectedDate('');
  };

  const getYearSelector = () => {
    return (
      <>
        <GenericText text="Select Year" variation="bold" />

        <View style={styles.buttonWrapper}>
          <FlatList
            data={yearList}
            numColumns={6}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => (Math.random() + index).toString()}
            renderItem={({item}: {item: IYears}) => {
              return (
                <View style={styles.buttonWrapper}>
                  <GenericRadioButton
                    title={item.title}
                    isAuthorized={item.isSelected}
                    onSelect={() => mapYearSelected(item)}
                  />
                </View>
              );
            }}
          />
        </View>
      </>
    );
  };

  const getRateSelector = () => {
    return (
      <>
        <GenericText text="Select Ratings" variation="bold" />

        <View style={styles.buttonWrapper}>
          <FlatList
            data={rateList}
            numColumns={6}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => (Math.random() + index).toString()}
            renderItem={({item}: {item: IRatings}) => {
              return (
                <View style={styles.buttonWrapper}>
                  <GenericRadioButton
                    title={item.title}
                    isAuthorized={item.isSelected}
                    onSelect={() => mapRatingSelected(item)}
                  />
                </View>
              );
            }}
          />
        </View>
      </>
    );
  };

  return (
    <View style={styles.main}>
      <GenericText text="Search Movie" variation="bold" style={styles.text} />

      <View style={styles.row}>
        <TextInput
          ref={textInputRef}
          style={styles.textInput}
          placeholder="Search Movie"
          placeholderTextColor={COLORS.BAR_COLOR}
          onChangeText={(text: string) => {
            setShowButton(false);

            setSearchText(text);
          }}
        />

        <TouchableOpacity onPress={() => setShowButton(!showButton)}>
          <AntDesign name="filter" color={COLORS.BLACK} size={24} />
        </TouchableOpacity>
      </View>

      {showButton && (
        <View style={styles.filter}>
          {getYearSelector()}

          {getRateSelector()}

          <View style={styles.row}>
            <GenericButton
              title="Search"
              style={styles.button}
              variation="md danger"
              onButtonPressed={onSubmit}
            />

            <GenericButton
              title="Reset All"
              style={styles.button}
              variation="md red"
              onButtonPressed={() => {
                resetDate();
                resetRating();
                setMovieList(movies);
              }}
            />
          </View>
        </View>
      )}

      <View style={styles.movieList}>
        <FlatList
          data={movieList}
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
                <MoviesComponent
                  isModal
                  movie={item}
                  componentId={componentId}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 12,
  },
  buttonWrapper: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {width: width * 0.4, marginHorizontal: 10},
  textInput: {
    padding: 10,
    height: 50,
    borderWidth: 1,
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 10,
    width: width * 0.8,
    paddingVertical: 5,
    borderColor: COLORS.BAR_COLOR,
  },
  image: {
    height: 200,
    elevation: 1,
    borderWidth: 1,
    marginBottom: 10,
    width: width * 0.4,
    borderRadius: 10,
    borderColor: COLORS.BAR_COLOR,
  },
  row: {
    paddingTop: 10,
    width: width * 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  filter: {
    paddingVertical: 30,
  },
  text: {
    paddingVertical: 20,
    paddingBottom: 30,
    textAlign: 'center',
  },
  movieList: {
    height: height,
    paddingBottom: 170,
  },
});

export default SearchMovie;
