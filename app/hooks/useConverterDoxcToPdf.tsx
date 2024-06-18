// import axios from 'axios';

// const CLOUDCONVERT_API_KEY =
//   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjNiY2Q4ZjQyNTE2ODIzYmNkMDYwZmY4YTYxNzI3YmFlNDBmNDdiMzUwOTQ4OWM2MTRjZDY0MWI2NjYyMTdlNGQ0NjA5Y2Y2ZTVjOTNiMjciLCJpYXQiOjE3MTg2MzIzNzUuMzgwNjc2LCJuYmYiOjE3MTg2MzIzNzUuMzgwNjc4LCJleHAiOjQ4NzQzMDU5NzUuMzc3MDI2LCJzdWIiOiI2ODczNTc0MiIsInNjb3BlcyI6W119.Vu3uFRqmO4ke6w2WBL6FU-r5k8RHUoBtmO61vD_HTqywuhNN7xiQQEOWpGSX644PyQMqJqRmAXsbWQ0nD5p-fNWVk3RAj0PnXhV9TS7ZXivDcwty0Ul9wlCk2nkvf9er6gWYTb0CbwWHH6QS1qiUQD77PjKQNgIyEbhULM_GWRTJ23iM0c974rM0DdxB88fU0R3JF2MmuXE91A9jzihhMdS4H9jEf8ebdByxhxKiD-nRPK2zOJ9ix696sUD9yXTG1t2_j-fCvLPntoaRHGqZSrorZPTuVIsm54f0MlTfAF8RM3Iftbx6nrSdruMrrXddnufBNlDMZfOAR1PIpCi5r4QgRewq78_0xefriDHSbpshpQQsl2HF_XktSXGRlls8dVa8-Uywo22tArpyLOBoEyYPpCmqZVDh1UDtAwFqPw-3rgf_N41WgObMf-jq-HE0ticfCq5gNV41sgb8xmmw-BDKlM9JqUC-RJmX_qBrifjxurl4eAaIsx2Hfnp1LZlfpIoEbKHMeoF-5-HFgXDl9aDLV1r2xDSw3bKIKXm1W4AXe9jjivusc3TwZ52sVIRwuk9PAjl4tqtcyjwRc57dOifvmQKh6XfhGtpPSD2jOcz4kezlllqNEjRqKrw0hJNfiqVSTAWIoFic0FdobO6kQPsaMuUYMO0qNX1c8vlqqSg';
// const CLOUDCONVERT_API_URL = 'https://api.cloudconvert.com/v2/jobs';

// async function convertDocxToPdf(docxPath: any) {
//   try {
//     const jobResponse = await axios.post(
//       CLOUDCONVERT_API_URL,
//       {
//         tasks: {
//           'import-1': {
//             operation: 'import/upload'
//           },
//           'convert-1': {
//             operation: 'convert',
//             input: 'import-1',
//             output_format: 'pdf'
//           },
//           'export-1': {
//             operation: 'export/url',
//             input: 'convert-1'
//           }
//         }
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${CLOUDCONVERT_API_KEY}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     const jobId = jobResponse.data.data.id;
//     const uploadTask = jobResponse.data.data.tasks['import-1'];

//     const uploadUrl = uploadTask.result.form.url;
//     const uploadParams = uploadTask.result.form.parameters;
//     const formData = new FormData();
//     for (const key in uploadParams) {
//       formData.append(key, uploadParams[key]);
//     }
//     formData.append('file', {
//       uri: docxPath,
//       type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       name: 'document.docx'
//     });

//     await axios.post(uploadUrl, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });

//     let jobStatus;
//     do {
//       const jobStatusResponse = await axios.get(
//         `${CLOUDCONVERT_API_URL}/${jobId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${CLOUDCONVERT_API_KEY}`
//           }
//         }
//       );
//       jobStatus = jobStatusResponse.data.data.status;
//       if (jobStatus === 'error') {
//         throw new Error('Erro na conversão');
//       }
//       await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos antes de verificar novamente
//     } while (jobStatus !== 'finished');

//     // Baixa o arquivo PDF convertido
//     const exportTask = jobStatusResponse.data.data.tasks['export-1'];
//     const downloadUrl = exportTask.result.files[0].url;
//     const pdfPath = `${RNFS.DocumentDirectoryPath}/document.pdf`;

//     const downloadResponse = await RNFS.downloadFile({
//       fromUrl: downloadUrl,
//       toFile: pdfPath
//     }).promise;

//     if (downloadResponse.statusCode === 200) {
//       console.log('PDF baixado com sucesso:', pdfPath);
//       return pdfPath;
//     } else {
//       throw new Error('Erro ao baixar o PDF');
//     }
//   } catch (error) {
//     console.log('erro na conversão:', error);
//   }
// }
