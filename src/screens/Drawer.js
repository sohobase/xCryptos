import React from 'react';
import { Linking, Platform, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { C, THEME } from '../config';
import { Button } from '../components';
import style from './Drawer.style';
import pkg from '../../package.json';

const { FEEDBACK: { MAIL, SUBJECT }, STORE_URL: { ANDROID, IOS } } = C;
const storeURL = (Platform.OS === 'ios') ? ANDROID : IOS;

export default props => (
  <View style={style.container}>
    <View style={style.header}>
      <Text style={style.title}>{pkg.name}</Text>
    </View>
    <ScrollView>
      <TouchableOpacity onPress={() => Share.share({ message: storeURL })}>
        <Text style={[style.label, style.link]}>Share Us</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL(storeURL)}>
        <Text style={[style.label, style.link]}>Like Us</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL(`mailto:${MAIL}?subject=${SUBJECT}&body=body`)}>
        <Text style={[style.label, style.link]}>Feedback</Text>
      </TouchableOpacity>
      <DrawerItems
        {...props}
        activeTintColor={THEME.PRIMARY}
        style={style.drawer}
        labelStyle={[style.label, style.item]}
      />
      <Button
        caption="Get $10 in Coinbase"
        tintColor={THEME.COLOR_COINBASE}
        onPress={() => Linking.openURL(C.AFILIATES.COINBASE)}
        style={style.button}
      />
    </ScrollView>
  </View>
);
