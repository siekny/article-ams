import { Category } from '../../constants/ActionType';
import { updateObject } from '../../utilities/Utilities';

const initialState = {
    loading: false,
    category: null,
    categoryList: [],
    error: null
};

// ***** START POST ARTICLE *****
const postLoading = (state) => {
    console.log('state', state);
    return updateObject(state, {
        loading: true
    });
};
const postCategorySuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        category: action.category
    });
};

const postCategoryFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        category: null,
        error: action.error
    });
};

// *** START GETTING ALl ARTICLES *** //
const getLoading = (state, action) => {
    console.log('state', state);
    return updateObject(state, {
        loading: true,
        error: null
    });
};
const getCategoriesSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        categoryList: action.categories,
        error: null
    });
};

const getCategoriesFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        categoryList: [],
        error: action.error
    });
};
// *** END FETCH ARTICLE DETAIL *** //

// *** START GETTING ALl ARTICLES *** //
const getOneLoading = (state, action) => {
    console.log('state', state);
    return updateObject(state, {
        loading: true,
        error: null
    });
};
const getOneCategorySuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        category: action.categoryDetail,
        error: null
    });
};

const getOneCategoryFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        category: null,
        error: action.error
    });
};
// *** END FETCH ARTICLE DETAIL *** //

export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case Category.POST_LOADING:
            return postLoading();
        case Category.POST_SUCCESS:
            return postCategorySuccess(state, action);
        case Category.POST_FAIL:
            return postCategoryFail(state, action);

        case Category.GET_LOADING:
            return getLoading(state, action);
        case Category.GET_LOADING_SUCCESS:
            return getCategoriesSuccess(state, action);
        case Category.GET_LOADING_FAIL:
            return getCategoriesFail(state, action);

        case Category.GET_ONE_LOADING:
            return getOneLoading(state, action);
        case Category.GET_ONE_LOADING_SUCCESS:
            return getOneCategorySuccess(state, action);
        case Category.GET_ONE_LOADING_FAIL:
            return getOneCategoryFail(state, action);


        default:
            return state;
    }
};