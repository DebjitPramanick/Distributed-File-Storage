import React from 'react'
import "../../styles/components.css"
import CloseIcon from '@material-ui/icons/Close';

const FileModal = (props) => {

    console.log(props)
    const {file, setModal} = props
    
    const getDate = (timestamp) => {
        let date = new Date(Number(timestamp * 1000))
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    }

    const copyURL = (hash) => {
        let url = `https://ipfs.infura.io/ipfs/${hash}`
        navigator.clipboard.writeText(url).then(function () {
            alert('Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    return (
        <div className="modal-bg">
            <div className="file-modal">
                <CloseIcon className="svg-icon" onClick={() => setModal(false)}/>
                <h3>Your file Details</h3>
                <br/>
                <div className="file-details">File Name: <span>{file.fileName}</span></div>
                <br/>
                <div className="file-details">File Description: <span>{file.fileDesc}</span></div>
                <br/>
                <div className="file-details">Upload Date: <span>{getDate(file.uploadTime)}</span></div>
                <br/>
                <div className="file-details">File Type: <span>{file.fileType}</span></div>
                <br/>
                <div className="file-details">File Size: <span>{formatBytes(file.fileSize)}</span></div>
                <br/>
                <div className="file-details">File Hash: <span>{file.fileHash}</span></div>
                <br/>
                <div className="file-details">Wallet Address: <span>{file.uploader}</span></div>
                <br/>
                <div className="file-details">File URL: <span>https://ipfs.infura.io/ipfs/{file.fileHash}</span></div>
                <br/>
                <button onClick={() => copyURL(file.fileHash)}>Copy URL</button>
            </div>
        </div>
    )
}

export default FileModal
