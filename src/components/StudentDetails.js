import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

class StudentDetails extends Component {
    render() {
        return (
            <div>
                <div className="card" style={{ textAlign: 'left' }}>
                    <h3 className="card-header">Student Details</h3>
                    <div className="card-body" >
                        <span className="hdr text-info">Student Name : </span>
                        <span className="card-text" id="studentname">{this.props.studentname}</span><br />
                        <span className="hdr text-info">Father Name : </span>
                        <span className="card-text" id="fathername">{this.props.fathername}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentDetails
