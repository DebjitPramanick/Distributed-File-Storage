import React, { useContext } from 'react'
import BlockchainContext from '../../utils/BlockchainContext'

const FilesStat = () => {

    const { files, fileCount, accounts } = useContext(BlockchainContext)

    let size = 0

    let lastDate = files.length !== 0 ? files[0].uploadTime : null


    const getDate = (timestamp) => {
        let date = new Date(Number(timestamp * 1000))
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    }

    files.forEach(f => {
        size += Number(f.fileSize)
    })

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    return (
        <div className="stat-container">
            <h2 className="title">Your Stat</h2>

            <div className="stat-box">
                {fileCount !== null && (
                    <>
                        <p>Number of uploaded files: <span>{fileCount}</span></p>
                        <p>Total size of uploaded files: <span>{formatBytes(size)}</span></p>
                        <p>Last date you uploaded: <span>{lastDate!==null ? getDate(lastDate) : 'Null'}</span></p>
                        <p>Wallet address: <span>{accounts[0]}</span></p>
                    </>
                )}
            </div>
        </div>
    )
}

export default FilesStat
