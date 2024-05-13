import { AppProvider } from '@realm/react';
import { SafeAreaView } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import { schemas } from './models';
import AppSync from './AppSync';

import { RealmProvider } from '@realm/react';
import { OpenRealmBehaviorType, OpenRealmTimeOutBehavior } from 'realm';
import { migrationFunction } from './models/migrations/1_lashingForm_Migration';

export const AppWrapperSync = ({ appId }) => {
  // If we are logged in, add the sync configuration the the RealmProvider and render the app
  return (
    <SafeAreaView>
      <AppProvider id={appId}>
        <RealmProvider
          schema={schemas}
          schemaVersion={2}
          onMigration={migrationFunction}
          sync={{
            flexible: true,
            existingRealmFileBehavior: {
              type: OpenRealmBehaviorType.DownloadBeforeOpen,
              timeOut: 1000,
              timeOutBehavior:
                // In v11 the enums are not set up correctly, so we need to use the string values
                OpenRealmTimeOutBehavior?.OpenLocalRealm ?? 'openLocalRealm'
            }
          }}
        >
          <NativeBaseProvider>
            <AppSync />
          </NativeBaseProvider>
        </RealmProvider>
      </AppProvider>
    </SafeAreaView>
  );
};

export default AppWrapperSync;
