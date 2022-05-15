import Api from "api/Api";
import { AxiosPromise } from "axios";
import { GenericApiResponse } from "api/ApiResponses";

export interface Plugin {
  id: string;
  name: string;
  type: "API" | "DB";
  packageName: string;
  iconLocation?: string;
  uiComponent: "ApiEditorForm" | "RapidApiEditorForm" | "DbEditorForm";
  datasourceComponent: "RestAPIDatasourceForm" | "AutoForm";
  allowUserDatasources?: boolean;
  templates: Record<string, string>;
  responseType?: "TABLE" | "JSON";
  documentationLink?: string;
}

export interface PluginFormPayload {
  form: any[];
  editor: any[];
  setting: any[];
}

class PluginsApi extends Api {
  static url = "v1/plugins";
  static fetchPlugins(
    orgId: string,
  ): AxiosPromise<GenericApiResponse<Plugin[]>> {
    // IA: mock the API response
    return Api.get(
      "https://gist.githubusercontent.com/iamakulov/74704b2a2fae2626ced1f24e518ca062/raw/1240ff108da5251b18126ab6ee77229dae737c34/fetchPlugins.json",
      {},
      { withCredentials: false },
    );
  }

  static fetchFormConfig(
    id: string,
  ): AxiosPromise<GenericApiResponse<PluginFormPayload>> {
    // IA: mock the API response
    return Api.get(
      "https://gist.githubusercontent.com/iamakulov/74704b2a2fae2626ced1f24e518ca062/raw/1240ff108da5251b18126ab6ee77229dae737c34/fetchFormConfig.json",
      {},
      { withCredentials: false },
    );
  }
}

export default PluginsApi;
