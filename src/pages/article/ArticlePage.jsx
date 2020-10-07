import React, { Component } from 'react'
import { Col, Container, ListGroup, Row, Tab } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Articles from '../../components/article';
import Header from '../../components/Header';
import { getArticlesByCategory } from '../../redux/actions/ArticleActions';
import { getCategories } from '../../redux/actions/CategoryActions';


export class ArticlePage extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false,
        };

        this.handleShow = () => {
            this.setState({ show: true });
        };

        this.handleHide = () => {
            this.setState({ show: false });
        };
    }
    componentDidMount() {
        this.props.getCategories(1)
    }

    handleCategory = (categoryId) => {
        this.props.getArticlesByCategory(categoryId);
    }

    render() {
        if (localStorage.getItem('loginEmail') == null) {
            return <Redirect to='/login' />
        }
        const { categoryList } = this.props;
        const { articleListByCategory } = this.props;
        console.log('articleListByCategory', articleListByCategory);

        return (
            <div>
                <Header />
                <Container>
                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#">

                        <Row>

                            {/* <Sidebar /> */}
                            <Col md={3}>
                                <Link to="/article-new" className="float-left​ mb-3">បន្ថែមអត្ថបទថ្មី</Link>
                                <ListGroup className="w-100 mt-3">
                                    <ListGroup.Item action href="#">
                                        អត្ថបទគ្រប់ប្រភេទ
                    </ListGroup.Item>
                                    {
                                        categoryList?.map(category =>
                                            <ListGroup.Item action href={`#${category.categoryId}`}
                                                onClick={(categoryId) => this.handleCategory(category.categoryId)}
                                                key={category.categoryId}>
                                                {category.categoryName}
                                            </ListGroup.Item>
                                        )
                                    }
                                </ListGroup>
                            </Col>
                            <Articles articleListByCategory={articleListByCategory} />

                        </Row>
                    </Tab.Container>
                </Container>
            </div>

        )
    }
}
const mapStateToProps = (state) => ({
    categoryList: state.category.categoryList,
    loading: state.category.loading,
    error: state.category.error,
    articleListByCategory: state.article.articleListByCategory,
    categoryId: state.categoryId,
})

const mapDispatchToProps = (dispatch) => {
    return ({
        getCategories: () => dispatch(getCategories()),
        getArticlesByCategory: (categoryId) => dispatch(getArticlesByCategory(categoryId))
    })

}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage)
