/* eslint-disable */
import { Button, message, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import * as $ from 'jquery';
import { axius, func } from '../utils';

const PhotoForm = (props) => {
    const { visible } = props;

    const [tags, setTags] = useState([]);
    const [file, setFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [photo, setPhoto] = useState(require('../assets/default.jpg'));

    const readImage = (e) => {
        let self = this;
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (r) => {
            setPhoto(reader.result);
            setFile(file);
        }
        reader.readAsDataURL(file);
    }

    const submit = () => {
        if (file) {
            setSubmitting(true);
            axius.postFile('photo', { profile: file, name: file.name, tagIDs: tags }).then(res => {
                if (res.success === true) {
                    addTags().then(() => {
                        setSubmitting(false);
                        setTags([]);
                        setFile(null);
                        setPhoto(require('../assets/default.jpg'));
                        message.success('Photo uploaded with success');
                        props.onSuccess();
                    });
                } else {
                    setSubmitting(false);
                    message.error('Unable to save photo');
                }
            });
        } else {
            message.error('You must choose a photo');
        }
    }

    const addTags = () => {
        return new Promise((resolve) => {
            tags.map((name, n) => {
                axius.post('tag', { name }).then(res => {
                    if (n === tags.length - 1) {
                        resolve(true);
                    }
                });
            });
        });
    }

    return (
        <React.Fragment>
            <Modal
                title="Add photo" centered width={500} visible={visible} onCancel={() => props.onCancel()}
                footer={[
                    <Button onClick={() => props.onCancel()}>Close</Button>,
                    <Button type="primary" loading={submitting} onClick={submit}>Save</Button>,
                ]}
            >
                <div className="center">
                    <img src={photo} alt="Choose photo" className="pointer img" onClick={() => $('#image').click()} />
                    <div><small className="muted">*Click image to choose an image</small></div>
                    <input type="file" id="image" accept="image/*" style={{ display: 'none' }} onChange={readImage} />
                </div>

                <p>&nbsp;</p>
                <b>Tabs</b>
                <Select
                    mode="tags" size="large" tokenSeparators={[',', ' ']}
                    style={{ width: '100%' }} dropdownStyle={{ display: 'none' }}
                    value={tags} onChange={e => setTags(e)}
                />
                <div><small className="muted">Separate each tag with a comma (,)</small></div>
            </Modal>
        </React.Fragment>
    );
}

export default PhotoForm;