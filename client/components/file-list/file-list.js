import React from 'react';

import './file-list.css';

function FileList(props) {

  return (
    <div className="file-list">
      <h1 className="file-list__title">There you go!</h1>
      <ul className="file-list__list">
        { props.uploadedFileUrls.map(url => (
            <li key={url}>
              { url }
            </li>
          ))
        }
      </ul>
      <button onClick={props.onResetClick}>
        Reset and upload more
      </button>
    </div>
  );

}

export default FileList;
