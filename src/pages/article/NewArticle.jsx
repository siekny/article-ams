import React, { Component } from 'react'
import { Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import articleImage from './../../assets/image/default.jpg';
// import { getCategories } from '../../redux/actions/CategoryActions';
import { postArticle } from '../../redux/actions/ArticleActions';
import swal from "sweetalert";
import { getCategories } from '../../redux/actions/CategoryActions';
import ReactFilestack from 'filestack-react';
import { fileStackKey } from '../../config/API';
import Header from '../../components/Header';

export class NewArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: 0,
            title: '',
            description: '',
            imageUrl: '',
            categoryId: 0,
        }
    }

    componentDidMount() {
        this.props.getCategories()
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleChangeImage = ({ target }) => {

        if (target.files[0] != null) {
            const file = target.files[0];
            this.setState({ image: URL.createObjectURL(file) });

            const fileReader = new FileReader();

            fileReader.addEventListener("load", (e) => {
                this.setState({
                    image: e.target.result,
                });
            });

            fileReader.readAsDataURL(file);
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { title, description } = this.state;
        const article = {
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
        this.props.postArticle(article);
    }

    getSnapshotBeforeUpdate(preProps) {
        const preArticle = preProps.article;
        if (preArticle !== this.props.article) {
            // swal("Saved!", "You save success", "success");
            // this.setState({
            //     imageUrl:
            //         "https://www.webcraft.com.mt/assets/img/No-Image-Thumbnail.png",
            //     title: "",
            //     description: ""
            // });
            return <Redirect to={`/article`} />
        }
        return null;
    }
    render() {
        const { categoryList } = this.props;
        // console.log('categories', categories);
        if (localStorage.getItem('loginEmail') == null) {
            return <Redirect to='/login' />
        }
        return (
            <div>

                <Header />
                <Container>
                    <Row>
                        <Link to="/article" className="float-left mb-3">អត្ថបទ </Link><span className="float-left"> / បន្ថែមអត្ថបទថ្មី</span>
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
                                            បញ្ចូលអត្ថបទ
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
    article: state.article
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getCategories: () => dispatch(getCategories()),
    postArticle: (article) => dispatch(postArticle(article, ownProps))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle)
