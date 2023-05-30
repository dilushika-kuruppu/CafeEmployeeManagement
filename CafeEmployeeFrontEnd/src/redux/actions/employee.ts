import { Dispatch } from "redux";
import httpClient from "../../utils/httpClient";
import setNotification from "../../utils/notificationAlert";
import {SET_EMPLOYEE_DETAIL,SET_EMPLOYEE_DETAIL_ERROR,UPDATE_EMPLOYEE_SUCCESS,UPDATE_EMPLOYEE_ERROR,GET_EMPLOYEE_LIST_SUCCESS, GET_EMPLOYEE_LIST_ERROR,SET_SPIN} from "../../shared/contants";


const setIsSpin = (dispatch: Dispatch, spin: boolean) => dispatch({ type: SET_SPIN, payload: spin })

const employeeDetailSuccess = (dispatch: Dispatch, payload: any) => dispatch({ type: SET_EMPLOYEE_DETAIL, payload });
const employeeDetailError = (dispatch: Dispatch, error: any) => dispatch({ type: SET_EMPLOYEE_DETAIL_ERROR, error });
const employeeUpdateSuccess = (dispatch: Dispatch, payload: any) => dispatch({ type: UPDATE_EMPLOYEE_SUCCESS, payload });
const employeeUpdateError = (dispatch: Dispatch, error: any) => dispatch({ type: UPDATE_EMPLOYEE_ERROR, error });
const employeeListGetSuccess = (dispatch: Dispatch, payload: any) => dispatch({ type: GET_EMPLOYEE_LIST_SUCCESS, payload });
const employeeListGetError = (dispatch: Dispatch, error: any) => dispatch({ type: GET_EMPLOYEE_LIST_ERROR, error });


export const createEmployee = (reqData: any) => async (dispatch: Dispatch) => {
    setIsSpin(dispatch, true);
    return httpClient.post(`/Employee`).then((response: any) => {

        setIsSpin(dispatch, false);
        if (response.data.success) {
            employeeDetailSuccess(dispatch, response.data.data);
            setNotification('success', "Employee Created success");
        } else {
            employeeDetailError(dispatch, "Sorry, something went wrong. Please try again later.");
            setNotification('error', "Sorry, something went wrong. Please try again later.");
        }
    }).catch((error) => {
        setIsSpin(dispatch, false);
        if (error.request && error.request.response) {
            employeeDetailError(dispatch, error.request.response);
            setNotification('error', error.request.response);
        } else {
            employeeDetailError(dispatch, "Sorry, something went wrong. Please try again later.");
            setNotification('error', "Sorry, something went wrong. Please try again later.");
        }
    })
}

export const updateEmployee = (employeeId: string, reqData: any) => async (dispatch: Dispatch) => {
    setIsSpin(dispatch, true);
    console.log(employeeId);
    await httpClient.patch(`Employee${employeeId}`, reqData).then((response: any) => {
        setIsSpin(dispatch, false);
        if (response.data.success) {
            employeeUpdateSuccess(dispatch, response.data.data)
            setNotification('success', 'Employee Information Update success');
        } else {
            employeeUpdateError(dispatch, "Sorry, something went wrong. Please try again later.");
            setNotification('error', "Sorry, something went wrong. Please try again later.");
           
        }
    }).catch((error) => {
        setIsSpin(dispatch, false);
        if (error.request && error.request.response) {
            employeeUpdateError(dispatch, error.request.response)
            setNotification('error', error.request.response);
         
        } else {
            employeeUpdateError(dispatch, "Sorry, something went wrong. Please try again later.");
            setNotification('error', "Sorry, something went wrong. Please try again later.");
           
        }
    })
}

export const getEmployeeList = () => async (dispatch: Dispatch) => {

    setIsSpin(dispatch, true);
    return httpClient.get(`employees`).then((response: any) => {
        setIsSpin(dispatch, false);
        if (response.data.success) {
            employeeListGetSuccess(dispatch, response.data.data)
        } else {
           
            employeeListGetError(dispatch, "error");
        }
    }).catch((error) => {
        setIsSpin(dispatch, false);
        if (error.request && error.request.response) {
            employeeListGetError(dispatch, error.request.response)
        } else {
            employeeListGetError(dispatch, "error");
        }
    })
}