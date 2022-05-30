import { Upload, Modal, Button, message } from 'antd';
import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadProps } from 'antd/es/upload';
import axios from 'axios';

const ImagesUpload = () => {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    }

    const handleCancel = () => setPreviewVisible(false);

    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Choose</div>
        </div>
    );

    const handlePreview = (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = file.url || file.thumbUrl;
        }
    
        setPreviewImage(file.url || (file.preview as string));
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const saveImages = () => {
        if (fileList.length === 0) {
            return  message.error('Please choose the images');
        }
        const formData: FormData = new FormData();

        for(let i = 0; i < fileList.length; i++) {
            formData.append('imageCollection', fileList[i].originFileObj as File);
        }

        const userId = JSON.stringify(JSON.parse(localStorage.getItem('userId')!));
        formData.append('userId', userId);

        axios.post("http://127.0.0.1:3007/api/user/upload-images", formData, {}).then(res => {
            if (res.data.status === 0) {
                message.success('Upload success!');
            }
            setFileList([]);
        })
    }

    return (
        <div>
            <Upload
                action=""
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                multiple={true}
                accept="image/png, image/jpeg"
                fileList={fileList}
                onChange={handleChange}
                onPreview={handlePreview}
                >
                    {fileList.length >= 8 ? null : uploadButton}
            </Upload>

            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>

            <Button type="primary" onClick={saveImages}>Save Images</Button>
        </div>
    )
}

export default ImagesUpload;