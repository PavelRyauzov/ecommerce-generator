import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../', '../', '../', '.env') });

const domain = process.env.EXTERNAL_SYSTEM_URL;
const login = process.env.EXTERNAL_SYSTEM_LOGIN;
const pass = process.env.EXTERNAL_SYSTEM_PASSWORD;

export async function oneCFetch(
  endpoint: string,
  method: string,
  data?: any,
): Promise<any> {
  const requestOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' + Buffer.from(login + ':' + pass).toString('base64'),
    },
    body: JSON.stringify(data),
  };

  if (!data) {
    delete requestOptions.body; // Удаление свойства body, если data не указано
  }

  console.log('Fetching data...');
  const response = await fetch(domain + endpoint, requestOptions);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      'Request error: ' + response.status + ' ' + response.statusText,
    );
  }

  console.log('Fetching successful!');
  return responseData;
}

// oneCFetch('products/', 'GET')
//   .then((response) => {
//     console.log('Ответ 1C:', response);
//   })
//   .catch((error) => {
//     console.error('Ошибка запроса:', error);
//   });
