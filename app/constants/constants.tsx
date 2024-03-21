import Feather from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons';

import HomePage from '../screens/HomePage';
import LashingCertificateForm from '../screens/LashingCertificateForm';
import NewLashingFormPage from '../screens/NewLashingFormPage';
import Forms from '../screens/Forms';
import PawnCertificatePage from '../screens/PawnCertificatePage';

export const constant = {
  SPACING: 16,
  borderRadius: 10,
  titleFontSize: 24,
  textFontSize: 16,
  subTextFontSize: 14
};

export const ScreensArray = [
  {
    route: 'home',
    label: 'Início',
    icon: 'home',
    component: HomePage
  },
  {
    route: 'relatorioVistoria',
    label: 'Relatório de Vistoria',
    icon: 'file-text',
    component: LashingCertificateForm
  },
  {
    route: 'ataVistoria',
    label: 'Ata de Vistoria',
    icon: 'file-text',
    component: NewLashingFormPage
  }
];

export const drawerMenu = [
  {
    title: 'Certificado de Peação',
    bg: 'white',
    icon: 'settings',
    route: 'Settings',
    menuList: [
      { title: '• Lashing', routeTo: 'ataVistoria' },
      { title: '• Carro', routeTo: 'relatorioVistoria' }
    ]
  }
];
