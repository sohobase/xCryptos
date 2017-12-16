import { bool, func } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Modal } from '../../../components';
import { C, STYLE, TEXT } from '../../../config';
import Option from './Option';

const { CURRENCY, SYMBOL } = C;
const { EN: { CHOOSE_CURRENCY } } = TEXT;

const ModalCurrency = ({ onClose, onValue, visible }) => (
  <Modal title={CHOOSE_CURRENCY} visible={visible} onClose={onClose}>
    <View style={[STYLE.COL]}>
      { Object.values(CURRENCY).map(item => (
        <Option key={item} hint={item} caption={SYMBOL[item]} onPress={() => onValue(item)} />
      ))}
    </View>
  </Modal>
);

ModalCurrency.propTypes = {
  onClose: func,
  onValue: func,
  visible: bool,
};

ModalCurrency.defaultProps = {
  onClose() {},
  onValue() {},
  visible: false,
};

export default ModalCurrency;
