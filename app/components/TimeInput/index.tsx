import { TextInputMask } from 'react-native-masked-text';
import { IInputProps, FormControl } from 'native-base';

type Props = IInputProps & {
  errorText?: string | null;
  isInvalid?: any;
};

export default function TimeInput({
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
        options={{
          format: 'HH:mm'
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorText}</FormControl.ErrorMessage>
    </FormControl>
  );
}
