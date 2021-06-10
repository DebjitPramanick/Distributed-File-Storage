import React, { useState, useRef } from 'react'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const ListItem = (props) => {

    const { file, setModal, setcurFile, accounts, contract } = props

    const ctrlBtn = useRef()
    const [menu, setMenu] = useState(false)

    const getDate = (timestamp) => {
        let date = new Date(Number(timestamp * 1000))
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    }

    let dummydate = new Date().getTime()
    console.log(Math.ceil(dummydate/1000))

    const copyURL = (hash) => {
        let url = `https://ipfs.infura.io/ipfs/${hash}`
        navigator.clipboard.writeText(url).then(function () {
            console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    window.addEventListener('click', (e) => {
        let x = ctrlBtn.current
        if (x !== e.target) {
            setMenu(false)
        }
    })

    const delFile = async() => {
        await contract.methods.deleteFile(file.fileId)
            .send({ from: accounts[0] })
            .on('error', e => { alert("error") })
        window.location.reload()
        setMenu(!menu)
    }



    return (
        <tr>
            <td>{file.fileName}</td>
            <td><p className="file-type">{file.fileType}</p></td>
            <td>{getDate(file.uploadTime)}</td>
            <td onClick={() => copyURL(file.fileHash)}>
                <FileCopyIcon className="svg-icon copy" />
            </td>
            <td>
                <div className="more-menu">
                    <MoreHorizIcon className="svg-icon more" ref={ctrlBtn} onClick={() => setMenu(!menu)} />
                    {menu && (
                        <div className="small-menu">
                            <ul>
                                <li onClick={() => { setModal(true); setcurFile(file); setMenu(!menu) }}>Details</li>
                                <li>Download</li>
                                <li onClick={delFile}>Delete</li>
                            </ul>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    )
}

export default ListItem
