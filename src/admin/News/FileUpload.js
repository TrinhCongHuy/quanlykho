import React from 'react';

const FileUpload = () => {
  return (
    <div className="custom-file">
      <input
        type="file"
        id="file"
        className="custom-file-input"
        accept="image/*"
      />
      <label className="custom-file-label" htmlFor="file">
      </label>
    </div>
  );
};

export default FileUpload