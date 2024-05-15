import { useQuery } from '@realm/react';
import { Heading, VStack, ScrollView, Divider } from 'native-base';
import FormTable from '../components/FormTable';
import Card from '../components/Card/Index';
import useGenerateCarForm from '../hooks/useGenerateCarForm';

export default function NewCarFormPage({ navigation }) {
  const { generateForm } = useGenerateCarForm();
  const tasks = useQuery('CarFormSchema');
  console.log('tasks:', tasks);
  return (
    <ScrollView>
      <VStack flex={1} alignItems="center" justifyContent="center" my={8}>
        <Heading>Relatório de Carro</Heading>
        <Card
          navigation={navigation}
          formTitle="Relatório de Carro"
          buttonTitle="Novo Formulário"
          icon="file-plus"
          route="carCertificateForm"
        />
        <Divider my="2" backgroundColor="gray.500" />
        {tasks.map((item, index) => {
          return (
            <FormTable
              item={item}
              formName="Relatório de Carro"
              navigation={navigation}
              route="carCertificateForm"
              generateFormFunction={generateForm}
            />
          );
        })}
      </VStack>
    </ScrollView>
  );
}
