import React from 'react';
import { Linking, Image, Platform, ScrollView, Text, View } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { ASSETS, C, STYLE, THEME } from '../config';
import { Button, Logo, Touchable } from '../components';
import style from './Drawer.style';
import pkg from '../../package.json';

const { FEEDBACK: { MAIL, SUBJECT }, STORE_URL: { ANDROID, IOS } } = C;
const storeURL = (Platform.OS === 'ios') ? IOS : ANDROID;

const DrawerLinkItem = ({ onPress, icon, caption }) => ( // eslint-disable-line
  <Touchable onPress={onPress}>
    <View style={[STYLE.ROW, style.link]}>
      <Image source={icon} style={[STYLE.DRAWER_ICON]} />
      <Text style={[STYLE.DRAWER_LABEL, style.linkCaption]}>{caption}</Text>
    </View>
  </Touchable>
);

export default props => (
  <View style={style.container}>
    <View style={[STYLE.ROW, style.header]}>
      <Logo style={style.logo} />
      <View>
        <Text style={style.title}>{pkg.name}</Text>
        <Text style={style.version}>v{pkg.version}</Text>
      </View>
    </View>
    <ScrollView style={style.options}>
      <DrawerItems
        {...props}
        items={[props.items[0]]} // eslint-disable-line
        activeTintColor={THEME.PRIMARY}
        style={style.drawerItems}
        labelStyle={[STYLE.DRAWER_LABEL, style.item]}
      />
      <DrawerLinkItem
        caption="Like Us"
        icon={ASSETS.star}
        onPress={() => Linking.openURL(storeURL)}
      />
      <DrawerLinkItem
        caption="Feedback"
        icon={ASSETS.create}
        onPress={() => Linking.openURL(`mailto:${MAIL}?subject=${SUBJECT}&body=body`)}
      />
      <DrawerItems
        {...props}
        items={[props.items[1]]} // eslint-disable-line
        activeTintColor={THEME.PRIMARY}
        style={style.drawerItems}
        labelStyle={[STYLE.DRAWER_LABEL, style.item]}
      />
      <Button
        caption="Get $10 in Coinbase"
        onPress={() => Linking.openURL(C.AFILIATES.COINBASE)}
        style={style.button}
      />
    </ScrollView>
  </View>
);
