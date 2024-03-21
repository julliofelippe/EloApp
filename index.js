import 'expo-dev-client';
import 'react-native-get-random-values';
import { registerRootComponent } from 'expo';
import { AppWrapperNonSync } from './app/AppWrapperNonSync';
import { AppWrapperSync } from './app/AppWrapperSync';
import { SYNC_CONFIG } from './sync.config';
import 'react-native-gesture-handler';

const App = () => <AppWrapperNonSync />;

registerRootComponent(App);
