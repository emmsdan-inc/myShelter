import * as React from 'react';
import { ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';

import { scale } from 'react-native-size-matters';
import styles from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Spacer from '../../components/Spacer';
import { ContactInfo, ContactLocationMap } from './ContactComponents';

export default function ContactUs({}) {
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
