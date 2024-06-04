import { Box, HStack, Input } from 'native-base';
import { TextInputMask } from 'react-native-masked-text';
import * as React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export default function DateInput({ placeholder, value, setValue }) {
  const handleChange = (text) => setValue(text);

  return (
    <HStack w={120}>
      <Box position="absolute" zIndex={999} top={3} ml={2}>
        <FontAwesome5 name="calendar-day" size={18} color="#fb923d" />
      </Box>
      <TextInputMask
        value={value}
        onChangeText={handleChange}
        style={{
          flex: 1,
          width: '100%',
          borderWidth: 1,
          borderColor: '#E0E0E0',
          height: '100%',
          backgroundColor: 'white',
          color: '#fb923d',
          paddingLeft: 30
        }}
        placeholder={placeholder}
        placeholderTextColor="#fb923d"
        keyboardType="number-pad"
        type="datetime"
        options={{
          format: 'DD/MM/YYYY'
        }}
      />
    </HStack>
  );
}
