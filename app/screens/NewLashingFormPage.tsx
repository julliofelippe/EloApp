import { useQuery } from '@realm/react';
import { Heading, VStack, ScrollView, Divider, HStack } from 'native-base';
import React from 'react';

import Card from '../components/Card/Index';
import useGenerateLashingForm from '../hooks/useGenerateLashingForm';
import FormTable from '../components/FormTable';
import SearchBar from '../components/SearchBar';
import DateInput from '../components/DateInput';

export default function NewLashingFormPage({ navigation }) {
  const { generateDocx, generatePdf, downloadPdf } = useGenerateLashingForm();
  const [searchValue, setSearchValue] = React.useState('');
  const [dataValue, setDataValue] = React.useState('');
  const tasks = useQuery('LashingFormSchema');

  const filteredTasks = tasks
    .filter((item) => item.certificateNumber.includes(searchValue))
    .filter((item) => item.date.includes(dataValue));

  return (
    <ScrollView>
      <VStack flex={1} alignItems="center" justifyContent="center" my={8}>
        <Heading>Certificados de Peação</Heading>
        <Card
          navigation={navigation}
          formTitle="Certificado de Amarração"
          buttonTitle="Novo Formulário"
          icon="file-medical"
          route="lashingCertificate"
        />
        <Divider my="2" backgroundColor="gray.500" />
        <HStack space={3}>
          <SearchBar
            value={searchValue}
            setValue={setSearchValue}
            placeholder="Número do Relatório"
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
              formNumber={item.certificateNumber}
              formDate={item.date}
              navigation={navigation}
              route="lashingCertificate"
              generateDocxFunction={generateDocx}
              generatePdfFunction={generatePdf}
              downloadPdfFunction={downloadPdf}
            />
          );
        })}
      </VStack>
    </ScrollView>
  );
}
