export interface FetchDashboards {
  fetch(params?: FetchDashboards.Params): Promise<any>;
}

export namespace FetchDashboards {
  export type Params = {
    // user_id: string | number;
  };
}
