import { Spinner, View, Container, Box } from 'native-base';
import { useState } from 'react';
import { Dimensions, StyleSheet, Animated } from 'react-native';

export default function LoadingScreen() {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  return (
    <Container flex={1} position="absolute" top={0} left={0}>
      <View
        alignItems="center"
        justifyContent="center"
        bg="gray.100"
        opacity={0.8}
        zIndex={999}
        width={deviceWidth}
        height={deviceHeight}
      >
        <Spinner color="warning.500" size="lg" position="fixed" flex={1} />
      </View>
    </Container>
  );
}
