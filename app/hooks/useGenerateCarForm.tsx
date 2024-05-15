import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import { Buffer } from 'buffer';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import * as Sharing from 'expo-sharing';

import { base64CarCertificate } from '../utils/base64-car-certificate.js';
import dateConverter from '../utils/dateConverter';
import base64DataURLToArrayBuffer from '../utils/base64-to-doc.js';

const useGenerateCarForm = () => {
  const generateForm = async (data) => {
    const ImageModule = require('docxtemplater-image-module-free');
    const isOvacao = data.activity === 'Ovação';
    const isDesova = data.activity === 'Desova';

    const formData = {
      containerNumber: data.containerNumber,
      formattedDate: dateConverter(data.reportDate),
      isOvacao: isOvacao,
      isDesova: isDesova,
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
      const zip = new PizZip(Buffer.from(base64CarCertificate, 'base64'));

      const imageOpts = {
        getImage(tag) {
          return base64DataURLToArrayBuffer(tag);
        },
        getSize() {
          return [550, 300];
        }
      };

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        modules: [new ImageModule(imageOpts)]
      });

      doc
        .resolveData({
          ...formData,
          image: formData.image.map(
            ({ imageTitle, imageDescription, imageUrl }, index) => ({
              imageTitle: imageTitle,
              imageDescription: imageDescription,
              imageUrl: imageUrl,
              imageIndex: `Photo ${index + 1}`
            })
          )
        })
        .then(async () => {
          doc.render();
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
        });
    } catch (error) {
      console.error('Erro ao gerar ou salvar o documento:', error);
    }
  };

  return { generateForm };
};

export default useGenerateCarForm;
