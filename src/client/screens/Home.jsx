/* eslint-disable */
import { Button, Col, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { PhotoDetails, PhotoForm } from '../components';
import { axius, func } from '../utils';

const Home = (props) => {

    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [photoForm, setPhotoForm] = useState(false);
    const [photoDetails, setPhotoDetails] = useState({});

    useEffect(() => {
        getTags();
        getPhotos();
    }, []);

    const getTags = () => {
        setLoading(true);
        axius.get('tag/many').then(res => {
            setLoading(false);
            if (res.success === true) {
                setTags(res.tags);
            }
        });
    }

    const getPhotos = (tags = []) => {
        setLoading(true);
        axius.get('photo/many', { tags: tags }).then(res => {
            setLoading(false);
            if (res.success === true) {
                setPhotos(res.photos);
            }
        });
    }

    return (
        <React.Fragment>
            <div>
                <Row>
                    <Col span={4}>
                        <img src={require('../assets/logo.svg')} />
                    </Col>
                    <Col span={4} />
                    <Col span={8}>
                        <Select showSearch mode="multiple" placeholder="Search by tags" style={{ width: '100%' }} onChange={e => getPhotos(e)}>
                            <Select.Option value={[]}>All tags</Select.Option>
                            {tags.map(tag => (
                                <Select.Option key={tag._id} value={tag.name}>{tag.name}</Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={4} />
                    <Col span={4} style={{ textAlign: 'right' }}>
                        {photos.length > 0 && (
                            <Button type="primary" size="middle" onClick={() => setPhotoForm(true)}>Add photo</Button>
                        )}
                    </Col>
                </Row>
            </div>
            <p>&nbsp;</p>


            <p>&nbsp;</p>
            {photos.length > 0 && (
                <Row gutter={30}>
                    {photos.map(img => (
                        <Col key={img._id} span={8}>
                            <div style={{ padding: 5, border: '1px solid #efefef', borderRadius: 4, marginBottom: 20 }}>
                                <div className="img-bg" onClick={() => setPhotoDetails(img)} style={{ backgroundImage: `url(${func.api.baseUrl}photo/content/${img._id})`, }} />
                                {/* <div style={{ marginTop: 5, overflow: 'hidden' }}><b>Name</b>: {img.name}</div> */}
                                <div style={{ marginTop: 8 }}>{img.tagIDs.map(tag => (<span key={tag} className="tag">{tag}</span>))}</div>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}


            {!loading && photos.length === 0 && (
                <div className="center">
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <img src={require('../assets/photos.png')} alt="No photos" height={200} />
                    <div>&nbsp;</div>
                    <h3>You have not added any photos yet</h3>
                    <div>&nbsp;</div>
                    <Button type="primary" size="large" onClick={() => setPhotoForm(true)}>Add photo</Button>
                </div>
            )}

            <PhotoForm
                visible={photoForm}
                onCancel={() => setPhotoForm(false)}
                onSuccess={() => {
                    getTags();
                    getPhotos();
                }}
            />

            <PhotoDetails
                img={photoDetails}
                visible={photoDetails._id ? true : false}
                onCancel={() => setPhotoDetails({})}
                onSuccess={() => {
                    getTags();
                    getPhotos();
                }}
            />
        </React.Fragment>
    );
}

export default Home;