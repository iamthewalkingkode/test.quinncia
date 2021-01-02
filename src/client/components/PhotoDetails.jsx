/* eslint-disable */
import { Button, Col, message, Row, Comment, Form, Avatar, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { axius, func } from '../utils';
import moment from 'moment';

const PhotoDetails = (props) => {
    const { img, visible } = props;

    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const [commentIDs, setCommentIDs] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (img._id) {
            getComments(img.commentIDs);
        }
    }, [img]);

    const getComments = (IDs) => {
        let camments = [];
        IDs.length > 0 && setCommentIDs(IDs);
        IDs.map((id, i) => {
            axius.get(`comment/${id}`, {}).then(res => {
                camments = camments.concat(res.comment);
                if (i === IDs.length - 1) {
                    setComments(camments);
                }
            });
        })
    }

    const createComment = () => {
        if (content) {
            setSubmitting(true);
            axius.post('comment', { content, photoID: img._id, }).then(res => {
                if (res.success === true) {
                    axius.put(`photo/${img._id}`, { commentIDs: commentIDs.concat(res.comment._id), }).then(res => {
                        setSubmitting(false);
                        if (res.success === true) {
                            setContent('');
                            getComments(res.photo[0].commentIDs);
                            message.success('Comment added');
                        } else {
                            message.error('Unable to create comment');
                        }
                    });
                } else {
                    message.error('Unable to create comment');
                }
            });
        } else {
            message.error('You must write a comment');
        }
    }

    return (
        <React.Fragment>
            <Modal
                title={null} centered width={1200} visible={visible} onCancel={() => { setCommentIDs([]); setComments([]); props.onCancel(); }}
                footer={null}
            >
                {visible && (
                    <Row gutter={30}>
                        <Col span={14}>
                            <img
                                src={`${func.api.baseUrl}photo/content/${img._id}`} alt={img.name}
                                fallback={require('../assets/default.jpg')} className="img"
                            />
                            <div style={{ marginTop: 5 }}><b>Name</b>: {img.name}</div>
                            <div style={{ marginTop: 5 }}><b>Added at</b>: {moment(img.created_at).format('LLL')}</div>
                            <div style={{ marginTop: 5 }}><b>Tags</b>: {img.tagIDs.map(tag => (<span className="tag">{tag}</span>))}</div>
                        </Col>
                        <Col span={10}>
                            <b>Comments</b>
                            {comments.length === 0 && (
                                <div>No comments to show. Be first to comment!</div>)
                            }

                            <div style={{ maxHeight: '40vh', height: '40vh', overflow: 'scroll' }}>
                                {comments.map(row => (
                                    <Comment
                                        key={row._id}
                                        actions={null}
                                        author={null}
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
                                        content={row.content}
                                        datetime={<span>{moment(row.created_at).fromNow()}</span>}
                                    />
                                ))}
                            </div>

                            <div>&nbsp;</div>
                            <div style={{ borderBottom: '1px solid #eee' }} />
                            <div>&nbsp;</div>

                            <Comment
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
                                content={
                                    <div>
                                        <Form.Item>
                                            <Input.TextArea rows={3} value={content} disabled={submitting} onChange={(e) => setContent(e.target.value)} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button htmlType="submit" type="primary" loading={submitting} onClick={createComment}>
                                                Add Comment
                                            </Button>
                                        </Form.Item>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                )}
            </Modal>
        </React.Fragment>
    );
}

export default PhotoDetails;