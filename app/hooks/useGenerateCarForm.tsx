import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import { Buffer } from 'buffer';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import * as Sharing from 'expo-sharing';

import { base64LashingCertificate } from '../utils/base64-lashing-certificate.js';
import dateConverter from '../utils/dateConverter';

const useGenerateCarForm = () => {
  const generateForm = async (data) => {
    const formData = {
      containerNumber: data.containerNumber,
      formattedDate: dateConverter(data.reportDate),
      ...data
    };
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      console.log('Permissão para acessar o diretório não concedida.');
      return;
    }

    const fileName =
      FileSystem.documentDirectory +
      `Car_Certificate_Nº_${formData.containerNumber}.docx`;

    try {
      const zip = new PizZip(Buffer.from(base64LashingCertificate, 'base64'));

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true
      });

      doc.render(formData);

      const out = doc.getZip().generate({
        type: 'base64',
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });

      await FileSystem.writeAsStringAsync(fileName, out, {
        encoding: FileSystem.EncodingType.Base64
      });
      Sharing.shareAsync(fileName);

      console.log(`Documento gerado e salvo: ${fileName}`);
    } catch (error) {
      console.error('Erro ao gerar ou salvar o documento:', error);
    }
  };

  return { generateForm };
};

export default useGenerateCarForm;
