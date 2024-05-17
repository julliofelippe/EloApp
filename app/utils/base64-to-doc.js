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

function arrayBufferToBase64(buffer) {
  return Buffer.from(buffer).toString('base64');
}

function getResizedDimensions(
  originalWidth,
  originalHeight,
  maxWidth,
  maxHeight
) {
  let width = originalWidth;
  let height = originalHeight;

  // Redimensionar proporcionalmente para caber dentro dos limites máximos
  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }

  if (height > maxHeight) {
    width = Math.round((width * maxHeight) / height);
    height = maxHeight;
  }

  return [width, height];
}

export {
  base64DataURLToArrayBuffer,
  arrayBufferToBase64,
  getResizedDimensions
};
