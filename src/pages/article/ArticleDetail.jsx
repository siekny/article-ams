import React, { Component } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import { AiOutlineEdit } from 'react-icons/ai'
import { VscTrash } from 'react-icons/vsc'
import { connect } from 'react-redux'
import { getOneArticle } from '../../redux/actions/ArticleActions'
import cardImage from '../../assets/image/default.jpg';
import { getUserStorage, isAuth } from '../../constants/Storage'
import { Link, Redirect } from 'react-router-dom'
import Header from '../../components/Header'

export class ArticleDetail extends Component {

    componentWillMount() {
        const articleId = this.props.match.params.articleId;
        console.log(articleId);
        this.props.getOneArticle(articleId)
    }
    render() {
        if (localStorage.getItem('loginEmail') == null) {
            return <Redirect to='/login' />
        }
        const { article } = this.props
        console.log('article-detail', article);
        console.log(getUserStorage());
        return (
            <div>
                <Header />
                <Container>
                    <Row className="mb-3">
                        <Link to="/article" className="float-left">អត្ថបទ </Link><span className="float-left"> / អត្ថបទលំអិត</span>
                    </Row>

                    <Card className="border-0">
                        <Card className="border-0 shadow-sm p-4 mb-3 bg-white">
                            <div className="mb-3">
                                <Card.Img variant="top" src={article?.user?.profile !== null ? article?.user?.profile : cardImage} style={{ width: "50px", height: "50px", borderRadius: "50%", border: "1px solid #eee" }} />
                                <strong style={{ textAlign: "justify" }} className="ml-3">{article?.user?.userName !== null ? article?.user?.userName : 'Anonymous'}</strong>
                                <span className="float-right text-secondary"> | {article?.createdDate}</span>
                                <span className="float-right mr-1" style={{ backgroundColor: article?.category?.color, color: "#fff", padding: "2px 10px", borderRadius: "13px" }}>{article?.category?.categoryName != null ? article?.category?.categoryName : 'None Category'} </span>
                            </div>
                            <Card.Text style={{ textAlign: "justify" }}>{article?.title}</Card.Text>
                            <Card.Img variant="top" src={article?.imageUrl !== null ? article?.imageUrl : cardImage} />
                            <Card.Body className="pl-0 pr-0 pb-0">
                                <Card.Text style={{ textAlign: "justify" }}>{article?.description}</Card.Text>
                                {
                                    isAuth(article?.user?.userId) === true ?
                                        <span>
                                            <VscTrash className="float-left mr-2 text-danger" />
                                            <Link to={`/article-edit-${article.articleId}`}><AiOutlineEdit className="float-left text-success" /></Link>
                                        </span>

                                        : ''
                                }

                            </Card.Body>
                        </Card>
                    </Card>
                </Container>
            </div>

        )
    }
}
const mapStateToProps = (state) => ({
    loading: state.article.loading,
    article: state.article.article,
    error: state.article.error
})

const mapDispatchToProps = (dispatch) => ({
    getOneArticle: (articleId) => dispatch(getOneArticle(articleId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail)
