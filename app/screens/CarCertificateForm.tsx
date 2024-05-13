import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { useRealm } from '@realm/react';
import { ObjectId } from 'bson';

import { Box, Heading, ScrollView, Text, VStack } from 'native-base';
import Input from '../components/Input';
import LoadingScreen from '../components/LoadingScreen';
import InputMasked from '../components/InputMasked';
import { CarFormSchema } from '../models/carFormSchema';
import { Alert } from 'react-native';
import Button from '../components/Button';

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
  breakIn: string;
  breakOut: string;
};

const CarCertificateFormSchema = yup.object({
  containerNumber: yup.string().required('Informe o número do container'),
  containerType: yup.string().required(''),
  reportDate: yup.string().required(''),
  day: yup.string().required(''),
  clientName: yup.string().required(''),
  sector: yup.string().required(''),
  local: yup.string().required(''),
  contractor: yup.string().required(''),
  responsible: yup.string().required(''),
  function: yup.string().required(''),
  entryTime: yup.string().required(''),
  exitTime: yup.string().required(''),
  breakIn: yup.string().required(''),
  breakOut: yup.string().required('')
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
    // resolver: yupResolver(CarCertificateFormSchema)
  });

  const { data: dataCar, mode: modeCar } = route.params;

  useEffect(() => {
    if (dataCar && (modeCar === 'edit' || modeCar === 'view')) {
      Object.keys(dataCar).forEach((key) => {
        setValue(key, dataCar[key]);
      });
    } else {
      reset();
    }
  }, [dataCar]);

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView ref={ref}>
      <VStack bgColor="gray.100" flex={1} alignItems="center" px={8}>
        <Heading mt="60px" mb="12">
          Formulário de Carros
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
        {modeCar !== 'view' && (
          <Button
            text={
              modeCar === 'edit' ? 'Atualizar Formulário' : 'Enviar Formulário'
            }
            width="full"
            onPress={handleSubmit(handleNewFormRegister)}
          />
        )}
      </VStack>
    </ScrollView>
  );
}
