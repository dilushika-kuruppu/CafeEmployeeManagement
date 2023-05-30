import { Reducer } from "react";
import { IStore } from "../../shared/interfaces/commonInterfaces";
import { CafeList,CafeState } from "../../shared/types/commonTypes";
import { SET_CURRENT_PAGE,GET_CAFE_LIST_SUCCESS, GET_CAFE_LIST_ERROR, SET_ROWS, SET_SKIP, SET_TAKE, SET_CAFE_DETAIL, SET_CAFE_DETAIL_ERROR,UPDATE_CAFE_SUCCESS,UPDATE_CAFE_ERROR } from "../../shared/contants";

const initialState: CafeState = {
    cafeList: {} as CafeList,
    cafeListError: undefined,
    rows: 10,
    skip: 0,
    take: 10,
    currentPage: 0,
    cafeDetail: undefined,
    cafeDetailError: undefined,
    cafeUpdateError: undefined,
}

const CafeReducer: Reducer<CafeState, any> = (state: CafeState = initialState, action: IStore) => {
    switch (action.type) {

         case GET_CAFE_LIST_SUCCESS:
                return {
                    ...state, cafeList: { ...action.payload }
                }
         case GET_CAFE_LIST_ERROR:
                return {
                    ...state, cafeListError: action.error
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

            case SET_CAFE_DETAIL:
            return {
                ...state, cafeDetail: action.payload
            }
        case SET_CAFE_DETAIL_ERROR:
            return {
                ...state, cafeDetailError: action.error
            }

        case UPDATE_CAFE_SUCCESS:
            return {
                ...state, cafeDetail: action.payload,
            }
        case UPDATE_CAFE_ERROR:
            return {
                ...state, cafeUpdateError: action.error
            }
        default:
            return state;
    }
}

export default CafeReducer;