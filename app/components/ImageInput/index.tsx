import { Box, Image } from 'native-base';
import { TouchableNativeFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';

import imagePlaceholder from '../../../assets/image-placeholder.png';

type ImageInputProps = {
  imageUrl: string;
};

export default function ImageInput({ imageUrl }: ImageInputProps) {
  const isSetImage = imageUrl ? imageUrl : imagePlaceholder;
  return (
    <TouchableNativeFeedback>
      <Box w="80%" h="200" alignItems="center" mb={5}>
        <Box
          backgroundColor="orange.300"
          p="7px"
          borderRadius={20}
          style={{ position: 'absolute', zIndex: 2, bottom: 10, right: 20 }}
        >
          <Feather name="edit" size={24} color="black" />
        </Box>
        <Image
          source={imagePlaceholder}
          alt="Imagem"
          resizeMode="cover"
          flex={1}
          borderRadius={20}
        />
      </Box>
    </TouchableNativeFeedback>
  );
}
