import React, { Component } from 'react'
import { Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import articleImage from './../../assets/image/default.jpg';
// import { getCategories } from '../../redux/actions/CategoryActions';
import { getOneArticle, postArticle, updateArticle } from '../../redux/actions/ArticleActions';
import swal from "sweetalert";
import { getCategories } from '../../redux/actions/CategoryActions';
import ReactFilestack from 'filestack-react';
import { fileStackKey } from '../../config/API';
import Header from '../../components/Header';

export class EditCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: 0,
            title: '',
            description: '',
            image: '',
            categoryId: 0,
            prevPath: '',
        }
    }
    componentDidMount() {
        const articleId = this.props.match.params.articleId;
        this.props.getCategories();
        this.props.getOneArticle(articleId);
    }

    componentDidUpdate(previousProps, previousState) {

        const { article } = this.props;
        console.log('articleMount', article);

        if (previousProps.article !== this.props.article) {
            this.setState({
                articleId: article?.articleId,
                title: article?.title,
                description: article?.description,
                imageUrl: article?.imageUrl,
                categoryId: article?.category?.categoryId,
                userId: article?.user?.userId,
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleChangeImage = ({ target }) => {

        if (target.files[0] != null) {
            const file = target.files[0];
            this.setState({ imageUrl: URL.createObjectURL(file) });

            const fileReader = new FileReader();

            fileReader.addEventListener("load", (e) => {
                this.setState({
                    imageUrl: e.target.result,
                });
            });

            fileReader.readAsDataURL(file);
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { title, description } = this.state;
        const article = {
            articleId: this.state.articleId,
            title,
            description,
            imageUrl: this.state.imageUrl,
            category: {
                categoryId: this.state.categoryId
            },
            user: {
                userId: localStorage.getItem("loginUserId",)
            }
        };
        this.props.updateArticle(article);
    }

    render() {
        if (localStorage.getItem('loginEmail') == null) {
            return <Redirect to='/login' />
        }
        const { categoryList } = this.props;
        return (
            <div>
                <Header />
                <Container>
                    <Row>
                        <Link to={`/article#${this.state.categoryId}`} className="float-left mb-3">អត្ថបទ </Link><span className="float-left"> / កែប្រែអត្ថបទ</span>
                    </Row>
                    <Card className="">
                        <Card.Body className="py-5 px-5">
                            <Form className="container mx-auto row" onSubmit={this.handleSubmit} name="form">
                                <Col md={8}>
                                    <Form.Group as={Row} className="d-flex justify-content-center">
                                        <Col sm="12">
                                            <Form.Control
                                                className="textField"
                                                name="title"
                                                placeholder="ចំណងជើងអត្ថបទ"
                                                type="text"
                                                value={this.state.title}
                                                onChange={this.handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Control as="select" onChange={this.handleChange} name="categoryId" value={this.state.categoryId}>
                                            {
                                                categoryList.map(category =>
                                                    <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                                                )
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Row} className="d-flex justify-content-center">
                                        <Col sm="12">
                                            <Form.Control as="textarea" rows={5}
                                                className="no-outline"
                                                type="text"
                                                name="description"
                                                placeholder="ការពិពណ៌នាអំពីអត្ថបទ"
                                                value={this.state.description}
                                                onChange={this.handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <div className="text-center mt-4">
                                        <button className="btn btn-primary loginButton w-100" block="true">
                                            កែប្រែអត្ថបទ
                                </button>
                                    </div>
                                </Col>
                                <Col xs={4} md={4}>
                                    <Image src={this.state.imageUrl || articleImage} rounded className="w-100" />
                                    {/* <input type="file" onChange={this.handleChangeImage} /> */}
                                    <ReactFilestack
                                        apikey={fileStackKey}
                                        onSuccess={(res) => {
                                            this.setState({
                                                imageUrl: res.filesUploaded[0].url
                                            })
                                        }}
                                    />
                                    {/* <Form.File
                                    id="file-image"
                                    label="បញ្ចូលរូបភាព"
                                    accept="image/*"
                                    custom
                                    onChange={this.handleChangeImage}
                                /> */}
                                </Col>

                            </Form>
                        </Card.Body>
                    </Card>
                    {/* <h6 className="text-center my-4 title">{new Date().getFullYear()} © Hybrid React Native Course. All right reserved.</h6> */}
                </Container>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    categoryList: state.category.categoryList,
    article: state.article.article,
})

const mapDispatchToProps = (dispatch, ownProp) => ({
    getCategories: () => dispatch(getCategories()),
    getOneArticle: (categoryId) => dispatch(getOneArticle(categoryId)),
    updateArticle: (article) => dispatch(updateArticle(article, ownProp))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory)
