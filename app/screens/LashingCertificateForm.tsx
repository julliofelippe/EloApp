import {
  VStack,
  Heading,
  Text,
  ScrollView,
  Box,
  HStack,
  Image,
} from "native-base";
import React, { useState } from "react";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { Alert, TouchableNativeFeedback } from "react-native";

import Input from "../components/Input";
import Button from "../components/Button";
import { LashingFormSchema } from "../models/lashingFormSchema";
import { useRealm } from "@realm/react";
import { useEffect } from "react";
import ModalText from "../components/TextModal";
import InputMasked from "../components/InputMasked";

type LashingCertificateFormProps = {
  clientName: string;
  certificateNumber: string;
  date: string;
  containersNumber: string;
  reservationNumber: string;
  loadingPort: string;
  destinationPort: string;
  cargoNumber: string;
  cargoDescription: string;
  cargoDimensions: string;
  cargoWeight: string;
  materialNumber: string;
  materialDescription: string;
  materialQuantity: string;
  materialSWL: string;
  cintasQuantity: string;
  companyName: string;
  cargoLateralExcess: string;
  cargoHeightExcess: string;
  cargoDate: string;
  image: {
    imageUrl: string;
    imageTitle: string;
    imageDescription: string;
  };
};

const LashingCertificateFormSchema = yup.object({
  clientName: yup.string().required("Informe o nome do cliente"),
  certificateNumber: yup.string().required("Informe o número do certificado"),
  date: yup.string().required("Informe a data do certificado"),
  containersNumber: yup.string().required("Informe o número do container"),
  reservationNumber: yup.string().required("Informe o número da reserva"),
  loadingPort: yup.string().required("Informe o porto de carregamento"),
  destinationPort: yup.string().required("Informe o porto de destino"),
  cargoNumber: yup.string().required("Informe o número do carregamento"),
  cargoDescription: yup
    .string()
    .required("Informe a descrição do carregamento"),
  cargoDimensions: yup
    .string()
    .required("Informe as dimensões do carregamento"),
  cargoWeight: yup.string().required("Informe o peso do carregamento"),
  materialNumber: yup.string().required("Informe o número do material"),
  materialDescription: yup.string().required("Informe a descrição do material"),
  materialQuantity: yup.string().required("Informe a quantidade do material"),
  materialSWL: yup
    .string()
    .required("Informe a Carga de trabalho segura do material"),
  cintasQuantity: yup.string().required("Informe a quantidade de cintas/nine"),
  companyName: yup
    .string()
    .required("Informe o nome da empresa que forneceu o material"),
  cargoLateralExcess: yup
    .string()
    .required("Informe o tamanho do excesso lateral da carga"),
  cargoHeightExcess: yup
    .string()
    .required("Informe o tamano do excesso de altura da carga"),
  cargoDate: yup.string().required("Informe a data do carregamento"),
  image: yup.array().of(
    yup.object({
      imageTitle: yup.string().required("Informe o título da imagem"),
      imageDescription: yup.string().required("Informe a descrição da imagem"),
    })
  ),
});

export default function LashingCertificateForm({ route }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    reset,
  } = useForm<LashingCertificateFormProps>({
    resolver: yupResolver(LashingCertificateFormSchema),
  });

  const { data, mode } = route.params;

  const isViewing = mode === "view";

  useEffect(() => {
    if (data && (mode === "edit" || mode === "view")) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
    }
    if (mode === "create") {
      reset();
    }
  }, [data]);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "image",
  });

  const navigation = useNavigation();
  const realm = useRealm();
  const values = getValues();

  function handleBack() {
    navigation.navigate("lashingCertificate");
  }

  function getImageByIndex(index: number) {
    return String(getValues(`image.${index}.imageUrl`));
  }

  async function handleNewFormRegister() {
    try {
      if (mode === "edit" || mode === "view") {
        const { ObjectId } = require("bson");
        const objectId = new ObjectId(data._id);
        let item = realm
          .objects(LashingFormSchema)
          .filtered("_id == $0", objectId);
        if (item) {
          realm.write(() => {
            Object.keys(data).forEach((key) => {
              item[0][key] = getValues()[key];
            });
          });
          handleBack();
        }
      } else {
        realm.write(() => {
          return realm.create(LashingFormSchema, {
            ...values,
          });
        });
        Alert.alert("Chamado", "Formulário cadastrado com sucesso!");
        handleBack();
      }
    } catch (error) {
      Alert.alert("Erro", "Preencha todos os campos do formulário!");
      console.log(error);
    }
  }

  const addNewImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Você precisa conceder permissão para acessar suas fotos!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }
    const base64 = await FileSystem.readAsStringAsync(pickerResult.uri, {
      encoding: "base64",
    });
    append({
      imageTitle: "",
      imageDescription: "",
      imageUrl: base64,
    });
  };

  return (
    <ScrollView ref={ref}>
      <VStack bgColor="gray.100" flex={1} alignItems="center" px={8}>
        <Heading mt="60px" mb="12">
          Lashing Certificate Form
        </Heading>

        <Text fontSize="md" h={10}>
          Detalhes do Certificado
        </Text>

        <Box>
          <Text>Nome do cliente</Text>
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
          <Text> Número do certificado</Text>
          <Controller
            control={control}
            name="certificateNumber"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="4546"
                onChangeText={onChange}
                errorText={errors.certificateNumber?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Box>
          <Text>Data do Certificado</Text>

          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <InputMasked
                defaultValue={value}
                placeholder="23/01/2014"
                onChangeText={onChange}
                errorText={errors.date?.message}
                isDisabled={isViewing}
                editable={true}
                keyboardType="numeric"
              />
            )}
          ></Controller>
        </Box>

        <Box>
          <Text>Número do container</Text>
          <Controller
            control={control}
            name="containersNumber"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="8745723"
                onChangeText={onChange}
                errorText={errors.containersNumber?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Box>
          <Text>Número da Reserva</Text>
          <Controller
            control={control}
            name="reservationNumber"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="78492"
                onChangeText={onChange}
                errorText={errors.reservationNumber?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Text fontSize="md" h={10}>
          Detalhes do Carregamento
        </Text>

        <Box>
          <Text>Porto de origem</Text>
          <Controller
            control={control}
            name="loadingPort"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Porto de Suape"
                onChangeText={onChange}
                errorText={errors.loadingPort?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Box>
          <Text>Porto de destino</Text>
          <Controller
            control={control}
            name="destinationPort"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Porto de Los Angeles"
                onChangeText={onChange}
                errorText={errors.destinationPort?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Box>
          <Text>Número do carregamento</Text>
          <Controller
            control={control}
            name="cargoNumber"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="1"
                onChangeText={onChange}
                errorText={errors.cargoNumber?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Box>
          <Text>Descrição do carregamento</Text>
          <Controller
            control={control}
            name="cargoDescription"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Barco NX 340"
                onChangeText={onChange}
                errorText={errors.cargoDescription?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Box>
          <Text>Dimensões do Carregamento</Text>
          <Controller
            control={control}
            name="cargoDimensions"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="10m x 3m x 12m"
                onChangeText={onChange}
                errorText={errors.cargoDimensions?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Box>
          <Text>Peso do Carregamento</Text>
          <Controller
            control={control}
            name="cargoWeight"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="76,5kg"
                onChangeText={onChange}
                errorText={errors.cargoWeight?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Text fontSize="md" h={10}>
          Detalhes do Material de Amarração
        </Text>

        <Box>
          <Text>Número do Material</Text>
          <Controller
            control={control}
            name="materialNumber"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="1"
                onChangeText={onChange}
                errorText={errors.materialNumber?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Box>
          <Text>Descrição do Material</Text>
          <Controller
            control={control}
            name="materialDescription"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Correias de amarração"
                onChangeText={onChange}
                errorText={errors.materialDescription?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Box>
          <Text>Quantidade do Material</Text>
          <Controller
            control={control}
            name="materialQuantity"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="12"
                onChangeText={onChange}
                errorText={errors.materialQuantity?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Box>
          <Text>Carga de trabalho segura do Material</Text>
          <Controller
            control={control}
            name="materialSWL"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="6 t (para cada correia de amarração)"
                onChangeText={onChange}
                errorText={errors.materialSWL?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Text fontSize="md" h={10}>
          Observações do Carregamento
        </Text>

        <Box>
          <Text>Quantidade de Cintas</Text>
          <Controller
            control={control}
            name="cintasQuantity"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="26"
                onChangeText={onChange}
                errorText={errors.cintasQuantity?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Box>
          <Text>Nome da empresa que forneceu o material</Text>
          <Controller
            control={control}
            name="companyName"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="Coca-Cola"
                onChangeText={onChange}
                errorText={errors.companyName?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Box>
          <Text>Excesso lateral da carga</Text>
          <Controller
            control={control}
            name="cargoLateralExcess"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="12cm"
                onChangeText={onChange}
                errorText={errors.cargoLateralExcess?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Box>
          <Text>Excesso de altura da carga</Text>
          <Controller
            control={control}
            name="cargoHeightExcess"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="32cm"
                onChangeText={onChange}
                errorText={errors.cargoHeightExcess?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Box>
          <Text>Data do Carregamento</Text>
          <Controller
            control={control}
            name="cargoDate"
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={value}
                placeholder="08 de Junho de 2023"
                onChangeText={onChange}
                errorText={errors.cargoDate?.message}
                isDisabled={isViewing}
              />
            )}
          ></Controller>
        </Box>

        <Box px={5}>
          <Button text="Adicionar Imagem" width={48} onPress={addNewImage} />
        </Box>

        {fields.map((field, index) => {
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
                      uri: `data:image/jpeg;base64,${getImageByIndex(index)}`,
                    }}
                    alt="Imagem"
                    resizeMode="cover"
                    flex={1}
                    borderRadius={20}
                    style={{
                      width: 350,
                      height: 40,
                      borderRadius: 12,
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
                    render={({ field: { onChange } }) => (
                      <Input
                        value={getValues(`image.${index}.imageTitle`)}
                        placeholder="Barco NX 340"
                        onChangeText={onChange}
                        errorText={errors.cargoDate?.message}
                        isDisabled={isViewing}
                        setWidth="320px"
                      />
                    )}
                  ></Controller>
                </Box>
                <ModalText
                  onSelect={setValue}
                  fieldName={`image.${index}.imageTitle`}
                />
              </HStack>

              <HStack>
                <Box>
                  <Text>Descrição da Imagem</Text>
                  <Controller
                    control={control}
                    name={`image.${index}.imageDescription`}
                    render={({ field: { onChange } }) => (
                      <Input
                        value={getValues(`image.${index}.imageDescription`)}
                        placeholder="Descrição da Imagem"
                        onChangeText={onChange}
                        errorText={errors.cargoDate?.message}
                        isDisabled={isViewing}
                        setWidth="320px"
                      />
                    )}
                  ></Controller>
                </Box>
                <ModalText
                  onSelect={setValue}
                  fieldName={`image.${index}.imageDescription`}
                />
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
        {mode !== "view" && (
          <Button
            text={
              mode === "edit" ? "Atualizar Formulário" : "Enviar Formulário"
            }
            width="full"
            onPress={handleSubmit(handleNewFormRegister)}
          />
        )}
      </VStack>
    </ScrollView>
  );
}
