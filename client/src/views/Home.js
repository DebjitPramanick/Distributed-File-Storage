import React from 'react'
import Upload from '../components/UploadFile/Upload'
import "../styles/components.css"
import Logo from "../assets/logo.png"
import FileTable from '../components/FileTable/FileTable'
import Chart from '../components/Chart/Chart'

const Home = () => {
    return (
        <div>
            <div className="header">
                <div className="brand">
                    <img src={Logo} alt=""/>
                </div>
            </div>

            <div className="container">
                <Upload />
                <FileTable />
            </div>

            <Chart/>
        </div>
    )
}

export default Home
