import React from 'react';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import FeedPage from './src/screen/FeedsPage';

const App = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <FeedPage />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
