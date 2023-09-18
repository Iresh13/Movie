import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {COLORS} from '../themes/color';

import GenericText from './text';
import {IStyles} from '../app.types';

export interface IModalProps {
  title: string;
  isAuthorized?: boolean;
  onSelect: () => void;
}

const GenericRadioButton = ({title, isAuthorized, onSelect}: IModalProps) => {
  const handleAuthentication = () => {
    onSelect();
  };

  return (
    <TouchableOpacity onPress={handleAuthentication} style={styles.center}>
      <View style={styles.authButton(isAuthorized)}>
        {isAuthorized && <Icon name="check" size={18} color={COLORS.WHITE} />}
      </View>

      <GenericText text={title} variation="small" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create<IStyles>({
  authBox: {
    paddingTop: 15,
    flexDirection: 'row',
  },
  center: {
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authButton: (isAuthorized: boolean) => ({
    width: 20,
    height: 20,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: isAuthorized ? COLORS.GREEN : COLORS.BLACK,
    backgroundColor: isAuthorized ? COLORS.GREEN : COLORS.WHITE,
  }),
});

export default GenericRadioButton;
