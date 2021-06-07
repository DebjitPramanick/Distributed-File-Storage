import React, { useContext, useState } from 'react'
import BlockchainContext from "../../utils/BlockchainContext"
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

const FileTable = () => {

    const { files } = useContext(BlockchainContext)
    console.log(files)

    const pages = Math.ceil(files.length / 6)
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(6)
    const [curPage, setCurPage] = useState(1)

    const handleRight = () => {
        if (curPage < pages) {
            setLeft(left + 6)
            setRight(right + 6)
            setCurPage(curPage + 1)
        }
    }

    const handleLeft = () => {
        if (curPage > 1) {
            setLeft(left - 6)
            setRight(right - 6)
            setCurPage(curPage - 1)
        }
    }

    const getDate = (timestamp) => {
        let date = new Date(Number(timestamp * 1000))
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    }

    const copyURL = (hash) => {
        let url = `https://ipfs.infura.io/ipfs/${hash}`
        navigator.clipboard.writeText(url).then(function () {
            console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    return (
        <div className="file-table-container">
            <h2 className="titile">Your Files</h2>

            <div className="files-container">

                <div className="search-box">
                    <input type="search" placeholder="Search files..." />
                </div>
                <table className="table">
                    <tr>
                        <th>File Name</th>
                        <th>File Type</th>
                        <th>Upload Date</th>
                        <th>Copy URL</th>
                        <th>More</th>
                    </tr>

                    {files.slice(left, right).map(f => (
                        <tr>
                            <td>{f.fileName}</td>
                            <td>{f.fileType}</td>
                            <td>{getDate(f.uploadTime)}</td>
                            <td onClick={() => copyURL(f.fileHash)}>
                                <FileCopyIcon className="svg-icon copy" />
                            </td>
                            <td><MoreHorizIcon className="svg-icon more" /> </td>
                        </tr>
                    ))}
                </table>

                <div className="page-slider">
                    <ArrowLeftIcon onClick={handleLeft} className="svg-icon" />
                    <p>Page {curPage}/{pages}</p>
                    <ArrowRightIcon onClick={handleRight} className="svg-icon" />
                </div>
            </div>

        </div>
    )
}

export default FileTable
