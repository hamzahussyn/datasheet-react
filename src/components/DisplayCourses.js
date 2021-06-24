import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

export class DisplayCourses extends Component {
    state = {
        courses: [],
        selectedcourses: []
    }

    componentDidMount() {
        this.getCourses();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.getCourses();
        }
    }

    handleChange = (e) => {
        const { value, type } = e.target;
        if (type === 'checkbox') {
            const { selectedcourses } = this.state;
            let index = selectedcourses.indexOf(value);
            index === -1 ? selectedcourses.push(value) : selectedcourses.splice(index, 1);
            this.setState({ selectedcourses })
        }

    }

    handleClick = () => {
        const { selectedcourses } = this.state;
        let coursesToRegister = selectedcourses.filter(item => !this.props.allRegisteredCourses.includes(Number(item)));
        axios({
            method: 'post',
            url: '/api/registrations/add',
            data: {
                courseids: JSON.stringify(coursesToRegister),
                regno: this.props.regno
            }
        }).then((res) => {
            if (res.status === 200) { console.log("Courses Posted Successfully") }
            this.props.refreshRegistration();
        })
    }

    getCourses = () => {
        let courses = [];
        axios.get(`/api/courses/${this.props.semester}`)
            .then((course) => {
                courses = course.data;
                this.setState({ courses })
                console.log(this.state.courses)
            })
    }


    render() {

        let getCourseList = () => {
            let list = [];
            this.state.courses.forEach((course) => {
                list.push(course.courseid);
            })
            return list;
        }

        let list = getCourseList();
        let genList = list
        console.log(genList);

        let offeredCourses = this.state.courses.map((course, i) => (
            <tr key={course._id}>
                <td><input
                    hidden={this.props.allRegisteredCourses.includes(Number(course.courseid))}
                    name='selectedcourses'
                    className="form-check-input"
                    type="checkbox" value={genList[i]}
                    id="flexCheckDefault"
                    onChange={this.handleChange}
                    defaultChecked={this.state.selectedcourses.includes(course.code)}></input>
                </td>
                <td> {course.code} </td>
                <td> {course.title} </td>
                <td> {course.crhr} </td>
            </tr>
        ))

        return (
            <div>
                <h4 className="text-info" style={{ textAlign: 'left' }}>Courses</h4>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>
                                {/* <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={this.state.selectedcourses}
                                    name="selectall"
                                    id="flexCheckDefault"
                                    onChange={() => { this.setState({ selectedcourses: this.state.selectedcourses.length === 0 ? [...genList] : [] }) }} >
                                </input> */}
                            </th>
                            <th>Code</th>
                            <th>Title</th>
                            <th>Cr. Hrs.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offeredCourses}
                    </tbody>
                </table>

                <button type="button" style={{ marginRight: '500px' }} className="btn btn-outline-primary" onClick={this.handleClick}>Register Courses</button>
                <pre>{JSON.stringify(this.state.selectedcourses, null, 2)}</pre>
            </div>
        )
    }
}

export default DisplayCourses
