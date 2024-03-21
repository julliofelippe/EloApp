import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl
} from 'native-base';

type Props = IInputProps & {
  errorText?: string | null;
};

export default function Input({ errorText = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorText || isInvalid;

  return (
    <FormControl mb={4} isInvalid={invalid}>
      <NativeBaseInput
        fontSize="md"
        h={12}
        w="full"
        borderRadius={10}
        isInvalid={invalid}
        _focus={{
          bg: 'gray.300',
          borderColor: 'gray.300',
          borderWidth: 1
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorText}</FormControl.ErrorMessage>
    </FormControl>
  );
}
