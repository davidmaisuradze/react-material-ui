import React, { useState } from 'react';
import { Modal, Upload } from 'antd';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const acceptedExtensions = ['image/png', 'image/jpeg', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const UploadField = (props) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = async ({fileList}) => {
        // setFiles(fileList);
        props.addFiles(props.name, fileList);
        if (fileList.length > 0) {
            fileList.forEach(async (file) => {
                if (file.size > 2 * 1024 * 1024) {
                    props.addError('Exceeds file size!');
                    props.addFiles(props.name, []);
                } else if (!acceptedExtensions.includes(file.type)) {
                    props.addFiles(props.name, []);
                    props.addError('Invalid file extension!')
                } else {
                    const preview = await getBase64(file.originFileObj);
                    file.preview = preview;
                    props.addFiles(props.name, fileList);
                }
            });
        }
    }

    const handleCustomRequest = ({onSuccess}) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    }

    return (
        <>
            <Upload
                name={props.name}
                listType="picture-card"
                fileList={props.files}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={handleCustomRequest}
            >
                {props.files.length < 4 ? (
                    <div>
                        <div>Upload</div>
                    </div>
                ) : null}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img width="50" alt="example" style={{width: 50}} src={previewImage}/>
            </Modal>
        </>
    );
};

export default UploadField;
