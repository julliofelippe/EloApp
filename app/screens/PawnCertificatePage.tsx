import { Heading, VStack } from 'native-base';

import Card from '../components/Card/Index';

const dataCard = [
  {
    formTitle: 'Certificado de Amarração',
    buttonTitle: 'Novo Formulário',
    icon: 'file-plus',
    route: 'relatorioVistoria'
  },
  {
    formTitle: 'Certificado de Carro',
    buttonTitle: 'Novo Formulário',
    icon: 'file-plus',
    route: 'formularios'
  }
];

export default function HomePage({ navigation }) {
  return (
    <VStack flex={1} alignItems="center" justifyContent="center">
      <Heading>Certificado de Peação</Heading>
      {dataCard.map((item, index) => {
        return (
          <Card
            key={index}
            navigation={navigation}
            formTitle={item.formTitle}
            buttonTitle={item.buttonTitle}
            icon={item.icon}
            route={item.route}
          />
        );
      })}
    </VStack>
  );
}
