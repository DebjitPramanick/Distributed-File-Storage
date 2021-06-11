import React, { useRef, useState, useContext } from 'react'
import "../../styles/components.css"
import { create } from 'ipfs-http-client'
import BlockchainContext from '../../utils/BlockchainContext'

const Upload = () => {

    const { accounts, contract } = useContext(BlockchainContext)

    const ipfs = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https"
    })

    const selectFile = useRef(null)

    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('')
    const [fileDesc, setFileDesc] = useState('')

    const captureFile = (e) => {
        let cap = e.target.files[0]
        const reader = new window.FileReader()

        reader.readAsArrayBuffer(cap)
        reader.onload = () => {
            let data = {
                buffer: Buffer(reader.result),
                type: cap.type,
                name: cap.name
            }
            setFile(data)
        }
    }

    const upload = async (e) => {

        if (fileName !== '' && fileDesc !== '' && file !== null) {
            e.preventDefault();
            const response = await ipfs.add(file.buffer).then(res => res)
            await contract.methods.uploadFile(
                response.path, response.size,
                file.type, fileName, fileDesc)
                .send({ from: accounts[0] })
                .on('error', e => { alert("error") })
            window.location.reload()
        }
        else {
            alert("Fill all the fields.")
        }
    }

    return (
        <div className="upload-container">
            <h2 className="title">Upload File</h2>
            <div className="upload-box">

                <div className="partition">
                    <label className="label label-name">Enter file name:</label>
                    <input className="input-name" value={fileName} onChange={(e) => setFileName(e.target.value)}></input>
                </div>

                <div className="partition">
                    <label className="label label-desc">Enter file description:</label>
                    <textarea className="input-desc" value={fileDesc} onChange={(e) => setFileDesc(e.target.value)}></textarea>
                </div>

                <div className="partition">
                    <label className="label label-file">Select file:</label>
                    <input className="file-input" type="file" ref={selectFile} onChange={(e) => captureFile(e)}></input>
                    <button className="select-file" onClick={() => selectFile.current.click()}>
                        {file === null ? 'Select File' : 'Choose Again'}
                    </button>
                </div>

                <button className="upload-btn" onClick={upload}>
                    Upload
                </button>
            </div>
        </div>
    )
}

export default Upload
