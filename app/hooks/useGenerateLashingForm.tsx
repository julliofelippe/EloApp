import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Buffer } from 'buffer';
import { Image } from 'react-native';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

import { base64LashingCertificate } from '../utils/base64-lashing-certificate';
import dateConverter from '../utils/dateConverter';
import {
  base64DataURLToArrayBuffer,
  arrayBufferToBase64,
  getResizedDimensions
} from '../utils/base64-to-doc.js';

import useDownloadDocx from './useDownloadDocx';
import { useConverterDocxToPdf } from './useConverterDocxToPdf';

const useGenerateLashingForm = () => {
  const { save } = useDownloadDocx();
  const { convertDocxToPdf } = useConverterDocxToPdf();
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
          ),
          newCargo: formData.newCargo.map(
            ({
              newCargoNumber,
              newCargoDescription,
              newCargoDimensions,
              newCargoWeight
            }) => ({
              newCargoNumber: newCargoNumber,
              newCargoDescription: newCargoDescription,
              newCargoDimensions: newCargoDimensions,
              newCargoWeight: newCargoWeight
            })
          ),
          newMaterial: formData.newMaterial.map(
            ({
              newMaterialNumber,
              newMaterialDescription,
              newMaterialQuantity,
              newMaterialSWL
            }) => ({
              newMaterialNumber: newMaterialNumber,
              newMaterialDescription: newMaterialDescription,
              newMaterialQuantity: newMaterialQuantity,
              newMaterialSWL: newMaterialSWL
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
    const pdfName = `${form.fileName.split('.')[0]}.pdf`;
    const pdfBase64 = await convertDocxToPdf(docxData);
    await save(pdfBase64, pdfName, 'pdf');

    console.log(`Documento gerado e salvo: ${pdfName}`);
  };

  const downloadDocx = async (data) => {
    const form: any = await generateForm(data);
    await save(form.base64, form.fileName, 'docx');

    console.log(`Documento gerado e salvo: ${form.fileName}`);
  };

  return { sharingDocx, sharingPdf, downloadPdf, downloadDocx };
};

export default useGenerateLashingForm;
