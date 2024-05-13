import { Box, HStack, Heading, Image, Text, VStack, View } from 'native-base';
import eloLogo from '../../assets/logos/elo-logo.png';
import eloSplash from '../../assets/elo-splash-screen.png';
import badge from '../../assets/icons/badge.png';
import document from '../../assets/icons/document.png';
import car from '../../assets/icons/car.png';
import yatch from '../../assets/icons/yatch.png';
import dataAnalytics from '../../assets/icons/data-analytics.png';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import HomeButton from '../components/HomeButton';

export default function HomePage({ navigation }) {
  const window = Dimensions.get('window');

  return (
    <VStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      width={window.width}
      height={window.height}
    >
      <Image
        source={eloSplash}
        alt="Background Image"
        style={{
          flex: 1,
          position: 'absolute',
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          width: window.width,
          height: window.height,
          zIndex: -2,
          resizeMode: 'cover',
          bottom: 180
        }}
      />
      <Image
        source={eloLogo}
        alt="Logo Elo Inspeção e Consultoria"
        marginBottom="150px"
      />
      <VStack
        alignItems="center"
        justifyContent="center"
        position="absolute"
        bottom={0}
        backgroundColor="blueGray.100"
      >
        <HomeButton
          navigation={navigation}
          image={badge}
          imageSize={30}
          fontSize="lg"
          title="Certificado de Peação"
          route="home"
        />
        <HStack
          backgroundColor="#d6d6d6"
          width="full"
          alignItems="center"
          justifyContent="center"
        >
          <HomeButton
            navigation={navigation}
            image={yatch}
            imageSize={25}
            title="Lashing"
            textColor="#e7781c"
            route="newLashingCertificate"
            width={200}
            backgroundColor="#d6d6d6"
            imageColor="#e7781c"
          />
          <HomeButton
            navigation={navigation}
            image={car}
            imageSize={25}
            title="Carro"
            textColor="#e7781c"
            route="newCarCertificateForm"
            width={200}
            backgroundColor="#d6d6d6"
            imageColor="#e7781c"
          />
        </HStack>
        <HomeButton
          navigation={navigation}
          image={document}
          imageSize={30}
          fontSize="lg"
          title="Relatório de Vistoria"
          route="relatorioVistoria"
        />
        <HomeButton
          navigation={navigation}
          image={dataAnalytics}
          imageSize={30}
          fontSize="lg"
          title="Ata de Vistoria"
          route="ataVistoria"
        />
      </VStack>
    </VStack>
  );
}
