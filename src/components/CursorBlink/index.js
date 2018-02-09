import React from 'react';
import { View as Motion } from 'react-native-animatable';

import styles from './style';

const CursorBlink = () => <Motion animation="fadeIn" duration={500} iterationCount="infinite" style={styles.blink} />;

export default CursorBlink;
