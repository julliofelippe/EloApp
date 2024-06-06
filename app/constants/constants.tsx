import HomePage from '../screens/HomePage';
import LashingCertificateForm from '../screens/LashingCertificateForm';
import NewLashingFormPage from '../screens/NewLashingFormPage';
import CarCertificateForm from '../screens/CarCertificateForm';
import NewCarFormPage from '../screens/newCarCertificateForm';

export const constant = {
  SPACING: 16,
  borderRadius: 10,
  titleFontSize: 15,
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
    label: 'Diário de Carga',
    icon: 'file-text',
    title: 'Elo',
    display: '',
    component: NewCarFormPage
  },
  {
    route: 'newLashingCertificate',
    label: 'Certificado de Peação',
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
