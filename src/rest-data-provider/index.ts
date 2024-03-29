// "axios" package needs to be installed
import { AxiosInstance } from "axios";
// "stringify" function is re-exported from "query-string" package by "@pankod/refine-simple-rest"
import { stringify } from "@refinedev/simple-rest";
import { DataProvider } from "@refinedev/core";
import { axiosInstance, generateSort, generateFilter } from "./utils";


function getToken(){
  const auth = localStorage.getItem("auth") + "";
  const userDetails = JSON.parse(auth);
  const token = userDetails.token;
  return token;
}

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({
    resource,
    hasPagination = true,
    pagination = { current: 1, pageSize: 10 },
    filters,
    sort,
  }) => {
    const url = `${apiUrl}/${resource}`;

    const auth = localStorage.getItem("auth") + "";
    const userDetails = JSON.parse(auth);
    const token = userDetails.token;
    httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    const { current = 1, pageSize = 10 } = pagination ?? {};

    const queryFilters = generateFilter(filters);

    const query: {
      _start?: number;
      _end?: number;
      _sort?: string;
      _order?: string;
    } = hasPagination
      ? {
          _start: (current - 1) * pageSize,
          _end: current * pageSize,
        }
      : {};

    const generatedSort = generateSort(sort);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query._sort = _sort.join(",");
      query._order = _order.join(",");
    }

    const { data, headers } = await httpClient.get(
      `${url}?${stringify(query)}&${stringify(queryFilters)}`
    );

    
    //const total = +headers["x-total-count"];
    const total = data.total;

    return {
      data: data.data,
      total,
    };
  },

  getMany: async ({ resource, ids }) => {
    const { data } = await httpClient.get(
      `${apiUrl}/${resource}?${stringify({ id: ids })}`
    );

    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

    const { data } = await httpClient.post(url, variables);
    httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();


    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const auth = localStorage.getItem("auth") + "";
    const userDetails = JSON.parse(auth);
    const token = userDetails.token;
    httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    const { data } = await httpClient.patch(url, variables);

    return {
      data,
    };
  },

  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const auth = localStorage.getItem("auth") + "";
    const userDetails = JSON.parse(auth);
    const token = userDetails.token;
    httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    const { data } = await httpClient.get(url);

    return {
      data: data.data,
    };
  },

  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const auth = localStorage.getItem("auth") + "";
    const userDetails = JSON.parse(auth);
    const token = userDetails.token;
    httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    const { data } = await httpClient.delete(url, {
      data: variables,
    });

    return {
      data,
    };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({ url, method, filters, sort, payload, query, headers }) => {
    let requestUrl = `${url}?`;

    if (sort) {
      const generatedSort = generateSort(sort);
      if (generatedSort) {
        const { _sort, _order } = generatedSort;
        const sortQuery = {
          _sort: _sort.join(","),
          _order: _order.join(","),
        };
        requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
      }
    }

    if (filters) {
      const filterQuery = generateFilter(filters);
      requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    //if (headers) {
    //  httpClient.defaults.headers = {
    //    ...httpClient.defaults.headers,
    //    ...headers,
    //  };
    //}

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await httpClient[method](url, payload);
        break;
      case "delete":
        axiosResponse = await httpClient.delete(url, {
          data: payload,
        });
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl);
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});
