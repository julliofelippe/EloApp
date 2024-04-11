import { useCallback } from 'react';
import { HStack, Box, VStack, Text } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { TouchableNativeFeedback } from 'react-native';
import { useRealm } from '@realm/react';
import useGenerateForm from '../../hooks/useGenerateForm';

export default function FormTable({ item, formName, navigation }) {
  const realm = useRealm();
  const { generateForm } = useGenerateForm();

  const handleDeleteTask = useCallback((): void => {
    try {
      realm.write(() => {
        realm.delete(item);

        // Alternatively if passing the ID as the argument to handleDeleteTask:
        // realm?.delete(realm?.objectForPrimaryKey('Task', id));
      });
    } catch (error) {
      console.log(error);
    }
  }, [realm]);

  const handleEdit = () => {
    navigation.navigate('lashingCertificate', {
      data: item,
      mode: 'edit'
    });
  };

  const handleView = () => {
    navigation.navigate('lashingCertificate', {
      data: item,
      mode: 'view'
    });
  };

  return (
    <Box
      border="1"
      backgroundColor="gray.300"
      pb="15px"
      pt="10px"
      px="20px"
      my="5"
      w={340}
      borderRadius="xl"
    >
      <HStack justifyContent="flex-end">
        <Text fontSize={10}>{item.date}</Text>
      </HStack>
      <HStack justifyContent="flex-start" alignItems="center" pb="14px">
        <Box pt="4">
          <Feather name="file-text" size={36} color="black" />
        </Box>
        <Text px="4" fontSize="lg" pt="3">
          {formName} Nº {item.certificateNumber}
        </Text>
      </HStack>
      <HStack justifyContent="center" alignItems="center">
        <TouchableNativeFeedback onPress={handleView}>
          <Box
            backgroundColor="orange.300"
            px={6}
            py={2}
            mx={1}
            borderRadius={200}
          >
            <Feather name="eye" size={22} />
          </Box>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={handleEdit}>
          <Box
            backgroundColor="orange.300"
            px={6}
            py={2}
            mx={1}
            borderRadius={200}
          >
            <Feather name="edit" size={22} />
          </Box>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => generateForm(item)}>
          <Box
            backgroundColor="orange.300"
            px={6}
            py={2}
            mx={1}
            borderRadius={200}
          >
            <Feather name="download" size={22} />
          </Box>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => handleDeleteTask()}>
          <Box
            backgroundColor="orange.300"
            px={6}
            py={2}
            mx={1}
            borderRadius={200}
          >
            <Feather name="trash-2" size={22} />
          </Box>
        </TouchableNativeFeedback>
      </HStack>
    </Box>
  );
}
