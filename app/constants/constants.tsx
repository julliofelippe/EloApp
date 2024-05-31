import Feather from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons';

import HomePage from '../screens/HomePage';
import LashingCertificateForm from '../screens/LashingCertificateForm';
import NewLashingFormPage from '../screens/NewLashingFormPage';
import RelatorioVistoria from '../screens/RelatorioVistoria';
import AtaVistoria from '../screens/AtaVistoria';
import Forms from '../screens/Forms';
import PawnCertificatePage from '../screens/PawnCertificatePage';
import CarCertificateForm from '../screens/CarCertificateForm';
import NewCarFormPage from '../screens/newCarCertificateForm';

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
    route: 'newCarCertificateForm',
    label: 'Relatório Diário de Carga',
    icon: 'file-text',
    title: 'Elo',
    display: '',
    component: NewCarFormPage
  },
  {
    route: 'relatorioVistoria',
    label: 'Relatório de Vistoria',
    icon: 'file-text',
    title: 'Elo',
    display: '',
    component: RelatorioVistoria
  },
  {
    route: 'ataVistoria',
    label: 'Ata de Vistoria',
    icon: 'file-text',
    title: 'Elo',
    display: '',
    component: AtaVistoria
  },
  {
    route: 'newLashingCertificate',
    label: 'Certificado de Lashing',
    icon: 'file-text',
    title: 'Elo',
    display: '',
    component: NewLashingFormPage
  },
  {
    route: 'lashingCertificate',
    label: 'Certificado de Lashing',
    icon: 'file-text',
    title: 'Elo',
    display: 'none',
    component: LashingCertificateForm
  },
  {
    route: 'pawnCertificate',
    label: 'Certificado de Peação',
    icon: 'file-text',
    title: 'Elo',
    display: 'none',
    component: PawnCertificatePage
  },
  {
    route: 'newCar2CertificateForm',
    label: 'Relatório de Carga',
    icon: 'file-text',
    title: 'Elo',
    display: 'none',
    component: NewCarFormPage
  },
  {
    route: 'carCertificateForm',
    label: 'Relatório de Carga',
    icon: 'file-text',
    title: 'Elo',
    display: 'none',
    component: CarCertificateForm
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
      { title: '• Carro', routeTo: 'home' }
    ]
  }
];
