import { bool, func, node, string } from 'prop-types';
import React, { Component } from 'react';
import { Animated, KeyboardAvoidingView, Modal as RNModal, Platform, Text, View } from 'react-native';

import { STYLE } from '../config';
import ButtonIcon from './ButtonIcon';
import styles from './Modal.style';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottom: new Animated.Value(-500),
      opacity: new Animated.Value(0),
    };
  }

  componentWillReceiveProps({ visible }) {
    const { state: { bottom, opacity } } = this;

    Animated.parallel([
      Animated.spring(opacity, { speed: 20, toValue: visible ? 1 : 0, useNativeDriver: true }),
      Animated.spring(bottom, { speed: 20, toValue: visible ? 0 : -500 }),
    ]).start();
  }

  render() {
    const {
      props: {
        children, onClose, title, visible,
      },
      state: { bottom, opacity },
    } = this;

    return (
      <RNModal hardwareAccelerated transparent visible={visible} onRequestClose={onClose}>
        <Animated.View style={[styles.background, { opacity }]}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : undefined}>
            <Animated.View style={[styles.container, { bottom }]}>
              <View style={[STYLE.ROW, STYLE.CENTERED, styles.header]}>
                { title && <Text style={styles.title}>{title}</Text> }
                <ButtonIcon icon="close" onPress={onClose} style={styles.close} />
              </View>
              <View style={styles.content}>
                { children }
              </View>
            </Animated.View>
          </KeyboardAvoidingView>
        </Animated.View>
      </RNModal>
    );
  }
}

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
