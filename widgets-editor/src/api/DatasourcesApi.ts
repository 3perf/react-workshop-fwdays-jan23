import { DEFAULT_TEST_DATA_SOURCE_TIMEOUT_MS } from "constants/ApiConstants";
import API from "api/Api";
import { GenericApiResponse } from "./ApiResponses";
import { AxiosPromise } from "axios";

import { DatasourceAuthentication, Datasource } from "entities/Datasource";
export interface CreateDatasourceConfig {
  name: string;
  pluginId: string;
  datasourceConfiguration: {
    url: string;
    databaseName?: string;
    authentication?: DatasourceAuthentication;
  };
  //Passed for logging purposes.
  appName?: string;
}

export interface EmbeddedRestDatasourceRequest {
  datasourceConfiguration: { url: string };
  invalids: Array<string>;
  isValid: boolean;
  name: string;
  organizationId: string;
  pluginId: string;
}

class DatasourcesApi extends API {
  static url = "v1/datasources";

  static fetchDatasources(
    orgId: string,
  ): AxiosPromise<GenericApiResponse<Datasource[]>> {
    // IA: mock the API response
    return API.get(
      "https://gist.githubusercontent.com/iamakulov/74704b2a2fae2626ced1f24e518ca062/raw/1240ff108da5251b18126ab6ee77229dae737c34/fetchDatasources.json",
      {},
      { withCredentials: false },
    );
  }

  static createDatasource(datasourceConfig: Partial<Datasource>): Promise<any> {
    return API.post(DatasourcesApi.url, datasourceConfig);
  }

  static testDatasource(datasourceConfig: Partial<Datasource>): Promise<any> {
    return API.post(`${DatasourcesApi.url}/test`, datasourceConfig, undefined, {
      timeout: DEFAULT_TEST_DATA_SOURCE_TIMEOUT_MS,
    });
  }

  static updateDatasource(
    datasourceConfig: Partial<Datasource>,
    id: string,
  ): Promise<any> {
    return API.put(DatasourcesApi.url + `/${id}`, datasourceConfig);
  }

  static deleteDatasource(id: string): Promise<any> {
    return API.delete(DatasourcesApi.url + `/${id}`);
  }

  static fetchDatasourceStructure(
    id: string,
    ignoreCache = false,
  ): Promise<any> {
    return API.get(
      DatasourcesApi.url + `/${id}/structure?ignoreCache=${ignoreCache}`,
    );
  }
}

export default DatasourcesApi;
