import React, { Component } from 'react'
import { Card, Col, Tab } from 'react-bootstrap';
import { AiOutlineEdit } from 'react-icons/ai';
import { VscTrash } from 'react-icons/vsc';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cardImage from './../assets/image/default.jpg';
import { getArticles, getArticlesByCategory } from '../redux/actions/ArticleActions';
import { isAuth } from '../constants/Storage';

class articles extends Component {
    componentDidMount() {
        this.props.getArticles();
        this.props.getArticlesByCategory();
    }

    render() {
        const { articleList } = this.props;
        const articleListByCategory = this.props.articleListByCategory;
        return (
            <Col md={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="#">
                        {
                            articleList?.map(article =>

                                <Card className="border-0 p-2" key={article.articleId}>
                                    <Card className="border-0 shadow-sm p-4 mb-3 bg-white">
                                        <div className="mb-3">
                                            <Card.Img variant="top" src={article.user?.profile !== null ? article.user?.profile : cardImage} style={{ width: "50px", height: "50px", borderRadius: "50%", border: "1px solid #eee" }} />
                                            <strong style={{ textAlign: "justify" }} className="ml-3">{article.user?.userName !== null ? article.user?.userName : 'Anonymous'}</strong>
                                            <span className="float-right text-secondary"> | {article?.createdDate}</span>
                                            <span className="float-right mr-1" style={{ backgroundColor: article.category?.color, color: "#fff", padding: "2px 10px", borderRadius: "13px" }}>{article?.category?.categoryName != null ? article?.category?.categoryName : 'None Category'} </span>
                                        </div>
                                        <Card.Text style={{ textAlign: "justify" }}>{article.title}</Card.Text>
                                        <Card.Img variant="top" src={article.imageUrl !== null ? article.imageUrl : cardImage} />
                                        <Card.Body className="pl-0 pr-0 pb-0">
                                            {/* <Card.Text style={{ textAlign: "justify" }}>{article.description}</Card.Text> */}
                                            <Link className="text-danger float-right" to={`/article/${article.articleId}`}>See More</Link>
                                            {
                                                isAuth(article.user?.userId) === true ?
                                                    <span>
                                                        <Link to=''><VscTrash className="float-left mr-2 text-danger" /></Link>
                                                        <Link to={`/article-edit-${article.articleId}`}><AiOutlineEdit className="float-left text-success" /></Link>
                                                    </span>

                                                    : ''
                                            }


                                        </Card.Body>
                                    </Card>
                                </Card>

                            )
                        }

                    </Tab.Pane>

                    {

                        // articleListByCategory?.length === 0 ? <h2 className='text-center text-secondary'>Article is not yet available</h2> :
                        articleListByCategory?.map(article =>
                            <Tab.Pane eventKey={`#${article?.category?.categoryId}`} key={article.articleId}>
                                <Card className="border-0 p-2">
                                    <Card className="border-0 shadow-sm p-4 mb-3 bg-white">
                                        <div className="mb-3">
                                            <Card.Img variant="top" src={article.user?.profile !== null ? article.user?.profile : cardImage} style={{ width: "50px", height: "50px", borderRadius: "50%", border: "1px solid #eee" }} />
                                            <strong style={{ textAlign: "justify" }} className="ml-3">{article.user?.userName !== null ? article.user?.userName : 'Anonymous'}</strong>
                                            <span className="float-right text-secondary"> | {article?.createdDate}</span>
                                            <span className="float-right mr-1" style={{ backgroundColor: article.category?.color, color: "#fff", padding: "2px 10px", borderRadius: "13px" }}>{article?.category?.categoryName != null ? article?.category?.categoryName : 'None Category'} </span>

                                        </div>
                                        <Card.Text style={{ textAlign: "justify" }}>{article.title}</Card.Text>
                                        <Card.Img variant="top" src={article.imageUrl !== null ? article.imageUrl : cardImage} />
                                        <Card.Body className="pl-0 pr-0 pb-0">
                                            {/* <Card.Text style={{ textAlign: "justify" }}>{article.description}</Card.Text> */}
                                            <Link className="text-danger float-right" to={`/article/${article.articleId}`}>See More</Link>
                                            {
                                                isAuth(article.user?.userId) === true ?
                                                    <span>
                                                        <VscTrash className="float-left mr-2 text-danger" />
                                                        <Link to={`/article-edit-${article.articleId}`}><AiOutlineEdit className="float-left text-success" /></Link>
                                                    </span>

                                                    : ''
                                            }


                                        </Card.Body>
                                    </Card>
                                </Card>

                            </Tab.Pane>
                        )
                    }

                </Tab.Content>
            </Col>
        )
    }
}

const mapStateToProps = (state) => ({
    articleList: state.article.articleList,
    articleListByCategory: state.article.articleListByCategory,
    loading: state.article.loading,
    error: state.article.error
})

const mapDispatchToProps = (dispatch) => ({
    getArticles: () => dispatch(getArticles()),
    getArticlesByCategory: (categoryId) => dispatch(getArticlesByCategory(categoryId))
})

export default connect(mapStateToProps, mapDispatchToProps)(articles)
