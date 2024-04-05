import { useQuery } from '@realm/react';
import { LashingFormSchema } from '../models/lashingFormSchema';
import { Heading, VStack, ScrollView, Divider } from 'native-base';
import FormTable from '../components/FormTable';
import Card from '../components/Card/Index';

export default function NewLashingFormPage({ navigation }) {
  const tasks = useQuery('LashingFormSchema');
  return (
    <ScrollView>
      <VStack flex={1} alignItems="center" justifyContent="center" my={8}>
        <Heading>Certificados de Amarração</Heading>
        <Card
          navigation={navigation}
          formTitle="Certificado de Amarração"
          buttonTitle="Novo Formulário"
          icon="file-plus"
          route="lashingCertificate"
        />
        <Divider my="2" backgroundColor="gray.500" />
        {tasks.map((item, index) => {
          return (
            <FormTable
              item={item}
              formName="Formulário Lashing"
              navigation={navigation}
            />
          );
        })}
      </VStack>
    </ScrollView>
  );
}
