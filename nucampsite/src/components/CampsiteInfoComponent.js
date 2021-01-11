/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import { Button, Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem,
    Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;


class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            rating: '',
            name: '',
            comment: ''
        };
    }

    handleSubmit(values) {
        console.log("Current state is " + JSON.stringify(values));
        alert("Current state is : " + JSON.stringify(values));
    }
    
    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    handleSubmit = (values) => {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }

    render() {
        return(
            <React.Fragment>
                <Button outline className="fa fa-pencil fa-lg" onClick={this.toggleModal}> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author" className="form-control" validators={{
                                    required,
                                    minLength: minLength(2),
                                    maxLength: maxLength(15),
                                }}/>
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                                
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Comment</Label>
                                <Control.textarea rows="6" model=".text" id="text" name="text" className="form-control" validators={{
                                    required,
                                    minLenght: minLength(1),
                                    maxLength: maxLength(100),}}/>
                            </div>
                            <Errors
                                    className="text-danger"
                                    model=".text"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Please enter your comment.',
                                        minLength: 'Please enter your comment.',
                                        maxLength: 'Must be 100 characters or less'
                                    }}
                                />
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    } 
}

// Because this component doesn't change state at all, it can be
//  rendered as a functional component. (As opposed to our Main
//  component that does change state.)
// Displays a single campsite (object) that the user selects: 
//  image, title, description and comments.
function RenderCampsite({campsite}) {
    if (campsite) {
        // Uses ReactStrap Card components to display the campsite
        return (<div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>                
        </div>)
    }
    return (<div />);
}

// Comments about the selected campsite are a part of the campsite object.
//  On medium screens and up, they are displayed to the right of the campsite
//  card. Otherwise, they will stack below.
// Notice how we are able to use "map" to iterate through and display each
//  comment in its own div.
function RenderComments({comments}) {
    if (comments) {
        return(
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                { comments.map(comment => { 
                    return (
                        <div>
                            <div>{comment.text}</div>
                            <div>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
                            <br />
                        </div>
                    )
                })}
                <CommentForm />
            </div>
        );
    }
    return(<div />);
}

function CampsiteInfo(props) {
    if (props.campsite) {
        // This creates a separate Bootstrap container & row to display
        //  the campsite (if there is one selected)
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                    
                </div>
            </div>
        );
    }
    return (<div />);
};

export default CampsiteInfo;

{/* <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                /> */}
