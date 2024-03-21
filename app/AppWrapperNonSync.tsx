import { SafeAreaView } from 'react-native';

import AppNonSync from './AppNonSync';

import { RealmProvider } from '@realm/react';
import { schemas } from './models';
import { NativeBaseProvider } from 'native-base';

export const AppWrapperNonSync = () => {
  // If sync is disabled, setup the app without any sync functionality and return early
  return (
    <NativeBaseProvider>
      <RealmProvider schema={schemas}>
        <AppNonSync />
      </RealmProvider>
    </NativeBaseProvider>
  );
};
