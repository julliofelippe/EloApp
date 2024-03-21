import { HStack, Box, VStack, Text } from 'native-base';
import { Feather } from '@expo/vector-icons';

import Button from '../Button';

type CardProps = {
  navigation: any;
  formTitle: string;
  buttonTitle: string;
  icon: string;
  route: string;
};

export default function Card({
  navigation,
  formTitle,
  buttonTitle,
  icon,
  route
}: CardProps) {
  const handleCreate = () => {
    navigation.navigate(`${route}`, {
      data: [],
      mode: 'create'
    });
  };
  return (
    <Box
      border="1"
      borderRadius="md"
      backgroundColor="gray.300"
      py="8px"
      px="20px"
      my="5"
      w={340}
      borderRadius="xl"
    >
      <HStack justifyContent="flex-start" alignItems="center" pb="10px">
        <Box pt="4">
          <Feather name={icon} size={36} color="black" />
        </Box>
        <Text px="4" fontSize="lg" pt="3">
          {formTitle}
        </Text>
      </HStack>
      <VStack justifyContent="center" alignItems="center">
        <Button text={buttonTitle} onPress={handleCreate} />
      </VStack>
    </Box>
  );
}
