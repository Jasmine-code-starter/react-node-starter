import { Image, Row, Col, Card } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const Album = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const userId: string = JSON.stringify(JSON.parse(localStorage.getItem('userId')!));
        axios.get(`http://127.0.0.1:3007/api/user/${userId}/upload-images`)
            .then(result => result.data)
            .then(res => setImages(res.albums))
    }, []);


    return (
        <div>
            <Row gutter={16}>
                {images.map(image => (
                    <Col span={6} >
                        <Card bordered={false}>
                        <Image src={image} width={200}>Card content</Image>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Album;