import { Box, HStack, Image, Text } from 'native-base';
import { Dimensions, TouchableOpacity } from 'react-native';

type HomeButtonProps = {
  navigation: any;
  title: string;
  fontSize: string;
  textColor: string;
  image: any;
  imageSize: number;
  imageColor: 'string';
  route: string;
  width: number;
  backgroundColor: string;
};

export default function HomeButton({
  navigation,
  title,
  fontSize,
  textColor,
  image,
  imageSize,
  imageColor,
  route,
  width,
  backgroundColor
}: HomeButtonProps) {
  const handleNavigation = () => {
    navigation.navigate(`${route}`, {});
  };
  const window = Dimensions.get('window');
  const buttonWidth = width ? width : window.width;
  const bgColor = backgroundColor ? backgroundColor : '#e7781c';
  const imgColor = imageColor ? imageColor : 'white';
  const fontColor = textColor ? textColor : 'white';

  return (
    <TouchableOpacity onPress={handleNavigation}>
      <Box
        style={{
          height: 45,
          width: buttonWidth,
          backgroundColor: bgColor,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        my="0.5"
      >
        <HStack justifyContent="center" alignItems="center">
          <Image
            source={image}
            alt="Badge"
            style={{
              width: imageSize,
              height: imageSize,
              tintColor: imgColor
            }}
            mx={2}
          />
          <Text color={fontColor} fontSize={fontSize}>
            {title}
          </Text>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
}
