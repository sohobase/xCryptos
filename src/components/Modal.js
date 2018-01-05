import { bool, func, node, string } from 'prop-types';
import React from 'react';
import { KeyboardAvoidingView, Modal as ReactModalNative, Platform, Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { STYLE, THEME } from '../config';
import ButtonIcon from './ButtonIcon';
import styles from './Modal.style';

const { MOTION: { DURATION } } = THEME;

const Modal = ({
  children, onClose, title, visible,
}) => (
  <ReactModalNative transparent visible={visible} onRequestClose={onClose}>
    <Motion
      animation={visible ? 'fadeIn' : 'fadeOut'}
      duration={DURATION / 2}
      delay={visible ? 0 : DURATION / 2}
      style={styles.background}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : undefined}>
        <Motion
          animation={visible ? 'bounceInUp' : 'bounceOutDown'}
          duration={DURATION}
          style={styles.container}
        >
          <View style={[STYLE.ROW, STYLE.CENTERED, styles.header]}>
            { title && <Text style={styles.title}>{title}</Text> }
            <ButtonIcon icon="close" onPress={onClose} style={styles.close} />
          </View>
          <View style={styles.content}>
            { children }
          </View>
        </Motion>
      </KeyboardAvoidingView>
    </Motion>
  </ReactModalNative>
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
