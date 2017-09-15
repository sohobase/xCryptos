import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

export default (Platform.OS === 'ios') ? TouchableOpacity : TouchableNativeFeedback;
