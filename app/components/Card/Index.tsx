import { HStack, Box } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

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
      borderWidth={1}
      borderColor="gray.300"
      backgroundColor="white"
      py={4}
      px="10px"
      my="5"
      w={340}
      borderRadius="xl"
    >
      <HStack justifyContent="center" alignItems="center">
        <Box alignItems="center" px={3}>
          <FontAwesome5 name={icon} size={36} color="#fb923d" />
        </Box>
        <Button
          text={buttonTitle}
          backgroundColor="#fb923d"
          onPress={handleCreate}
        />
      </HStack>
    </Box>
  );
}
