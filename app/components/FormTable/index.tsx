import { useCallback } from 'react';
import { HStack, Box, Text, Image } from 'native-base';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { Alert, TouchableNativeFeedback } from 'react-native';
import { useRealm } from '@realm/react';

import { fetchPdf } from '../../api/pdf.api';
import docx from '../../../assets/icons/doc.png';
import pdf from '../../../assets/icons/pdf.png';
import download from '../../../assets/icons/download.png';
import trash from '../../../assets/icons/trash.png';
import edit from '../../../assets/icons/edit.png';

export default function FormTable({
  item,
  formName,
  generateFormFunction,
  navigation,
  route
}) {
  const realm = useRealm();

  const handleDeleteTask = useCallback((): void => {
    try {
      realm.write(() => {
        realm.delete(item);
      });
    } catch (error) {
      console.log(error);
    }
  }, [realm]);

  const handleEdit = () => {
    navigation.navigate(route, {
      data: item,
      mode: 'edit'
    });
  };

  const handleView = () => {
    navigation.navigate(route, {
      data: item,
      mode: 'view'
    });
  };

  return (
    <Box
      borderWidth={2}
      borderColor="gray.300"
      backgroundColor="white"
      pb="15px"
      pt="10px"
      px="20px"
      my="5"
      w={340}
      borderRadius="xl"
    >
      <HStack justifyContent="center" alignItems="center" pb={3} pt={1}>
        <HStack alignItems="center">
          <Box backgroundColor="#fb923d" p={1} borderRadius={5}>
            <Feather name="file-text" size={20} color="white" />
          </Box>
          <Text px={2} fontSize="md">
            {formName} Nº {item.certificateNumber}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Box px={2}>
            <FontAwesome5 name="calendar-day" size={18} color="#fb923d" />
          </Box>
          <Text fontSize={12} color="#fb923d" fontWeight="bold">
            {item.date}
          </Text>
        </HStack>
      </HStack>
      <HStack
        justifyContent="center"
        alignItems="center"
        backgroundColor="orange.400"
        py={2}
        px={2}
        borderRadius="2xl"
      >
        <TouchableNativeFeedback onPress={handleEdit}>
          <Box px={1} py={2} mx={1} borderRadius={200}>
            <Image
              source={edit}
              alt="Badge"
              style={{
                width: 41,
                height: 41,
                tintColor: 'white'
              }}
            />
          </Box>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={() => generateFormFunction(item)}>
          <Box px={1} py={2} mx={1} borderRadius={200}>
            <Image
              source={docx}
              alt="Badge"
              style={{
                width: 40,
                height: 40,
                tintColor: 'white'
              }}
            />
          </Box>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={() => generateFormFunction(item)}>
          <Box px={1} py={2} mx={1} borderRadius={200}>
            <Image
              source={pdf}
              alt="Badge"
              style={{
                width: 40,
                height: 40,
                tintColor: 'white'
              }}
            />
          </Box>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback
          onPress={() =>
            fetchPdf().then((response) => {
              Alert.alert(
                'Piada',
                response.joke ? response.joke : response.setup
              );
              console.log(response);
            })
          }
        >
          <Box px={1} py={2} mx={1} borderRadius={200}>
            <Image
              source={download}
              alt="Badge"
              style={{
                width: 40,
                height: 40,
                tintColor: 'white'
              }}
            />
          </Box>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => handleDeleteTask()}>
          <Box px={1} py={2} mx={1} borderRadius={200}>
            <Image
              source={trash}
              alt="Badge"
              style={{
                width: 40,
                height: 40,
                tintColor: '#302f31'
              }}
            />
          </Box>
        </TouchableNativeFeedback>
      </HStack>
    </Box>
  );
}
