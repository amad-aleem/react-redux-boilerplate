import React, { Component } from 'react';
import { connect } from 'react-redux';
import doggoImage from '../../../images/doggo.jpg';
import * as actions from './actions';

class Home extends Component {
    componentDidMount = () => {
        this.props.getBreeds();
    }
    render() {
        return (
            <div className="app">
                <h1>Doggo Search</h1>
                <p>All great things have small beginnings.</p>
                <img src={doggoImage} width="600" alt="" />
                <p>
                    Be sure to take advantage of <a href="https://ant.design/components/button/">Ant Design's components</a>:
            </p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allBreeds: state.appReducer.allBreeds
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBreeds: () => {
            dispatch(actions.getAllBreeds());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
