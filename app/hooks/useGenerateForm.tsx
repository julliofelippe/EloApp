import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import { Buffer } from "buffer";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { base64LashingCertificate } from "../utils/base64-lashing-certificate.js";

const useGenerateForm = () => {
  const generateForm = async (data) => {
    const formData = {
      certificateNumber: data.certificateNumber,
    };

    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      console.log("Permissão para acessar o diretório não concedida.");
      return;
    }

    const fileName = `Lashing_Certificate_Nº_${formData.certificateNumber}.docx`;

    try {
      const zip = new PizZip(Buffer.from(base64LashingCertificate, "base64"));

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.render(formData);

      const out = doc.getZip().generate({
        type: "base64",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      await FileSystem.writeAsStringAsync(fileName, out, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log(`Documento gerado e salvo: ${fileName}`);
    } catch (error) {
      console.error("Erro ao gerar ou salvar o documento:", error);
    }
  };

  return { generateForm };
};

export default useGenerateForm;
