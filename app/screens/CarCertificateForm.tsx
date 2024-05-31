import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRealm } from '@realm/react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { ObjectId } from 'bson';
import {
  Box,
  HStack,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack
} from 'native-base';
import { Alert, TouchableNativeFeedback } from 'react-native';

import { CarFormSchema } from '../models/carFormSchema';
import Input from '../components/Input';
import LoadingScreen from '../components/LoadingScreen';
import InputMasked from '../components/InputMasked';
import Button from '../components/Button';
import SelectModal from '../components/SelectModal';
import ModalText from '../components/TextModal';
import { ModalImageDescription } from '../data/ModalImageDescription';

type Image = {
  imageUrl: any;
  imageTitle: any;
  imageDescription: any;
};

type CarCertificateFormProps = {
  containerNumber: string;
  containerType: string;
  reportDate: string;
  day: string;
  clientName: string;
  sector: string;
  local: string;
  contractor: string;
  responsible: string;
  function: string;
  entryTime: string;
  exitTime: string;
  turnTime: string;
  breakIn: string;
  breakOut: string;
  breakTurn: string;
  morningWeather: string;
  morningStatus: string;
  afternoonWeather: string;
  afternoonStatus: string;
  nightWeather: string;
  nightStatus: string;
  activity: string;
  certificateDescription: string;
  containerDescription: string;
  containerStatus: string;
  image: Image[];
};

const modalActivity = [
  {
    label: 'Ovação',
    value: 'Ovação'
  },
  {
    label: 'Desova',
    value: 'Desova'
  }
];

const CarCertificateFormSchema = yup.object({
  containerNumber: yup.string().required('Informe o número do container'),
  containerType: yup.string().required('Informe o tipo do container'),
  reportDate: yup.string().required('Informe a data do relatório'),
  day: yup.string().required('informe o dia da semana'),
  clientName: yup.string().required('Informe o nome do cliente'),
  sector: yup.string().required('Informe o setor'),
  local: yup.string().required('Informe o local'),
  contractor: yup.string().required('Informe o nome do contratante'),
  responsible: yup.string().required('Informe o nome do colaborador'),
  function: yup.string().required('Informe a função do colaborador'),
  entryTime: yup.string().required('Informe o horário de entrada'),
  exitTime: yup.string().required('Informe o horário de saída'),
  turnTime: yup.string().required('Informe o turno'),
  breakIn: yup.string().required('Informe o horário de entrada do intervalo'),
  breakOut: yup.string().required('Informe o horário de saída do intervalo'),
  breakTurn: yup.string().required('Informe o turno'),
  morningWeather: yup.string().notRequired(),
  morningStatus: yup.string().notRequired(),
  afternoonWeather: yup.string().notRequired(),
  afternoonStatus: yup.string().notRequired(),
  nightWeather: yup.string().notRequired(),
  nightStatus: yup.string().notRequired(),
  activity: yup.string().notRequired(),
  certificateDescription: yup.string().notRequired(),
  containerDescription: yup.string().notRequired(),
  containerStatus: yup.string().notRequired(),
  image: yup.array().of(
    yup.object().shape({
      imageUrl: yup.string().notRequired(),
      imageTitle: yup.string().notRequired(),
      imageDescription: yup.string().notRequired()
    })
  )
});

export default function CarCertificateForm({ route }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    reset,
    resetField
  } = useForm<CarCertificateFormProps>({
    resolver: yupResolver(CarCertificateFormSchema),
    defaultValues: {
      morningWeather: '',
      morningStatus: '',
      afternoonWeather: '',
      afternoonStatus: '',
      nightWeather: '',
      nightStatus: '',
      activity: '',
      certificateDescription: '',
      containerDescription: '',
      containerStatus: '',
      image: []
    }
  });

  const { data: dataCar, mode: modeCar } = route.params;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'image'
  });

  useEffect(() => {
    const formData = watch();
    Object.keys(formData).forEach((key) => {
      if (key === 'image') {
        setValue(key, []);
      } else {
        setValue(key, '');
      }
    });
    if (dataCar && (modeCar === 'edit' || modeCar === 'view')) {
      Object.keys(dataCar).forEach((key) => {
        setValue(key, dataCar[key]);
        if (key === 'image') {
          const images = dataCar[key];
          images.map((image) => {
            append({
              imageTitle: image.imageTitle,
              imageDescription: image.imageDescription,
              imageUrl: image.imageUrl
            });
          });
        }
      });
    }
  }, [modeCar, dataCar]);

  const [isLoading, setIsLoading] = useState(false);

  const isViewing = modeCar === 'view';
  const ref = React.useRef(null);
  useScrollToTop(ref);

  const navigation = useNavigation();

  const realm = useRealm();

  const values = getValues();

  function handleBack() {
    navigation.navigate('newCarCertificateForm');
  }

  function getImageByIndex(index: number) {
    return String(getValues(`image.${index}.imageUrl`));
  }

  async function handleNewFormRegister() {
    try {
      if (modeCar === 'edit' || modeCar === 'view') {
        const objectId = new ObjectId(dataCar._id);
        let item = realm
          .objects(CarFormSchema)
          .filtered('_id == $0', objectId.toString());
        if (item) {
          setIsLoading(true);
          realm.write(() => {
            Object.keys(dataCar).forEach((key) => {
              item[0][key] = getValues()[key];
            });
          });

          handleBack();
          Alert.alert('Sucesso', 'Formulário atualizado com sucesso!');
        }
      } else {
        setIsLoading(true);
        realm.write(() => {
          return realm.create(CarFormSchema, {
            ...values
          });
        });
        handleBack();
        Alert.alert('Sucesso', 'Formulário cadastrado com sucesso!');
      }
    } catch (error) {
      Alert.alert(
        'Erro',
        'Algo inesperado aconteceu. Entre em contato com o administrador!'
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const addNewImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Você precisa conceder permissão para acessar suas fotos!');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }
    const base64 = await FileSystem.readAsStringAsync(pickerResult.uri, {
      encoding: 'base64'
    });
    append({
      imageUrl: base64,
      imageTitle: '',
      imageDescription: ''
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView ref={ref}>
      <VStack bgColor="gray.100" flex={1} alignItems="center" px={8}>
        <Heading mt="60px" mb="12">
          Formulário de Cargas
        </Heading>
        <Text fontSize="md" h={10}>
          Detalhes do Certificado
        </Text>
        <Box>
          <Text>Número do Container</Text>
          <Controller
            control={control}
            name="containerNumber"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="1207"
                onChangeText={onChange}
                errorText={errors.containerNumber?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Tipo do Container</Text>
          <Controller
            control={control}
            name="containerType"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="20sd"
                onChangeText={onChange}
                errorText={errors.containerType?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Data do Relatório</Text>
          <Controller
            control={control}
            name="reportDate"
            render={({ field: { onChange, value } }) => (
              <InputMasked
                value={value}
                placeholder="23/01/2014"
                onChangeText={onChange}
                errorText={errors.reportDate?.message}
                isDisabled={isViewing}
                editable={true}
                keyboardType="numeric"
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Dia da Semana</Text>
          <Controller
            control={control}
            name="day"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Segunda-Feira"
                onChangeText={onChange}
                errorText={errors.day?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Nome do Cliente</Text>
          <Controller
            control={control}
            name="clientName"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Elo Consultoria"
                onChangeText={onChange}
                errorText={errors.clientName?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Setor</Text>
          <Controller
            control={control}
            name="sector"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="CFS"
                onChangeText={onChange}
                errorText={errors.sector?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Local</Text>
          <Controller
            control={control}
            name="local"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Tecon Suape"
                onChangeText={onChange}
                errorText={errors.local?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Contratante</Text>
          <Controller
            control={control}
            name="contractor"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Nome do Contratante"
                onChangeText={onChange}
                errorText={errors.contractor?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Responsável</Text>
          <Controller
            control={control}
            name="responsible"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Nome do Colaborador"
                onChangeText={onChange}
                errorText={errors.responsible?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Função</Text>
          <Controller
            control={control}
            name="function"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Cargo do Colaborador"
                onChangeText={onChange}
                errorText={errors.function?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Horário de Entrada</Text>
          <Controller
            control={control}
            name="entryTime"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="12:00"
                onChangeText={onChange}
                errorText={errors.entryTime?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Horário de Saída</Text>
          <Controller
            control={control}
            name="exitTime"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="17:00"
                onChangeText={onChange}
                errorText={errors.exitTime?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Turno</Text>
          <Controller
            control={control}
            name="turnTime"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="B"
                onChangeText={onChange}
                errorText={errors.turnTime?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Horário de Entrada do Intervalo</Text>
          <Controller
            control={control}
            name="breakIn"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="12:00"
                onChangeText={onChange}
                errorText={errors.breakIn?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Horário de Saída do Intervalo</Text>
          <Controller
            control={control}
            name="breakOut"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="13:00"
                onChangeText={onChange}
                errorText={errors.breakOut?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Turno</Text>
          <Controller
            control={control}
            name="breakTurn"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="A"
                onChangeText={onChange}
                errorText={errors.breakTurn?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Text fontSize="md" h={10}>
          Condições Climáticas
        </Text>
        <Box>
          <Text>Tempo (Manhã)</Text>
          <Controller
            control={control}
            name="morningWeather"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Clima ensolarado"
                onChangeText={onChange}
                errorText={errors.morningWeather?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Condição (Manhã)</Text>
          <Controller
            control={control}
            name="morningStatus"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Clima ensolarado"
                onChangeText={onChange}
                errorText={errors.morningStatus?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Tempo (Tarde)</Text>
          <Controller
            control={control}
            name="afternoonWeather"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Tempo com chuva"
                onChangeText={onChange}
                errorText={errors.afternoonWeather?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Condição (Tarde)</Text>
          <Controller
            control={control}
            name="afternoonStatus"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Tempo com chuva"
                onChangeText={onChange}
                errorText={errors.afternoonStatus?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Tempo (Noite)</Text>
          <Controller
            control={control}
            name="nightWeather"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Tempo limpo"
                onChangeText={onChange}
                errorText={errors.afternoonWeather?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Condição (Noite)</Text>
          <Controller
            control={control}
            name="nightStatus"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Tempo limpo"
                onChangeText={onChange}
                errorText={errors.afternoonStatus?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Text fontSize="md" h={10}>
          Descrições do Formulário
        </Text>
        <HStack>
          <Box>
            <Text>Atividade</Text>

            <Controller
              control={control}
              name="activity"
              render={({ field: { onChange, value } }) => (
                <SelectModal
                  onselect={setValue}
                  fieldName="activity"
                  fieldArray={modalActivity}
                  fieldPlaceholder="Atividade"
                />
              )}
            ></Controller>
          </Box>
        </HStack>
        <Box>
          <Text>Descrição</Text>
          <Controller
            control={control}
            name="certificateDescription"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Escreva aqui as descrições"
                onChangeText={onChange}
                errorText={errors.certificateDescription?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Descrição do Container</Text>
          <Controller
            control={control}
            name="containerDescription"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Escreva aqui as descrições do container"
                onChangeText={onChange}
                errorText={errors.containerDescription?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box>
          <Text>Status do Container</Text>
          <Controller
            control={control}
            name="containerStatus"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Escreva aqui o status do container"
                onChangeText={onChange}
                errorText={errors.containerStatus?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>
        <Box px={5}>
          <Box px={5}>
            <Button text="Adicionar Imagem" width={48} onPress={addNewImage} />
          </Box>
        </Box>
        {fields?.map((field, index) => {
          return (
            <Box key={field.id} alignItems="center" my={5}>
              <TouchableNativeFeedback>
                <Box w="80%" h="200" alignItems="center" mb={5}>
                  {/* <Box
                backgroundColor="orange.300"
                p="7px"
                borderRadius={20}
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  bottom: 10,
                  right: 20
                }}
              >
                <Feather name="edit" size={24} color="black" />
              </Box> */}
                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${getImageByIndex(index)}`
                    }}
                    alt="Imagem"
                    resizeMode="cover"
                    flex={1}
                    borderRadius={20}
                    style={{
                      width: 350,
                      height: 40,
                      borderRadius: 12
                    }}
                  />
                </Box>
              </TouchableNativeFeedback>
              <HStack>
                <Box>
                  <Text>Título da Imagem</Text>
                  <Controller
                    key={field.id}
                    control={control}
                    name={`image.${index}.imageTitle`}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value}
                        placeholder="Título"
                        onChangeText={onChange}
                        errorText={errors.local?.message}
                        isDisabled={isViewing}
                        setWidth="350px"
                      />
                    )}
                  ></Controller>
                </Box>
              </HStack>

              <HStack>
                <Box>
                  <Text>Descrição da Imagem</Text>
                  <Controller
                    control={control}
                    name={`image.${index}.imageDescription`}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value}
                        placeholder="Descrição da Imagem"
                        onChangeText={onChange}
                        errorText={errors.local?.message}
                        isDisabled={isViewing}
                        setWidth="350px"
                      />
                    )}
                  ></Controller>
                </Box>
              </HStack>

              <Box px={5}>
                <Button
                  text="Remover Imagem"
                  width={48}
                  backgroundColor="red.500"
                  onPress={() => remove(index)}
                />
              </Box>
            </Box>
          );
        })}
        {modeCar !== 'view' && (
          <Button
            text={
              modeCar === 'edit' ? 'Atualizar Formulário' : 'Enviar Formulário'
            }
            width="full"
            mb={8}
            onPress={handleSubmit(handleNewFormRegister)}
          />
        )}
      </VStack>
    </ScrollView>
  );
}
