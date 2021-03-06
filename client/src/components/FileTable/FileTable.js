import React, { useContext, useState } from 'react'
import BlockchainContext from "../../utils/BlockchainContext"
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ListItem from './ListItem';

const FileTable = (props) => {

    const { files, accounts, contract } = useContext(BlockchainContext)
    const { setModal, setcurFile } = props

    const pages = Math.ceil(files.length / 18)
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(18)
    const [curPage, setCurPage] = useState(1)
    const [query, setQuery] = useState('')

    const allFiles = files.filter(f => {
        return f.fileName.toLowerCase().includes(query.toLowerCase());
    })


    const handleRight = () => {
        if (curPage < pages) {
            setLeft(left + 18)
            setRight(right + 18)
            setCurPage(curPage + 1)
        }
    }

    const handleLeft = () => {
        if (curPage > 1) {
            setLeft(left - 18)
            setRight(right - 18)
            setCurPage(curPage - 1)
        }
    }

    return (
        <div className="file-table-container">
            <h2 className="title">Your Files</h2>

            <div className="files-container">

                <div className="search-box">
                    <input type="search" placeholder="Search files..." value={query} onChange={(e)=>setQuery(e.target.value)}/>
                </div>
                <table className="table">
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>URL</th>
                        <th>Actions</th>
                    </tr>

                    {allFiles.slice(left, right).map(f => (
                        <ListItem 
                        file={f} 
                        setModal={setModal} 
                        setcurFile={setcurFile} 
                        accounts = {accounts}
                        contract = {contract}/>
                    ))}
                </table>

                {files.length === 0 && <p className="message">No File Uploaded</p>}

                {files.length > 0 && (
                    <div className="page-slider">
                        <ArrowLeftIcon onClick={handleLeft} className="svg-icon" />
                        <p>Page {curPage}/{pages}</p>
                        <ArrowRightIcon onClick={handleRight} className="svg-icon" />
                    </div>
                )}

            </div>

        </div>
    )
}

export default FileTable
