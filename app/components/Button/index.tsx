import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  text: string;
};

export default function Button({ text, width, ...rest }: Props) {
  return (
    <NativeBaseButton w={width} h={12} mb={4} borderRadius={10} {...rest}>
      <Text fontSize="md" color="white">
        {text}
      </Text>
    </NativeBaseButton>
  );
}
