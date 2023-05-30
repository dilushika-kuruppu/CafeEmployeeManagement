import { Dispatch } from "redux";
import httpClient from "../../utils/httpClient";
import setNotification from "../../utils/notificationAlert";
import {SET_CAFE_DETAIL,SET_CAFE_DETAIL_ERROR,UPDATE_CAFE_SUCCESS,UPDATE_CAFE_ERROR,GET_CAFE_LIST_SUCCESS, GET_CAFE_LIST_ERROR,SET_SPIN} from "../../shared/contants";


const setIsSpin = (dispatch: Dispatch, spin: boolean) => dispatch({ type: SET_SPIN, payload: spin })

const cafeDetailSuccess = (dispatch: Dispatch, payload: any) => dispatch({ type: SET_CAFE_DETAIL, payload });
const cafeDetailError = (dispatch: Dispatch, error: any) => dispatch({ type: SET_CAFE_DETAIL_ERROR, error });
const cafeUpdateSuccess = (dispatch: Dispatch, payload: any) => dispatch({ type: UPDATE_CAFE_SUCCESS, payload });
const cafeUpdateError = (dispatch: Dispatch, error: any) => dispatch({ type: UPDATE_CAFE_ERROR, error });
const cafeListGetSuccess = (dispatch: Dispatch, payload: any) => dispatch({ type: GET_CAFE_LIST_SUCCESS, payload });
const cafeListGetError = (dispatch: Dispatch, error: any) => dispatch({ type: GET_CAFE_LIST_ERROR, error });


export const createCafe = (reqData: any) => async (dispatch: Dispatch) => {
    setIsSpin(dispatch, true);
    return httpClient.post(`/cafe`).then((response: any) => {

        setIsSpin(dispatch, false);
        if (response.data.success) {
            cafeDetailSuccess(dispatch, response.data.data);
            setNotification('success', "CAFE Created success");
        } else {
            cafeDetailError(dispatch, "Sorry, something went wrong. Please try again later.");
            setNotification('error', "Sorry, something went wrong. Please try again later.");
        }
    }).catch((error) => {
        setIsSpin(dispatch, false);
        if (error.request && error.request.response) {
            cafeDetailError(dispatch, error.request.response);
            setNotification('error', error.request.response);
        } else {
            cafeDetailError(dispatch, "Sorry, something went wrong. Please try again later.");
            setNotification('error', "Sorry, something went wrong. Please try again later.");
        }
    })
}
export const updateCafe = (cafeId: string, reqData: any) => async (dispatch: Dispatch) => {
    setIsSpin(dispatch, true);
    console.log(cafeId);
    await httpClient.patch(`cafe${cafeId}`, reqData).then((response: any) => {
        setIsSpin(dispatch, false);
        if (response.data.success) {
            cafeUpdateSuccess(dispatch, response.data.data)
            setNotification('success', 'Cafe Information Update success');
        } else {
            cafeUpdateError(dispatch, "Sorry, something went wrong. Please try again later.");
            setNotification('error', "Sorry, something went wrong. Please try again later.");
           
        }
    }).catch((error) => {
        setIsSpin(dispatch, false);
        if (error.request && error.request.response) {
            cafeUpdateError(dispatch, error.request.response)
            setNotification('error', error.request.response);
         
        } else {
            cafeUpdateError(dispatch, "Sorry, something went wrong. Please try again later.");
            setNotification('error', "Sorry, something went wrong. Please try again later.");
           
        }
    })
}

export const getCafeList = () => async (dispatch: Dispatch) => {

    setIsSpin(dispatch, true);
    return httpClient.get(`cafes`).then((response: any) => {
        setIsSpin(dispatch, false);
        if (response.data.success) {
            cafeListGetSuccess(dispatch, response.data.data)
        } else {
           
            cafeListGetError(dispatch, "error");
        }
    }).catch((error) => {
        setIsSpin(dispatch, false);
        if (error.request && error.request.response) {
            cafeListGetError(dispatch, error.request.response)
        } else {
            cafeListGetError(dispatch, "error");
        }
    })
}