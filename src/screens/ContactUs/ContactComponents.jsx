import React from 'react';
import { Text, View } from '../../components/Themed';
import styles from './style';
import Spacer from '../../components/Spacer';
import data from './data';
import { WebView } from 'react-native-webview';

export const ContactInfo = () => {
  return data.contactInfo.map((item, index) => (
    <View key={`${index}${item.accountNumber}`} style={{ width: '100%' }}>
      <Text style={styles.heading2}>{item.title}</Text>
      <Text style={styles.text}>{item.content}</Text>
      {item.content2 && <Text style={styles.text}>{item.content2}</Text>}
      <Spacer size={8} />
    </View>
  ));
};

const HTML = `
<!DOCTYPE html>
<html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>iframe test</title>
  </head>
  <body>
    <p style="">beforeContentLoaded on the top frame <span id="before_failed" style="display: inline-block;">failed</span><span id="before_succeeded" style="display: none;">succeeded</span>!</p>
    <p style="">afterContentLoaded on the top frame <span id="after_failed" style="display: inline-block;">failed</span><span id="after_succeeded" style="display: none;">succeeded</span>!</p>
    <iframe src="https://birchlabs.co.uk/linguabrowse/infopages/obsol/iframe.html?v=1" name="iframe_0" style="width: 100%; height: 25px;"></iframe>
    <iframe src="https://birchlabs.co.uk/linguabrowse/infopages/obsol/iframe2.html?v=1" name="iframe_1" style="width: 100%; height: 25px;"></iframe>
    <iframe src="https://www.ebay.co.uk" name="iframe_2" style="width: 100%; height: 25px;"></iframe>
  </body>
</html>
`;

export const ContactLocationMap = () => {
  return (
    <>
      <WebView
        source={{ html: data.mapEmbed() }}
        style={{ width: 300, height: 300 }}
      />
      <Spacer size={8} />
    </>
  );
};
