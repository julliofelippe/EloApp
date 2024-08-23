import {
  TextArea as NativeBaseTextArea,
  IInputProps,
  FormControl
} from 'native-base';

type Props = IInputProps & {
  errorText?: string | null;
  isInvalid?: boolean;
  setWidth?: string | null;
};

export default function TextArea({
  errorText = null,
  isInvalid,
  setWidth,
  ...rest
}: Props) {
  const invalid = !!errorText || isInvalid;

  const inputWidth = setWidth ? setWidth : 'full';

  return (
    <FormControl mb={4} isInvalid={invalid}>
      <NativeBaseTextArea
        fontSize="md"
        h="100px"
        w={inputWidth}
        borderRadius={10}
        numberOfLines={4}
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
