import { useQuery } from '@realm/react';
import { Heading, VStack, ScrollView, Divider } from 'native-base';
import FormTable from '../components/FormTable';
import Card from '../components/Card/Index';
import useGenerateCarForm from '../hooks/useGenerateCarForm';

export default function NewCarFormPage({ navigation }) {
  const { generateDocx, generatePdf } = useGenerateCarForm();
  const tasks = useQuery('CarFormSchema');
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
        {tasks.map((item, index) => {
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
