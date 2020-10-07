import React from 'react';
import './App.css';
import LoginPage from './pages/login/LoginPage';
import Switch from 'react-bootstrap/esm/Switch';
import HomePage from './pages/home/HomePage';
import ArticlePage from './pages/article/ArticlePage';

import ArticleDetail from './pages/article/ArticleDetail';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import UserPage from './pages/user/UserPage';
import CategoryPage from './pages/category/CategoryPage';
import NewArticle from './pages/article/NewArticle';
import LogoutPage from './pages/LogoutPage';
import EditCategory from './pages/article/EditCategory';

function App() {
    return (
        <div>
            <Router>
                <Switch className="p-0">
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/article-new" component={NewArticle} />
                    <Route exact path="/article" component={ArticlePage} />
                    <Route exact path="/article/:articleId" component={ArticleDetail} />
                    <Route exact path="/article-edit-:articleId" component={EditCategory} />
                    <Route exact path="/user" component={UserPage} />
                    <Route exact path="/category" component={CategoryPage} />
                    <Route exact path="/logout" component={LogoutPage} />
                    {/* <Route path="*" component={Error404Screen} /> */}
                </Switch >

            </Router>
        </div >
    );
}
export default App;