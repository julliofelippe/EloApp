import { TextInputMask } from 'react-native-masked-text';
import { IInputProps, FormControl } from 'native-base';

type Props = IInputProps & {
  errorText?: string | null;
};

export default function InputMasked({
  onChangeText,
  errorText = null,
  isInvalid,
  ...rest
}): Props {
  const invalid = !!errorText || isInvalid;

  return (
    <FormControl mb={4} isInvalid={invalid}>
      <TextInputMask
        style={{
          flex: 1,
          width: 347,
          height: 47,
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: '#F5F5F5',
          borderColor: '#E0E0E0',
          padding: 13
        }}
        type="datetime"
        placeholder="23/01/2004"
        onChangeText={onChangeText}
        options={{
          format: 'DD/MM/YYYY'
        }}
      />
      <FormControl.ErrorMessage>{errorText}</FormControl.ErrorMessage>
    </FormControl>
  );
}
