import * as React from 'react';
import { ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';

import { scale } from 'react-native-size-matters';
import styles from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import data from './data';
import { APPLICATION_NAME } from '../../constants/App';
import Spacer from '../../components/Spacer';
import FlexSpaceBetweenCenter, {
  BaseWrapper,
  OpenURLButton,
} from '../../components/Untils';
import Button from '../../components/Button';
import { ContactInfo, ContactLocationMap } from './ContactComponents';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import env from '../../services/environment';

export default function ContactUs({ navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingHorizontal: scale(32) }]}>
      <Text
        style={{
          fontSize: scale(20),
          paddingBottom: scale(20),
          textAlign: 'center',
          marginTop: -scale(insets.top - 20),
        }}
      >
        Contact Us
      </Text>
      <ScrollView
        style={{ paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <ContactInfo />
        <Spacer size={8} />
        <ContactLocationMap />
      </ScrollView>
    </View>
  );
}
