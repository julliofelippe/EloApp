import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';

const convertBase64DocxToPdfBase64 = async (base64Docx) => {
  try {
    // Decode base64 to binary data
    const binaryData = Buffer.from(base64Docx, 'base64');

    const htmlContent = atob(base64String);

    // Create a PDF from HTML using expo-print
    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    // Read the PDF file as base64
    const pdfBase64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64
    });

    // Optionally delete the temporary file
    await FileSystem.deleteAsync(uri, { idempotent: true });

    // Return the PDF base64 string
    return pdfBase64;
  } catch (error) {
    console.error('Error converting DOCX to PDF:', error);
    throw error;
  }
};

export default convertBase64DocxToPdfBase64;
