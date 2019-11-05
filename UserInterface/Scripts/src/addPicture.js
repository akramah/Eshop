import React from 'react';
import ReactDOM from 'react-dom';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone, { getFilesFromEvent } from 'react-dropzone-uploader';
import Select from 'react-select';

const MyUploader = () => {
    // specify upload params and url for your files
    

    // called every time a file's `status` changes
    const handleChangeStatus = (fileWithMeta, status) => { console.log(status, fileWithMeta.meta, fileWithMeta.file);
    this.props.getFile(fileWithMeta) }
    const getUploadParams = ({ meta }) => { return { url: 'http://localhost:50918/Vendor/RAddProductImage' + } }
    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

    return (
        <Dropzone
        maxFiles={1}
        multiple={false}
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        submitButtonDisabled={true}
        accept="image/*,audio/*,video/*"
    />
    )
}