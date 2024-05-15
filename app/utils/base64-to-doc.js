import { Buffer } from 'buffer';

function base64DataURLToArrayBuffer(dataURL) {
  const base64Regex = /^data:image\/(png|jpg|svg|svg+xml);base64,/;
  const stringBase64 = dataURL.replace(base64Regex, '');
  const buffer = Buffer.from(stringBase64, 'base64');
  const len = buffer.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = buffer[i];
  }
  return bytes.buffer;
}

export default base64DataURLToArrayBuffer;
