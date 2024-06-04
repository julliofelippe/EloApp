import { useQuery } from '@realm/react';
import { Heading, VStack, ScrollView, Divider, HStack } from 'native-base';
import React from 'react';

import useGenerateCarForm from '../hooks/useGenerateCarForm';
import SearchBar from '../components/SearchBar';
import DateInput from '../components/DateInput';
import FormTable from '../components/FormTable';
import Card from '../components/Card/Index';

export default function NewCarFormPage({ navigation }) {
  const { generateDocx, generatePdf } = useGenerateCarForm();
  const [searchValue, setSearchValue] = React.useState('');
  const [dataValue, setDataValue] = React.useState('');
  const tasks = useQuery('CarFormSchema');

  const filteredTasks = tasks
    .filter((item) => item.containerNumber.includes(searchValue))
    .filter((item) => item.reportDate.includes(dataValue));

  return (
    <ScrollView>
      <VStack flex={1} alignItems="center" justifyContent="center" my={8}>
        <Heading>Relatório Diário de Carga</Heading>
        <Card
          navigation={navigation}
          formTitle="Relatório de Carga"
          buttonTitle="Novo Formulário"
          icon="file-medical"
          route="carCertificateForm"
        />
        <Divider my="2" backgroundColor="gray.500" />
        <HStack space={3}>
          <SearchBar
            value={searchValue}
            setValue={setSearchValue}
            placeholder="Número do Container"
          />
          <DateInput
            value={dataValue}
            setValue={setDataValue}
            placeholder="dd/mm/yyyy"
          />
        </HStack>
        {filteredTasks.map((item, index) => {
          return (
            <FormTable
              item={item}
              formName="Relatório"
              formNumber={item.containerNumber}
              formDate={item.reportDate}
              navigation={navigation}
              route="carCertificateForm"
              generateDocxFunction={generateDocx}
              generatePdfFunction={generatePdf}
            />
          );
        })}
      </VStack>
    </ScrollView>
  );
}
