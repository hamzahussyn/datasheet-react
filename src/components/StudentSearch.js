import React, { Component } from 'react'
import axios from 'axios'
import StudentDetails from './StudentDetails';
import Semesters from './Semesters';
import DisplayCourses from './DisplayCourses';
import DisplayRegistrations from './DisplayRegistrations';

class StudentSearch extends Component {
    state = {
        regno: '',
        studentname: '',
        fathername: '',
        submit: false,
        semester: null,
        registrations: [],
        grades: [],
        gpa: {},
        allRegisteredCourses: []
    };

    getRegistrations = () => {
        const { regno } = this.state;
        axios.get(`/api/registrations/${regno}`)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({ registrations: res.data[0] });
                    this.setState({ grades: res.data[1] });
                    //this.setState({ gpa: res.data.length === 3 ? res.data[2].gpa : null });
                    console.log(res.data);
                    if (res.data[0].length !== 0) {
                        this.setState({ allRegisteredCourses: [] })
                        res.data[0].forEach((reg) => {
                            this.setState({ allRegisteredCourses: [...this.state.allRegisteredCourses, reg.course.courseid] })
                        })
                    }
                    else {
                        this.setState({ allRegisteredCourses: [] })
                    }
                    //this.setState({allRegisteredCourses: res.data[0].map((reg)=>())})
                }
            })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleRefreshRegistration = () => {
        this.getRegistrations();
    }

    handleSemesters = (sem) => {
        this.setState({ semester: sem })
    }

    handleClick = () => {
        axios.get(`/api/students/${this.state.regno}`)
            .then((student) => {
                console.log(student)
                this.setState({
                    studentname: student.data.studentname,
                    fathername: student.data.fathername,
                    submit: true
                })
            })
        this.getRegistrations();
    }

    render() {
        return (
            <div>

                <div className="col" style={{ marginLeft: '10px' }}>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon3">Reg. No : </span>
                        </div>
                        <input type="text" className="form-control inputHeight" id="regno" aria-describedby="basic-addon3"
                            value={this.state.regno} name='regno' placeholder='regno' onChange={this.handleChange}
                        />
                        <button type="button" className="btn btn-primary" onClick={this.handleClick}>Search</button>

                    </div>


                    <br></br>

                    {this.state.submit === true && <StudentDetails studentname={this.state.studentname} fathername={this.state.fathername} />}

                    <br></br>
                    {this.state.submit === true && <Semesters handleSemesters={this.handleSemesters} />}

                    <br></br>
                    {this.state.semester !== null &&
                        <DisplayCourses
                            semester={this.state.semester}
                            regno={this.state.regno}
                            allRegisteredCourses={this.state.allRegisteredCourses}
                            refreshRegistration={this.handleRefreshRegistration} />}


                    <pre>{JSON.stringify(this.state, null, 2)}</pre>
                </div>

                <div className="col">
                    {this.state.registrations.length !== 0 &&
                        <DisplayRegistrations
                            registrations={this.state.registrations}
                            grades={this.state.grades}
                            gpa={this.state.gpa}
                            regno={this.state.regno}
                            refreshRegistration={this.handleRefreshRegistration} />}
                </div>

            </div>
        )
    }
}

export default StudentSearch
