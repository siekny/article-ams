import axios from "axios"
import { BASE_URL } from '../../config/API'
import { Category } from "../../constants/ActionType";

// *** GET ALL ARTICLES *** //
const getCategoriesLoading = () => {
    return {
        type: Category.GET_LOADING
    };
};

const getCategoriesSuccess = (categories) => ({
    type: Category.GET_LOADING_SUCCESS,
    categories
});

const getCategoriesFail = (error) => ({
    type: Category.GET_LOADING_FAIL,
    error
});

export const getCategories = () => {
    return (dispatch) => {
        dispatch(getCategoriesLoading());
        console.log('loading');
        axios
            .get(`${BASE_URL}/categories/all`)
            .then((res) => {
                console.log('success-1', res.data);
                dispatch(getCategoriesSuccess(res.data))
            })
            .catch((err) => {
                console.log('fail', err);
                dispatch(getCategoriesFail(err))
            });
    };
}