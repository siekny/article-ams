import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../config/API'
import { Article } from '../../constants/ActionType';


// **** START POST ARTICLE *****
const postArticleLoading = () => {
    return {
        type: Article.POST_LOADING
    };
};

const postArticleSuccess = (article) => ({
    type: Article.POST_SUCCESS,
    article
});

const postArticleFail = (error) => ({
    type: Article.POST_FAIL,
    error
});

export const postArticle = (article, ownProps) => {
    console.log(article);
    return (dispatch) => {
        dispatch(postArticleLoading());
        axios
            .post(`${BASE_URL}/articles/`, article, {
                // headers: {
                // 	Authorization: "Bearer " + accessToken
                // }
            })
            .then((res) => {
                dispatch(postArticleSuccess(res.data));
                ownProps.history.push("/article");
            })
            .catch((err) => {
                dispatch(postArticleFail(err))
            });
    };
}

// *** GET ALL ARTICLES *** //
const getArticlesLoading = () => {
    return {
        type: Article.GET_LOADING
    };
};

const getArticlesSuccess = (articles) => ({
    type: Article.GET_LOADING_SUCCESS,
    articles
});

const getArticlesFail = (error) => ({
    type: Article.GET_LOADING_FAIL,
    error
});

export const getArticles = () => {
    return (dispatch) => {
        dispatch(getArticlesLoading());
        axios
            .get(`${BASE_URL}/articles/`)
            .then((res) => {
                dispatch(getArticlesSuccess(res.data))
            })
            .catch((err) => {
                console.log('fail', err);
                dispatch(getArticlesFail(err))
            });
    };
}

// *** GET ALL ARTICLES *** //
const getArticlesByCategoryLoading = () => {
    return {
        type: Article.GET_BY_CATEGORY_LOADING
    };
};

const getArticlesByCategorySuccess = (getArticlesByCategory) => ({
    type: Article.GET_BY_CATEGORY_LOADING_SUCCESS,
    getArticlesByCategory
});

const getArticlesByCategoryFail = (error) => ({
    type: Article.GET_BY_CATEGORY_LOADING_FAIL,
    error
});

// *** GET ARTICLES BY CATEGORY *** //
export const getArticlesByCategory = (categoryId) => {
    return (dispatch) => {
        dispatch(getArticlesByCategoryLoading());
        axios
            .get(`${BASE_URL}/articles/?categoryId=${categoryId}`)
            .then((res) => {
                dispatch(getArticlesByCategorySuccess(res.data))
            })
            .catch((err) => {
                console.log('fail', err);
                dispatch(getArticlesByCategoryFail(err))
            });
    };
}


// *** GET ALL ARTICLES *** //
const getOneArticleLoading = () => {
    return {
        type: Article.GET_ONE_LOADING
    };
};

const getOneArticleSuccess = (articleDetail) => ({
    type: Article.GET_ONE_LOADING_SUCCESS,
    articleDetail
});

const getOneArticleFail = (error) => ({
    type: Article.GET_ONE_LOADING_FAIL,
    error
});


// **** START UPDATE ARTICLE *****
const updateArticleLoading = () => {
    return {
        type: Article.POST_LOADING
    };
};

const updateArticleSuccess = (article) => ({
    type: Article.POST_SUCCESS,
    article
});

const updateArticleFail = (error) => ({
    type: Article.POST_FAIL,
    error
});

export const updateArticle = (article, ownProps) => {
    console.log(article);
    return (dispatch) => {
        dispatch(updateArticleLoading());
        axios
            .put(`${BASE_URL}/articles/${article.articleId}`, article, {
                // headers: {
                // 	Authorization: "Bearer " + accessToken
                // }
            })
            .then((res) => {
                dispatch(updateArticleSuccess(res.data));
                ownProps.history.push("/article/" + article.articleId);
            })
            .catch((err) => {
                dispatch(updateArticleFail(err))
            });
    };
}

export const getOneArticle = (articleId) => {
    return (dispatch) => {
        dispatch(getOneArticleLoading());
        axios
            .get(`${BASE_URL}/articles/${articleId}`)
            .then((res) => {
                dispatch(getOneArticleSuccess(res.data))
            })
            .catch((err) => {
                console.log('fail', err);
                dispatch(getOneArticleFail(err))
            });
    };
}