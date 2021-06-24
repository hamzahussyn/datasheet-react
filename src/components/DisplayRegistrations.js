import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class DisplayRegistrations extends Component {

    state = {
        gpa: '',
        selected: []
    }

    componentDidMount() {
        this.getGPA();
    }

    getGPA = () => {
        axios.get(`api/registrations/gpa/${this.props.regno}`)
            .then((gpa) => { this.setState({ gpa: gpa.data.hasOwnProperty('gpa') ? gpa.data.gpa.toFixed(2) : '' }) })
    }


    updateGrade = (gradeid, id) => {
        axios({
            method: 'patch',
            url: '/api/registrations/update',
            data: {
                id: id,
                gradeid: gradeid
            }
        }).then((res) => {
            if (res.status === 200) {
                console.log("grade updated successfully");
                console.log(res);
            }
        })
    }

    render() {

        let array = [];

        let matchGradeId = (r, g) => {
            return r === g ? ` selected` : ``
        }


        let RegistrationData = this.props.registrations.map((course, i) => (
            <tr key={i}>
                <td>{course.course.code}</td>
                <td>{course.course.title}</td>
                <td>{course.course.crhr}</td>
                <td>
                    {/* <input
                        style={{ textAlign: 'center' }}
                        type='text'
                        value={course.hasOwnProperty('grade') ? course.grade.grade : ''}
                        className="form-control inputFeild"
                        size='1'
                        aria-describedby="basic-addon3"
                    /> */}
                    <select
                        value={array[i]} className=" form-control-sm "
                        onChange={(e) => {
                            array[i] = e.target.value;
                            let id = this.props.regno;
                            console.log(course._id + " : " + array[i]);
                            this.updateGrade(array[i], course._id);
                            this.props.refreshRegistration();
                            this.getGPA();
                        }}>
                        <option key="nothing" hidden value=''></option>
                        {this.props.grades.map((grade) => (
                            <option
                                key={grade.gradeid}
                                value={grade.gradeid}
                                selected={matchGradeId(course.hasOwnProperty('grade') ? course.grade.grade : '', grade.grade)}>
                                {grade.grade}
                            </option>
                        ))}
                    </select>
                </td>
                <td>
                    {course.hasOwnProperty('grade') ? course.grade.gpa : ''}
                </td>
            </tr>
        ))

        return (
            <div>
                <div style={{ marginLeft: '15px' }}>
                    <h4 className="text-info" style={{ textAlign: 'left' }}>Registrations</h4>
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Title</th>
                                <th>Cr. Hr.</th>
                                <th>Grade</th>
                                <th>GPA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RegistrationData}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>GPA : </td>
                                <td>{this.state.gpa}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
}

export default DisplayRegistrations
