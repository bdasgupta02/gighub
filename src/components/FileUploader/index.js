import {useState} from 'react';
import { FileType } from '../../enum/FileType';
import './fileUploader.css';
//import { Modal } from '@material-ui/core';

/**
 * 
 * @param {React.Dispatch<any>} setFileOutput
 * @param {FileType} fileTypeEnum
 * @returns 
 */
// export const FileUploader = ({}, fileOutput) => {
//     const [file, setFile] = useState(null);

//     const onInputChange = (e) => {
//         setFile(e.target.files[0]);
//     };
//     const onSubmit = (e) => {
//         e.preventDefault();
//         fileOutput(file)

//     }
//     return (
//         <form method="post" action="#" id="#" onSubmit={onSubmit}>
//               <div class="form-group files color">
//                 <label>Upload Your File (max size 2MB)</label>
//                 <input type="file" class="form-control" multiple="false" onChange={onInputChange}/>
//               </div>
//               <button>Submit</button>
//           </form>
//     )
// };
export default function FileUploader(props) {
    let setFileOutput = props.setFileOutput;
    let fileTypeEnum = props.fileTypeEnum;
    let closerFunction = props.closer;
    const [file, setFile] = useState(null);

    const onInputChange = (e) => {
        setFile(e.target.files[0]);
        console.log("input changed to file")
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(file);
        setFileOutput(file);
        closerFunction();
    }
    return(
    <form action="#" id="#" onSubmit={onSubmit}>
        <div class="form-group files color">
            <label>Upload Your File</label>
            <input type="file" class="form-control" multiple="false" onChange={onInputChange} accept={fileTypeEnum}/>
        </div>
        <button id="submit">Submit</button>

    </form>);
}

/**
 * @param {File} file 
 * @returns Boolean whether or not the file is less than 2MB
 */
function validateSize(file, maxFileSize) {
    let fileSize = Math.round(file.size/1024/1024);

    if (fileSize >= maxFileSize) {
        alert("File too big, please select a file less than 2MB");
        return false;
    } else {
        return true;
    }
}
