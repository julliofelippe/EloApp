import axios from 'axios';

export const useConverterDocxToPdf = () => {
  const convertDocxToPdf = async (docxBase64) => {
    try {
      const pdf = await axios.post(
        'http://conv-env.eba-pifvpcaj.us-east-1.elasticbeanstalk.com/docx-to-pdf',
        {
          base64Docx: docxBase64
        }
      );
      return pdf.data.base64Pdf;
    } catch (error) {
      console.error('Erro ao gerar ou salvar o documento:', error.message);
    }
  };

  return { convertDocxToPdf };
};
