import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import Header from '../../components/Header'

export class CategoryPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <Container>
                    <h1>Category</h1>
                </Container>
            </div>
        )
    }
}

export default CategoryPage
