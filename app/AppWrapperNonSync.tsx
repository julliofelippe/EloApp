import AppNonSync from './AppNonSync';

import { RealmProvider } from '@realm/react';
import { schemas } from './models';
import { NativeBaseProvider } from 'native-base';
import { migrationFunction } from './models/migrations/1_lashingForm_Migration';
import { LoadingProvider } from './context/LoadingContext';

export const AppWrapperNonSync = () => {
  // If sync is disabled, setup the app without any sync functionality and return early
  return (
    <NativeBaseProvider>
      <RealmProvider
        schema={schemas}
        schemaVersion={5}
        onMigration={migrationFunction}
      >
        <LoadingProvider>
          <AppNonSync />
        </LoadingProvider>
      </RealmProvider>
    </NativeBaseProvider>
  );
};
