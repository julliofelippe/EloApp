import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Buffer } from 'buffer';
import { Image } from 'react-native';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

import { base64CarCertificate } from '../utils/base64-car-certificate.js';
import dateConverter from '../utils/dateConverter';
import {
  base64DataURLToArrayBuffer,
  arrayBufferToBase64,
  getResizedDimensions
} from '../utils/base64-to-doc.js';
import useDownloadDocx from './useDownloadDocx';
import { useConverterDocxToPdf } from './useConverterDocxToPdf';

const useGenerateCarForm = () => {
  const { save } = useDownloadDocx();
  const { convertDocxToPdf } = useConverterDocxToPdf();
  const generateForm = async (data) => {
    const ImageModule = require('docxtemplater-image-module-free');
    const isOvacao = data.activity === 'Ovação';
    const isDesova = data.activity === 'Desova';
    const isComAvaria = data.avaria === 'Com avarias';
    const isSemAvaria = data.avaria === 'Sem avarias';

    const formData = {
      containerNumber: data.containerNumber,
      formattedDate: dateConverter(data.reportDate),
      isOvacao: isOvacao,
      isDesova: isDesova,
      isComAvaria: isComAvaria,
      isSemAvaria: isSemAvaria,
      ...data
    };

    const fileName = `Car_Certificate_Nº_${formData.containerNumber}.docx`;

    try {
      const zip = new PizZip(Buffer.from(base64CarCertificate, 'base64'));

      const imageOpts = {
        getImage(tag) {
          return base64DataURLToArrayBuffer(tag);
        },
        getSize(tagValue, _tagName, _meta) {
          return new Promise((resolve, reject) => {
            const imageUri = `data:image/png;base64,${arrayBufferToBase64(
              tagValue
            )}`;
            Image.getSize(
              imageUri,
              (width, height) => {
                const [resizedWidth, resizedHeight] = getResizedDimensions(
                  width,
                  height,
                  320,
                  340
                );
                resolve([resizedWidth, resizedHeight]);
              },
              (error) => {
                reject(error);
              }
            );
          });
        }
      };

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        modules: [new ImageModule(imageOpts)]
      });

      const getInterleavedOrder = (items) => {
        const result = [];
        const length = items.length;
        const middle = Math.ceil(length / 2);

        for (let i = 0; i < middle; i++) {
          if (i < middle) result.push(items[i]); // Primeira coluna
          if (i + middle < length) result.push(items[i + middle]); // Segunda coluna
        }

        return result;
      };

      // Aplicando a nova ordem intercalada
      const interleavedPhotos = getInterleavedOrder(formData.image);

      // Atualizando com a numeração sequencial correta
      const updatedPhotos = interleavedPhotos.map((photo, index) => ({
        ...photo,
        imageIndex: `Photo ${index + 1}`
      }));

      return doc
        .resolveData({
          ...formData,
          image: updatedPhotos
        })
        .then(async () => {
          doc.render();
          const out = doc.getZip().generate({
            type: 'base64',
            mimeType:
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          });
          return {
            base64: out,
            fileName: fileName
          };
        });
    } catch (error) {
      console.error('Erro ao gerar ou salvar o documento:', error);
    }
  };

  const sharingDocx = async (data) => {
    const form: any = await generateForm(data);
    // await save(form.base64, form.fileName, 'docx');
    const doxcData = form.base64;
    const doxcName = `${FileSystem.documentDirectory}${
      form.fileName.split('.')[0]
    }.docx`;
    await FileSystem.writeAsStringAsync(doxcName, doxcData, {
      encoding: FileSystem.EncodingType.Base64
    });
    Sharing.shareAsync(doxcName);

    console.log(`Documento gerado e salvo: ${form.fileName}`);
  };

  const sharingPdf = async (data) => {
    const form: any = await generateForm(data);
    const docxData = form.base64;
    const pdfName = `${FileSystem.documentDirectory}${
      form.fileName.split('.')[0]
    }.pdf`;
    const pdfBase64 = await convertDocxToPdf(docxData);
    await FileSystem.writeAsStringAsync(pdfName, pdfBase64, {
      encoding: FileSystem.EncodingType.Base64
    });

    Sharing.shareAsync(pdfName);

    console.log(`Documento gerado e salvo: ${form.fileName}`);
  };

  const downloadPdf = async (data) => {
    const form: any = await generateForm(data);
    const docxData = form.base64;
    const pdfName = `${FileSystem.documentDirectory}${
      form.fileName.split('.')[0]
    }.pdf`;
    const pdfBase64 = await convertDocxToPdf(docxData);
    await save(pdfBase64, pdfName, 'pdf');
  };

  const downloadDocx = async (data) => {
    const form: any = await generateForm(data);
    await save(form.base64, form.fileName, 'docx');

    console.log(`Documento gerado e salvo: ${form.fileName}`);
  };

  return { sharingDocx, sharingPdf, downloadPdf, downloadDocx };
};

export default useGenerateCarForm;
