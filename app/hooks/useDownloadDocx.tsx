import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const useDownloadDocx = () => {
  const save = async (base64, filename, mimetype) => {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        filename,
        mimetype
      )
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, {
            encoding: FileSystem.EncodingType.Base64
          });
        })
        .catch((error) => console.log(error));
    } else {
      console.log('permissão não concedida');
    }
  };

  return {
    save
  };
};

export default useDownloadDocx;
