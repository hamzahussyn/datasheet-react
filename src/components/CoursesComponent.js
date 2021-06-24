import React, { Component } from 'react'
import axios from 'axios'

class Courses extends Component {

    state = {
        courses: []
    }

    getCourses = () => {
        axios.get(`/api/courses/${this.props.semester}`)
            .then((course) => console.log(course))
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Courses
