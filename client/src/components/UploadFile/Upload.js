import React, {useRef, useState} from 'react'
import "../../styles/components.css"

const Upload = () => {

    const selectFile = useRef(null)

    const [file, setFile] = useState({})
    

    const displayChange = (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
    }

    console.log(file)

    return (
        <div className="upload-container">
            <h2 className="titile">Upload File</h2>
            <div className="upload-box">

                <div className="partition">
                    <label className="label label-name">Enter file name:</label>
                    <input className="input-name"></input>
                </div>

                <div className="partition">
                    <label className="label label-desc">Enter file description:</label>
                    <textarea className="input-desc"></textarea>
                </div>

                <div className="partition">
                    <label className="label label-file">Select file:</label>
                    <input className="file-input" type="file" ref={selectFile} onChange={(e) => displayChange(e)}></input>
                    <button className="select-file" onClick={() => selectFile.current.click()}>Select File</button>
                </div>

                <button className="upload-btn">Upload</button>
                
                
            </div>
        </div>
    )
}

export default Upload
