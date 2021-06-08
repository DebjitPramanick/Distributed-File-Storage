import React, {useState} from 'react'
import Upload from '../components/UploadFile/Upload'
import "../styles/components.css"
import Logo from "../assets/logo.png"
import FileTable from '../components/FileTable/FileTable'
import Chart from '../components/Chart/Chart'
import FileModal from '../components/Modal/FileModal'

const Home = () => {

    const [modal, setModal] = useState(false)
    const [curFile, setcurFile] = useState({})


    return (
        <div>
            <div className="header">
                <div className="brand">
                    <img src={Logo} alt=""/>
                </div>
            </div>

            <div className="container">
                <Upload />
                <FileTable setcurFile={setcurFile} setModal={setModal} />
            </div>

            <Chart/>

            {modal && <FileModal file={curFile} setModal={setModal}/>}
        </div>
    )
}

export default Home
