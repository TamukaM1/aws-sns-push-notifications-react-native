// App.js
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import registerForPushNotificationsAsync from './registerForPushNotifications';
import registerDeviceWithSNS from './registerDeviceWithSNS';

export default function App() {
  useEffect(() => {
    async function setupPushNotifications() {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        await registerDeviceWithSNS(token);
      }
    }

    setupPushNotifications();
  }, []);

  return (
      <View>
        <Text>Push Notifications with AWS SNS</Text>
      </View>
  );
}
