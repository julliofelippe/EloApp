import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import * as Sharing from 'expo-sharing';

import { base64LashingCertificate } from '../utils/base64-lashing-certificate.js';
import dateConverter from '../utils/dateConverter';
import {
  base64DataURLToArrayBuffer,
  arrayBufferToBase64,
  getResizedDimensions
} from '../utils/base64-to-doc.js';
import { Image } from 'react-native';
import useDownloadDocx from './useDownloadDocx';
import type { FormReturn } from '../types/formType';

const useGenerateLashingForm = () => {
  const { save } = useDownloadDocx();
  const generateForm = async (data) => {
    const ImageModule = require('docxtemplater-image-module-free');
    const formData = {
      certificateNumber: data.certificateNumber,
      formattedDate: dateConverter(data.date),
      ...data
    };

    const fileName = `Lashing_Certificate_Nº_${formData.certificateNumber}.docx`;

    try {
      const zip = new PizZip(Buffer.from(base64LashingCertificate, 'base64'));

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
                  600,
                  320
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

      return doc
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
          return {
            base64: out,
            fileName: fileName
          };
        });
    } catch (error) {
      console.error('Erro ao gerar ou salvar o documento:', error);
    }
  };

  const generateDocx = async (data) => {
    const form: any = await generateForm(data);
    await save(form.base64, form.fileName, 'docx');

    console.log(`Documento gerado e salvo: ${form.fileName}`);
  };

  const generatePdf = async (data) => {
    const form: any = await generateForm(data);
    Sharing.shareAsync(FileSystem.documentDirectory + form.fileName);

    console.log(`Documento gerado e salvo: ${form.fileName}`);
  };

  return { generateDocx, generatePdf };
};

export default useGenerateLashingForm;
