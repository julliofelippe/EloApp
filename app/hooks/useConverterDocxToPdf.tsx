import axios from 'axios';
import { useLoading } from '../context/LoadingContext';
import { Alert } from 'react-native';

export const useConverterDocxToPdf = () => {
  const { startLoading, stopLoading } = useLoading();
  const convertDocxToPdf = async (docxBase64) => {
    try {
      startLoading();
      const pdf = await axios.post(
        'https://convert.ikone.global/docx-to-pdf',
        {
          base64Docx: docxBase64
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      Alert.alert('Sucesso!', 'Documento gerado com sucesso.');
      return pdf.data.base64Pdf;
    } catch (error) {
      console.error('Erro ao gerar ou salvar o documento:', error);
      Alert.alert('Erro ao gerar ou salvar o documento:', error.message);
    } finally {
      stopLoading();
    }
  };

  return { convertDocxToPdf };
};
