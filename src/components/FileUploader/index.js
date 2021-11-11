import { useState } from 'react';
import { FileType } from '../../enum/FileType';
import './fileUploader.css';
import { Alert } from '@material-ui/core';
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

  let header;
  switch (fileTypeEnum) {
    case FileType.DOCUMENTS:
      header = 'Upload a document (.pdf only)';
      break;
    case FileType.PICTURES:
      header = 'Upload an image (.jpeg or .png only)';
      break;
    default:
      header = 'Upload a file';
      break;
  }
  const onInputChange = (e) => {
    let file = e.target.files[0];
    var fileType = file.type;
    //console.log(fileType);
    if (checkFileType(fileType, fileTypeEnum)) {
      setFile(file);
      //console.log('input changed to file');
    } else {
      alert('The file is not of the correct type. It will not be changed.');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(file);
    setFileOutput(file);
    closerFunction();
  };
  return (
    <form action="#" id="#" onSubmit={onSubmit}>
      <div class="form-group files color">
        <label>{header}</label>
        <input
          type="file"
          class="form-control"
          multiple="false"
          onChange={onInputChange}
          accept={fileTypeEnum}
        />
      </div>
      <button id="submit">Submit</button>
    </form>
  );
}

/**
 * @param {File} file
 * @returns Boolean whether or not the file is less than 2MB
 */
function validateSize(file, maxFileSize) {
  let fileSize = Math.round(file.size / 1024 / 1024);

  if (fileSize >= maxFileSize) {
    alert('File too big, please select a file less than 2MB');
    return false;
  } else {
    return true;
  }
}

function checkFileType(fileType, fileTypeEnum) {
  switch (fileTypeEnum) {
    case FileType.ALL:
      return true;
    case FileType.DOCUMENTS:
      return fileType.includes('pdf');
    case FileType.PICTURES:
      return (fileType.includes('jpeg') || fileType.includes('png'));
  }
}
