import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

class Semesters extends Component {
    state = {
        semester: '',
        semesters: []
    }

    componentDidMount() {
        this.getSemesters();
    }

    getSemesters = () => {
        axios.get('/api/courses/all')
            .then(semesters => this.setState({ semesters: semesters.data }));
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.props.handleSemesters(value);
    }

    render() {
        return (
            <div>


                <div className="input-group mb-3" id="ddlSem">
                    <div className="input-group-prepend">
                        <label className="input-group-text">Semesters: </label>
                    </div>
                    <select name='semester' value={this.state.semester} onChange={this.handleChange} className="form-select" aria-label="Default select example">
                        <option key="nothing" hidden value=''></option>
                        {this.state.semesters.map((sem) => (
                            <option key={sem} value={sem}>{sem}</option>
                        ))}
                    </select>
                </div>


            </div>
        )
    }
}

export default Semesters
