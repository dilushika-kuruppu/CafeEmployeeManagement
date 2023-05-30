import { Reducer } from "react";
import { IStore } from "../../shared/interfaces/commonInterfaces";
import { EmployeeList,EmployeeState } from "../../shared/types/commonTypes";
import { SET_CURRENT_PAGE,GET_EMPLOYEE_LIST_SUCCESS, GET_EMPLOYEE_LIST_ERROR, SET_ROWS, SET_SKIP, SET_TAKE, SET_EMPLOYEE_DETAIL, SET_EMPLOYEE_DETAIL_ERROR,UPDATE_EMPLOYEE_SUCCESS,UPDATE_EMPLOYEE_ERROR } from "../../shared/contants";

const initialState: EmployeeState = {
    employeeList: {} as EmployeeList,
    employeeListError: undefined,
    rows: 10,
    skip: 0,
    take: 10,
    currentPage: 0,
    employeeDetail: undefined,
    employeeDetailError: undefined,
    employeeUpdateError: undefined,
}

const EmployeeReducer: Reducer<EmployeeState, any> = (state: EmployeeState = initialState, action: IStore) => {
    switch (action.type) {

         case GET_EMPLOYEE_LIST_SUCCESS:
                return {
                    ...state, employeeList: { ...action.payload }
                }
         case GET_EMPLOYEE_LIST_ERROR:
                return {
                    ...state, employeeListError: action.error
                }
        case SET_ROWS:
            return {
                ...state, rows: action.payload
            }
        case SET_SKIP:
            return {
                ...state, skip: action.payload
            }
        case SET_TAKE:
            return {
                ...state, take: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.payload
            }

            case SET_EMPLOYEE_DETAIL:
            return {
                ...state, employeeDetail: action.payload
            }
        case SET_EMPLOYEE_DETAIL_ERROR:
            return {
                ...state, employeeDetailError: action.error
            }

        case UPDATE_EMPLOYEE_SUCCESS:
            return {
                ...state, employeeDetail: action.payload,
            }
        case UPDATE_EMPLOYEE_ERROR:
            return {
                ...state, employeeUpdateError: action.error
            }
        default:
            return state;
    }
}

export default EmployeeReducer;