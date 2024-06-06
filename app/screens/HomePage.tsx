import { Image, VStack } from 'native-base';
import eloLogo from '../../assets/logos/elo-logo.png';
import eloSplash from '../../assets/elo-splash-screen.png';
import badge from '../../assets/icons/badge.png';
import cargo from '../../assets/icons/cargo.png';
import { Dimensions } from 'react-native';
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
          bottom: 95
        }}
      />
      <Image
        source={eloLogo}
        alt="Logo Elo Inspeção e Consultoria"
        marginBottom="30px"
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
          route="newLashingCertificate"
        />

        <HomeButton
          navigation={navigation}
          image={cargo}
          imageSize={30}
          fontSize="lg"
          title="Relatório Diário de Carga"
          route="newCarCertificateForm"
        />
      </VStack>
    </VStack>
  );
}
