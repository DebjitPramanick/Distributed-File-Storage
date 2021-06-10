import React, { useContext } from 'react'
import BlockchainContext from '../../utils/BlockchainContext'

const FilesStat = () => {

    const { files, fileCount } = useContext(BlockchainContext)

    return (
        <div className="stat-container">
            <h2 className="titile">Your Stat</h2>

            <div className="stat-box">
                {fileCount !== null && (
                    <>
                        <p>Number of uploaded files: <span>{fileCount}</span></p>
                        <p>Total size of uploaded files: <span>{fileCount}</span></p>
                        <p>Last date you uploaded: <span>{fileCount}</span></p>
                        <br />
                    </>
                )}
            </div>
        </div>
    )
}

export default FilesStat
