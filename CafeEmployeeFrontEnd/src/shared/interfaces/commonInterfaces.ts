import { CafeState,EmployeeState, CommonState } from "../types/commonTypes";

export interface ApplicationState {
    common:  CommonState | any;
    cafe: CafeState | any;
    employee: EmployeeState  | any;
    
  
}

export interface IStore {
    type: string,
    payload: any,
    error: any,
    index: number,
}