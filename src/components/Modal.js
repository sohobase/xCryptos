import { bool, func, node, string } from 'prop-types';
import React from 'react';
import { Modal as ModalNative, Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { STYLE, THEME } from '../config';
import ButtonIcon from './ButtonIcon';
import styles from './Modal.style';

const CONTAINER_DURATION = THEME.ANIMATION_DURATION / 2;

const Modal = ({
  children, onClose, title, visible,
}) => (
  <ModalNative
    transparent
    visible={visible}
    onRequestClose={() => { }}
  >
    <Animatable animation="fadeIn" duration={CONTAINER_DURATION} style={styles.container}>
      <Animatable
        animation="bounceInUp"
        delay={CONTAINER_DURATION}
        duration={THEME.ANIMATION_DURATION}
        easing={THEME.ANIMATION_EASING}
        style={styles.content}
      >
        <View style={[STYLE.ROW, STYLE.CENTERED, styles.header]}>
          { title && <Text style={styles.title}>{title}</Text> }
          <ButtonIcon icon="close" onPress={onClose} style={styles.close} />
        </View>
        { children }
      </Animatable>
    </Animatable>
  </ModalNative>
);

Modal.propTypes = {
  children: node,
  onClose: func,
  title: string,
  visible: bool,
};

Modal.defaultProps = {
  children: undefined,
  onClose: undefined,
  title: undefined,
  visible: false,
};

export default Modal;
