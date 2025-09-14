import React from 'react'
import { data } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
const Footer = () => {
    let today = new Date()
  return (
    <footer className='bg-dark text-light py-3 footer mt-lg-5'>
        <Container>
            <Row>
                <Col xs={12} md={12} className="text-center">
                <p className='mb-0'> &copy; {today.getFullYear()} Darbar Hotel</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer
