import { TIMEOUT_SEC } from './config';

export const timeout = async function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function (_, reject) {
      reject(
        new Error(`Request took too long! Timeout after ${seconds} seconds`)
      );
    }, seconds * 1000);
  });
};

export async function getJSON(url) {
  const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
  const data = await response.json();

  if (!response.ok) throw new Error(`${data.message} ${response.status}`);
  return data;
}
