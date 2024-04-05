import Feather from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons';

import HomePage from '../screens/HomePage';
import LashingCertificateForm from '../screens/LashingCertificateForm';
import NewLashingFormPage from '../screens/NewLashingFormPage';
import RelatorioVistoria from '../screens/RelatorioVistoria';
import AtaVistoria from '../screens/AtaVistoria';
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
    title: 'Dashboard',
    display: '',
    component: HomePage
  },
  {
    route: 'relatorioVistoria',
    label: 'Relatório de Vistoria',
    icon: 'file-text',
    title: '',
    display: '',
    component: RelatorioVistoria
  },
  {
    route: 'ataVistoria',
    label: 'Ata de Vistoria',
    icon: 'file-text',
    title: '',
    display: '',
    component: AtaVistoria
  },
  {
    route: 'newLashingCertificate',
    label: 'Certificado de Lashing',
    icon: 'file-text',
    title: '',
    display: 'none',
    component: NewLashingFormPage
  },
  {
    route: 'lashingCertificate',
    label: 'Certificado de Lashing',
    icon: 'file-text',
    title: '',
    display: 'none',
    component: LashingCertificateForm
  },
  {
    route: 'pawnCertificate',
    label: 'Certificado de Peação',
    icon: 'file-text',
    title: '',
    display: 'none',
    component: PawnCertificatePage
  }
];

export const drawerMenu = [
  {
    title: 'Certificado de Peação',
    bg: 'white',
    icon: 'settings',
    route: 'Settings',
    menuList: [
      { title: '• Lashing', routeTo: 'newLashingCertificate' },
      { title: '• Carro', routeTo: 'pawnCertificate' }
    ]
  }
];
