import { useCallback } from 'react';
import { HStack, Box, Text, Image } from 'native-base';
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { TouchableNativeFeedback } from 'react-native';
import { useRealm } from '@realm/react';

import { useLoading } from '../../context/LoadingContext';
import docx from '../../../assets/icons/doc.png';
import pdf from '../../../assets/icons/pdf.png';
import downloadPdf from '../../../assets/icons/downloadPdf.png';
import downloadDocx from '../../../assets/icons/downloadDocx.png';
import trash from '../../../assets/icons/trash.png';
import edit from '../../../assets/icons/edit.png';

export default function FormTable({
  item,
  formName,
  formNumber,
  formDate,
  generateDocxFunction,
  generatePdfFunction,
  downloadPdfFunction,
  downloadDoxcFunction,
  navigation,
  route
}) {
  const realm = useRealm();

  const { isLoading } = useLoading();

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
      my="3"
      w={340}
      borderRadius="xl"
    >
      <HStack justifyContent="center" alignItems="center" pb={3} pt={1}>
        <HStack alignItems="center">
          <Box backgroundColor="#fb923d" p={1} borderRadius={5}>
            <Feather name="file-text" size={20} color="white" />
          </Box>
          <Text px={2} fontSize="md">
            {formName} Nº {formNumber}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Box px={2}>
            <FontAwesome5 name="calendar-day" size={18} color="#fb923d" />
          </Box>
          <Text fontSize={12} color="#fb923d" fontWeight="bold">
            {formDate}
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
                width: 33,
                height: 33,
                tintColor: 'white'
              }}
            />
          </Box>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={() => generateDocxFunction(item)}>
          <Box px={1} py={2} mx={1} borderRadius={200}>
            {isLoading ? (
              <MaterialCommunityIcons
                name="progress-download"
                size={30}
                color="white"
              />
            ) : (
              <Image
                source={docx}
                alt="Badge"
                style={{
                  width: 32,
                  height: 32,
                  tintColor: 'white'
                }}
              />
            )}
          </Box>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={() => generatePdfFunction(item)}>
          <Box px={1} py={2} mx={1} borderRadius={200}>
            {isLoading ? (
              <MaterialCommunityIcons
                name="progress-download"
                size={30}
                color="white"
              />
            ) : (
              <Image
                source={pdf}
                alt="Badge"
                style={{
                  width: 32,
                  height: 32,
                  tintColor: 'white'
                }}
              />
            )}
          </Box>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={() => downloadDoxcFunction(item)}>
          <Box px={1} py={2} mx={1} borderRadius={200}>
            {isLoading ? (
              <MaterialCommunityIcons
                name="progress-download"
                size={30}
                color="white"
              />
            ) : (
              <Image
                source={downloadDocx}
                alt="Badge"
                style={{
                  width: 32,
                  height: 32,
                  tintColor: 'white'
                }}
              />
            )}
          </Box>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={() => downloadPdfFunction(item)}>
          <Box px={1} py={2} mx={1} borderRadius={200}>
            {isLoading ? (
              <MaterialCommunityIcons
                name="progress-download"
                size={30}
                color="white"
              />
            ) : (
              <Image
                source={downloadPdf}
                alt="Badge"
                style={{
                  width: 32,
                  height: 32,
                  tintColor: 'white'
                }}
              />
            )}
          </Box>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={() => handleDeleteTask()}>
          <Box px={1} py={2} mx={1} borderRadius={200}>
            <Image
              source={trash}
              alt="Badge"
              style={{
                width: 32,
                height: 32,
                tintColor: '#302f31'
              }}
            />
          </Box>
        </TouchableNativeFeedback>
      </HStack>
    </Box>
  );
}
