import { C, TEXT } from '../../config';

const { TIMEOUT_SERVICE } = C;
const { EN: { ERROR_CONNECTION } } = TEXT;
const DEFAULT_HEADERS = {
  Accept: 'application/json',
  timeout: TIMEOUT_SERVICE,
  'Content-Type': 'application/json',
};

export default async(endpoint, props = {}) => {
  const { headers, method = 'GET', ...others } = props;

  return new Promise((resolve) => {
    fetch(endpoint, { headers: { ...DEFAULT_HEADERS, ...headers }, method, ...others })  // eslint-disable-line
      .then(async(response) => {
        const json = await response.json();
        if (response.status >= 400) {
          const error = new Error();
          error.response = response;
          error.message = json.message;
          throw error;
        }
        return resolve(json);
      }).catch((error = {}) => {
        if (!error.response) error.message = ERROR_CONNECTION; //eslint-disable-line

        console.log('[ERROR]', { // eslint-disable-line
          code: error.response ? error.response.status : undefined,
          endpoint,
          props,
          message: error.message,
        });

        return resolve(undefined); // eslint-disable-line
      });
  });
};
