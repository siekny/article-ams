import { Article } from '../../constants/ActionType';
import { updateObject } from '../../utilities/Utilities';

const initialState = {
    loading: false,
    article: null,
    articleList: [],
    articleListByCategory: [],
    error: null
};

// ***** START POST ARTICLE *****
const postLoading = (state) => {
    return updateObject(state, {
        loading: true
    });
};
const postArticleSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        article: action.article
    });
};

const postArticleFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        article: null,
        error: action.error
    });
};

// *** START GETTING ALl ARTICLES *** //
const getLoading = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
};
const getArticlesSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        articleList: action.articles,
        error: null
    });
};

const getArticlesFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        articleList: [],
        error: action.error
    });
};
// *** END FETCH ARTICLE DETAIL *** //

// *** START GETTING ALl ARTICLES *** //
const getByCategoryLoading = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
};
const getArticlesByCategorySuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        articleListByCategory: action.getArticlesByCategory,
        error: null
    });
};

const getArticlesByCategoryFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        articleListByCategory: [],
        error: action.error
    });
};
// *** END FETCH ARTICLE DETAIL *** //

// *** START GETTING ALl ARTICLES *** //
const getOneLoading = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
};
const getOneArticleSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        article: action.articleDetail,
        error: null
    });
};

const getOneArticleFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        article: null,
        error: action.error
    });
};
// *** END FETCH ARTICLE DETAIL *** //



// ***** START UPDATE ARTICLE *****
const updateLoading = (state) => {
    return updateObject(state, {
        loading: true
    });
};
const updateArticleSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        article: action.article
    });
};

const updateArticleFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        article: null,
        error: action.error
    });
};


export default function articleReducer(state = initialState, action) {
    switch (action.type) {
        case Article.POST_LOADING:
            return postLoading();
        case Article.POST_SUCCESS:
            return postArticleSuccess(state, action);
        case Article.POST_FAIL:
            return postArticleFail(state, action);

        case Article.GET_LOADING:
            return getLoading(state, action);
        case Article.GET_LOADING_SUCCESS:
            return getArticlesSuccess(state, action);
        case Article.GET_LOADING_FAIL:
            return getArticlesFail(state, action);

        case Article.GET_BY_CATEGORY_LOADING:
            return getByCategoryLoading(state, action);
        case Article.GET_BY_CATEGORY_LOADING_SUCCESS:
            return getArticlesByCategorySuccess(state, action);
        case Article.GET_BY_CATEGORY_LOADING_FAIL:
            return getArticlesByCategoryFail(state, action);

        case Article.GET_ONE_LOADING:
            return getOneLoading(state, action);
        case Article.GET_ONE_LOADING_SUCCESS:
            return getOneArticleSuccess(state, action);
        case Article.GET_ONE_LOADING_FAIL:
            return getOneArticleFail(state, action);

        case Article.UPDATE_LOADING:
            return updateLoading();
        case Article.UPDATE_SUCCESS:
            return updateArticleSuccess(state, action);
        case Article.UPDATE_FAIL:
            return updateArticleFail(state, action);


        default:
            return state;
    }
};