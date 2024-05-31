import { useQuery } from '@realm/react';
import { Heading, VStack, ScrollView, Divider } from 'native-base';
import FormTable from '../components/FormTable';
import Card from '../components/Card/Index';
import useGenerateLashingForm from '../hooks/useGenerateLashingForm';

export default function NewLashingFormPage({ navigation }) {
  const { generateDocx, generatePdf } = useGenerateLashingForm();
  const tasks = useQuery('LashingFormSchema');
  return (
    <ScrollView>
      <VStack flex={1} alignItems="center" justifyContent="center" my={8}>
        <Heading>Certificados de Amarração</Heading>
        <Card
          navigation={navigation}
          formTitle="Certificado de Amarração"
          buttonTitle="Novo Formulário"
          icon="file-medical"
          route="lashingCertificate"
        />
        <Divider my="2" backgroundColor="gray.500" />
        {tasks.map((item, index) => {
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
            />
          );
        })}
      </VStack>
    </ScrollView>
  );
}
