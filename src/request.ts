import axios from 'axios';
import * as crypto from 'crypto';

let baseAPI = 'https://api.snaptrade.com';

const JSONstringifyOrder = (obj: any) => {
  var allKeys: any = [];
  var seen: any = {};
  JSON.stringify(obj, function (key, value) {
    if (!(key in seen)) {
      allKeys.push(key);
      seen[key] = null;
    }
    return value;
  });
  allKeys.sort();
  return JSON.stringify(obj, allKeys);
};

const signRequest = (req: any, endpoint: string, consumerK: string) => {
  const consumerKey = encodeURI(consumerK);

  const requestData = req.defaults.data;
  const requestPath = endpoint;
  const requestQuery = new URLSearchParams(req.defaults.params).toString();

  const sigObject = {
    content: requestData,
    path: requestPath,
    query: requestQuery,
  };

  const sigContent = JSONstringifyOrder(sigObject);

  const hmac = crypto.createHmac('sha256', consumerKey);

  const signature = hmac.update(sigContent).digest('base64');

  req.defaults.headers.Signature = signature;
  return req;
};

export const request = async (options: {
  endpoint: string;
  method: 'get' | 'post' | 'put' | 'delete';
  timeout?: number;
  consumerKey: string;
  defaultQueryParams: {
    clientId: string;
    userId?: string | null;
    userSecret?: string | null;
    overrideBaseAPI?: string | null
  };
  extraParams?: {} | null;
  data?: {} | null;
}) => {
  const {
    endpoint,
    method,
    timeout = 60000,
    consumerKey,
    defaultQueryParams,
    extraParams,
    data = null,
  } = options;

  const timestamp = Math.round(+new Date().getTime() / 1000);
  let params: any = {
    timestamp: timestamp,
    clientId: defaultQueryParams?.clientId,
  };
  if (defaultQueryParams?.userId) {
    params = { ...params, userId: defaultQueryParams.userId };
  }
  if (defaultQueryParams?.userSecret) {
    params = { ...params, userSecret: defaultQueryParams.userSecret };
  }
  if (defaultQueryParams?.overrideBaseAPI) {
    baseAPI = defaultQueryParams?.overrideBaseAPI
  }
  if (extraParams) {
    params = { ...params, ...extraParams };
  }

  const axiosInstance = axios.create({
    baseURL: baseAPI,
    timeout,
    params: params,
    data: data,
  });

  const req = signRequest(axiosInstance, endpoint, consumerKey);

  let response;
  try {
    switch (method) {
      case 'get':
        const getReq = await req(endpoint);
        response = {
          data: getReq.data,
          meta: {
            status: getReq.status,
            statusText: getReq.statusText,
          },
        };
        break;
      case 'post':
        const postReq = await req.post(endpoint, data);
        response = {
          data: postReq.data,
          meta: {
            status: postReq.status,
            statusText: postReq.statusText,
          },
        };
        break;
      case 'delete':
        const deleteReq = await req.delete(endpoint);
        response = {
          data: deleteReq.data,
          meta: {
            status: deleteReq.status,
            statusText: deleteReq.statusText,
          },
        };
        break;
      default:
        break;
    }
  } catch (err: any) {
    response = err.response.data;
  }

  return response;
};
