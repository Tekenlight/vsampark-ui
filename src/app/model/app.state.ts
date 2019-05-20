import { Company } from "../layout/company/model/company.model";
 
export interface AppState {
  readonly data : any;
  readonly loading : boolean;
  readonly selected : any;
}