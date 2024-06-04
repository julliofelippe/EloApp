import { Box, Input } from 'native-base';
import * as React from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function SearchBar({ placeholder, value, setValue }) {
  const handleChangeText = (text) => setValue(text);

  return (
    <Box w={170}>
      <Input
        value={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        backgroundColor="#fb923d"
        placeholderTextColor="white"
        color="white"
        keyboardType="numeric"
        InputLeftElement={
          <Box alignItems="center" justifyContent="center" ml={2}>
            <AntDesign name="search1" size={18} color="white" />
          </Box>
        }
      />
    </Box>
  );
}
