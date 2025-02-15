import {
  VStack,
  Heading,
  Text,
  ScrollView,
  Box,
  HStack,
  Image,
  Divider,
} from "native-base";
import React from "react";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { Alert, TouchableNativeFeedback } from "react-native";
import { useRealm } from "@realm/react";
import { useEffect } from "react";
import { ObjectId } from "bson";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import { ModalImageDescription } from "../data/ModalImageDescription";
import { LashingFormSchema } from "../models/lashingFormSchema";
import Input from "../components/Input";
import Button from "../components/Button";
import ModalText from "../components/TextModal";
import LoadingScreen from "../components/LoadingScreen";
import InputMasked from "../components/InputMasked";
import { useLoading } from "../context/LoadingContext";

type Image = {
  imageUrl: any;
  imageTitle: any;
  imageDescription: any;
};

type NewCargo = {
  newCargoNumber: any;
  newCargoDescription: any;
  newCargoDimensions: any;
  newCargoWeight: any;
};

type NewMaterial = {
  newMaterialNumber: any;
  newMaterialDescription: any;
  newMaterialQuantity: any;
  newMaterialSWL: any;
};

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
  image: Image[];
  newCargo: NewCargo[];
  newMaterial: NewMaterial[];
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
    yup.object().shape({
      imageUrl: yup.string().required("Informe a URL da imagem"),
      imageTitle: yup.string().required("Informe o título da imagem"),
      imageDescription: yup.string(),
    })
  ),
  newCargo: yup.array().of(
    yup.object().shape({
      newMaterialNumber: yup.string(),
      newMaterialDescription: yup.string(),
      newMaterialQuantity: yup.string(),
      newMaterialSWL: yup.string(),
    })
  ),
  newMaterial: yup.array().of(
    yup.object().shape({
      newMaterialNumber: yup.string(),
      newMaterialDescription: yup.string(),
      newMaterialQuantity: yup.string(),
      newMaterialSWL: yup.string(),
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
    resetField,
  } = useForm<LashingCertificateFormProps>({
    resolver: yupResolver(LashingCertificateFormSchema),
  });

  const { data: dataLashing, mode: modeLashing } = route.params;

  const {
    fields: imageFields,
    append: imageAppend,
    remove: imageRemove,
  } = useFieldArray({
    control,
    name: "image",
  });

  const {
    fields: cargoFields,
    append: cargoAppend,
    remove: cargoRemove,
  } = useFieldArray({
    control,
    name: "newCargo",
  });

  const {
    fields: materialFields,
    append: materialAppend,
    remove: materialRemove,
  } = useFieldArray({
    control,
    name: "newMaterial",
  });

  useEffect(() => {
    if (dataLashing && (modeLashing === "edit" || modeLashing === "view")) {
      Object.keys(dataLashing).forEach((key) => {
        setValue(key, dataLashing[key]);
        if (key === "image") {
          const images = dataLashing[key];
          images.map((image) => {
            imageAppend({
              imageTitle: image.imageTitle,
              imageDescription: image.imageDescription,
              imageUrl: image.imageUrl,
            });
          });
        }
        if (key === "newCargo") {
          const newCargos = dataLashing[key];
          newCargos.map((newCargo) => {
            cargoAppend({
              newCargoNumber: newCargo.newCargoNumber,
              newCargoDescription: newCargo.newCargoDescription,
              newCargoDimensions: newCargo.newCargoDimensions,
              newCargoWeight: newCargo.newCargoWeight,
            });
          });
        }
        if (key === "newMaterial") {
          const newMaterials = dataLashing[key];
          newMaterials.map((newMaterial) => {
            materialAppend({
              newMaterialNumber: newMaterial.newMaterialNumber,
              newMaterialDescription: newMaterial.newMaterialDescription,
              newMaterialQuantity: newMaterial.newMaterialQuantity,
              newMaterialSWL: newMaterial.newMaterialSWL,
            });
          });
        }
      });
    } else {
      const formData = watch();
      Object.keys(formData).forEach((key) => {
        if (key === "image" || key === "newCargo" || key === "newMaterial") {
          setValue(key, []);
        } else {
          setValue(key, "");
        }
      });
    }
  }, [modeLashing, dataLashing]);

  const { isLoading, setIsLoading } = useLoading();

  const isViewing = modeLashing === "view";

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const navigation = useNavigation();

  const realm = useRealm();

  const values = getValues();

  function handleBack() {
    navigation.navigate("newLashingCertificate");
  }

  function getImageByIndex(index: number) {
    return String(getValues(`image.${index}.imageUrl`));
  }

  async function handleNewFormRegister() {
    try {
      if (modeLashing === "edit") {
        const objectId = new ObjectId(dataLashing._id);
        let item = realm
          .objects(LashingFormSchema)
          .filtered("_id == $0", objectId.toString());
        if (item) {
          setIsLoading(true);
          if (!item[0]._id) {
            item[0]._id = new Realm.BSON.ObjectID().toHexString();
          }
          realm.write(() => {
            Object.keys(dataLashing).forEach((key) => {
              item[0][key] = getValues()[key];
            });
          });

          handleBack();
          Alert.alert("Sucesso", "Formulário atualizado com sucesso!");
        } else {
          Alert.alert(
            "Erro",
            "Formulário não possui ID, por favor re-crie e tente novamente!"
          );
        }
      } else {
        setIsLoading(true);
        realm.write(() => {
          return realm.create(LashingFormSchema, {
            _id: new Realm.BSON.ObjectID().toHexString(),
            ...values,
          });
        });
        handleBack();
        Alert.alert("Sucesso", "Formulário cadastrado com sucesso!");
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "Algo inesperado aconteceu. Entre em contato com o administrador!"
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const addNewCargoDetails = async () => {
    cargoAppend({
      newCargoNumber: "",
      newCargoDescription: "",
      newCargoDimensions: "",
      newCargoWeight: "",
    });
  };

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
    imageAppend({
      imageTitle: "",
      imageDescription: "",
      imageUrl: base64,
    });
  };

  const addNewCameraImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Você precisa conceder permissão para acessar suas fotos!");
      return;
    }
    const pickerResult = await ImagePicker.launchCameraAsync();
    if (pickerResult.canceled === true) {
      return;
    }
    const base64 = await FileSystem.readAsStringAsync(pickerResult.uri, {
      encoding: "base64",
    });
    imageAppend({
      imageTitle: "",
      imageDescription: "",
      imageUrl: base64,
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

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
                keyboardType="numeric"
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
                value={value}
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
                keyboardType="numeric"
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
                keyboardType="numeric"
              />
            )}
          ></Controller>
        </Box>
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

        <Divider my="4" backgroundColor="gray.400" />

        <Text fontSize="md" h={10}>
          Detalhes do Carregamento
        </Text>
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
                keyboardType="numeric"
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
        {cargoFields?.map((field, index) => {
          return (
            <Box key={index} width="full" alignItems="center">
              <Text fontSize="md" h={10}>
                Novo Carregamento
              </Text>
              <Box>
                <Text>Número do carregamento</Text>
                <Controller
                  control={control}
                  name={`newCargo.${index}.newCargoNumber`}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      defaultValue={value}
                      placeholder="1"
                      onChangeText={onChange}
                      errorText={errors.cargoNumber?.message}
                      isDisabled={isViewing}
                      keyboardType="numeric"
                    />
                  )}
                ></Controller>
              </Box>
              <Box>
                <Text>Descrição do carregamento</Text>
                <Controller
                  control={control}
                  name={`newCargo.${index}.newCargoDescription`}
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
                  name={`newCargo.${index}.newCargoDimensions`}
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
                  name={`newCargo.${index}.newCargoWeight`}
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
              <Box px={5}>
                <Button
                  text="Remover Carregamento"
                  width={280}
                  mb={5}
                  backgroundColor="red.500"
                  onPress={() => cargoRemove(index)}
                />
              </Box>
            </Box>
          );
        })}
        <Box px={5}>
          <Box px={5} mb={5}>
            <Button
              text="Adicionar Carregamento"
              width={280}
              backgroundColor="#fb923d"
              onPress={addNewCargoDetails}
            />
          </Box>
        </Box>

        <Divider my="4" backgroundColor="gray.400" />

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
                keyboardType="numeric"
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
                keyboardType="numeric"
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
        {materialFields?.map((field, index) => {
          return (
            <Box key={index} width="full" alignItems="center">
              <Text fontSize="md" h={10}>
                Novo Material de Amarração
              </Text>
              <Box>
                <Text>Número do Material</Text>
                <Controller
                  control={control}
                  name={`newMaterial.${index}.newMaterialNumber`}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      defaultValue={value}
                      placeholder="1"
                      onChangeText={onChange}
                      errorText={errors.materialNumber?.message}
                      isDisabled={isViewing}
                      keyboardType="numeric"
                    />
                  )}
                ></Controller>
              </Box>
              <Box>
                <Text>Descrição do Material</Text>
                <Controller
                  control={control}
                  name={`newMaterial.${index}.newMaterialDescription`}
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
                  name={`newMaterial.${index}.newMaterialQuantity`}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      defaultValue={value}
                      placeholder="12"
                      onChangeText={onChange}
                      errorText={errors.materialQuantity?.message}
                      isDisabled={isViewing}
                      keyboardType="numeric"
                    />
                  )}
                ></Controller>
              </Box>
              <Box>
                <Text>Carga de trabalho segura do Material</Text>
                <Controller
                  control={control}
                  name={`newMaterial.${index}.newMaterialSWL`}
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
              <Box px={5}>
                <Button
                  text="Remover Material de Amarração"
                  width={280}
                  mb={5}
                  backgroundColor="red.500"
                  onPress={() => materialRemove(index)}
                />
              </Box>
            </Box>
          );
        })}
        <Box px={5}>
          <Box px={5} mb={5}>
            <Button
              text="Adicionar Material de Amarração"
              width={280}
              backgroundColor="#fb923d"
              onPress={materialAppend}
            />
          </Box>
        </Box>

        <Divider my="4" backgroundColor="gray.400" />

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
                keyboardType="numeric"
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

        {imageFields?.map((field, index) => {
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
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value}
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
                  fieldHeader="Sugestões de Descrição"
                  fieldArray={ModalImageDescription}
                />
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
                  fieldHeader="Sugestões de Descrição"
                  fieldArray={ModalImageDescription}
                />
              </HStack>

              <Box px={5}>
                <Button
                  text="Remover Imagem"
                  width={280}
                  backgroundColor="red.500"
                  onPress={() => imageRemove(index)}
                />
              </Box>
            </Box>
          );
        })}
        <HStack alignItems="center" justifyContent="center" px={5} mb={5}>
          <Box px={5}>
            <Button
              text="Adicionar Imagem"
              width={230}
              backgroundColor="#fb923d"
              onPress={addNewImage}
            />
          </Box>
          <TouchableNativeFeedback onPress={addNewCameraImage}>
            <Box backgroundColor="#fb923d" borderRadius={10} p={3}>
              <Entypo name="camera" size={24} color="white" />
            </Box>
          </TouchableNativeFeedback>
        </HStack>
        {isLoading ? (
          <Box
            width="full"
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            height={12}
            mb={8}
            backgroundColor="#F1DEC6"
            borderRadius={13}
          >
            <MaterialCommunityIcons
              name="progress-download"
              size={30}
              color="white"
            />
            <Text color="white" fontSize={16} px={2}>
              Carregando...
            </Text>
          </Box>
        ) : (
          <Button
            text={
              modeLashing === "edit"
                ? "Atualizar Formulário"
                : "Enviar Formulário"
            }
            width="full"
            mb={8}
            backgroundColor="#fb923d"
            onPress={handleNewFormRegister}
          />
        )}
      </VStack>
    </ScrollView>
  );
}
