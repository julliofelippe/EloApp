import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import { Buffer } from 'buffer';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import * as Sharing from 'expo-sharing';
import { base64LashingCertificate } from '../utils/base64-lashing-certificate';

const useGenerateForm = () => {
  const generateForm = async (data) => {
    const formData = {
      certificateNumber: data.certificateNumber
    };

    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      console.log('Permissão para acessar o diretório não concedida.');
      return;
    }

    const fileName = `Lashing_Certificate_Nº_${formData.certificateNumber}.docx`;

    try {
      const zip = new PizZip(Buffer.from(base64LashingCertificate, 'base64'));

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true
      });

      doc.setData(formData);

      doc.render();

      const out = doc.getZip().generate({
        type: 'base64',
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });

      const uri = await StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        fileName,
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );

      await FileSystem.writeAsStringAsync(uri, out, {
        encoding: FileSystem.EncodingType.Base64
      });

      if (!(await Sharing.isAvailableAsync())) {
        console.error('Sharing not available on this platform');
        return;
      }

      await Sharing.shareAsync(uri);

      console.log(`Documento gerado e salvo: ${fileName}`);
    } catch (error) {
      console.error('Erro ao gerar ou salvar o documento:', error);
    }
  };

  return { generateForm };
};

export default useGenerateForm;
