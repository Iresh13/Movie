import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import GenericText from './text';

interface IGenericToolbarProps {
  title?: string;
  showIcon?: boolean;
  onBack?: () => void;
}

const GenericToolbar = ({showIcon, onBack, title}: IGenericToolbarProps) => {
  return (
    <View style={styles.row}>
      <View style={styles.imageWrapper}>
        {showIcon ? (
          <TouchableOpacity onPress={onBack}>
            <GenericText text="Back" variation="bold" />
          </TouchableOpacity>
        ) : (
          <Image style={styles.image} source={{uri: 'icon'}} />
        )}
      </View>

      <View style={styles.text}>
        <GenericText text={title ? title : 'Movies'} variation="large" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {flex: 2},
  emptyView: {flex: 0.5},
  imageWrapper: {flex: 1.5},
  image: {height: 20, width: 20},
});

export default GenericToolbar;
