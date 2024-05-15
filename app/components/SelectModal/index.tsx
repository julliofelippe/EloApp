import { Box, Center, CheckIcon, Select } from 'native-base';
import * as React from 'react';

export default function SelectModal({
  onselect,
  fieldName,
  fieldArray,
  fieldPlaceholder
}) {
  const [select, setSelect] = React.useState('');
  const handleSelect = (itemValue) => {
    setSelect(itemValue);
    onselect(fieldName, itemValue);
  };
  return (
    <Center>
      <Box maxW="400" pb={4}>
        <Select
          fontSize={15}
          borderRadius={10}
          selectedValue={select}
          minWidth="350"
          accessibilityLabel={fieldPlaceholder}
          placeholder={fieldPlaceholder}
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />
          }}
          mt={1}
          onValueChange={(itemValue) => handleSelect(itemValue)}
        >
          {fieldArray.map((item, index) => {
            return (
              <Select.Item label={item.label} value={item.value} key={index} />
            );
          })}
        </Select>
      </Box>
    </Center>
  );
}
