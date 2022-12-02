import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined, UploadOutlined, LoadingOutlined  } from '@ant-design/icons';
import {
  AutoComplete,
  Tag,
  Tooltip,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  InputNumber,
  Row,
  Select,
  Upload,
} from 'antd';

import 'antd/dist/reset.css';
import './add-restaurant.css';

const { Option } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export const AddRestaurant = () => {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div className='upload-img'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };







  return (
    <div className='add-restaurant'>
      <Form className='form'
        layout='vertical'
        size='large'
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        >
        <div className='top-info'>
          <h1>create restaurant</h1>
        </div>

        <div className='info'>
          <div className='left-info'>
            <Form.Item
              name="logo"
              label="restaurant logo"
              rules={[
                {
                  required: false,
                  message: 'Please input your restaurant name!',
                },
              ]}
              >
              <Upload 
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action=""
                beforeUpload={beforeUpload}
                onChange={handleChange}
                >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: '100%',
                    }}
                  />
                  ) : 
                  (
                    uploadButton
                  )}
              </Upload>
            </Form.Item>

            <div className='name-code'>
              <Form.Item className='name'
                name="name"
                label="restaurant name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your restaurant name!',
                  },
                ]}
              >
                <Input placeholder='restaurant' />
              </Form.Item>

              <Form.Item
                name="code"
                label="restaurant code"
                rules={[
                  {
                    required: true,
                    message: 'Please input your restaurant code!',
                  },
                ]}
                >
                  <Input placeholder='number' />
                </Form.Item>
            </div>

            <Form.Item
              name="tags"
              label="restaurant tags"
              rules={[
                {
                  required: true,
                  message: 'Please input your restaurant tags!',
                },
              ]}
              >
              <>
                {tags.map((tag, index) => {
                  if (editInputIndex === index) {
                    return (
                      <Input
                        ref={editInputRef}
                        key={tag}
                        size="small"
                        className="tag-input"
                        value={editInputValue}
                        onChange={handleEditInputChange}
                        onBlur={handleEditInputConfirm}
                        onPressEnter={handleEditInputConfirm}
                        />
                    );
                  }
                  const isLongTag = tag.length > 12;
                  const tagElem = (
                    <Tag
                      className="edit-tag"
                      key={tag}
                      closable={index !== 0}
                      onClose={() => handleClose(tag)}
                      >
                      <span
                        onDoubleClick={(e) => {
                          if (index !== 0) {
                            setEditInputIndex(index);
                            setEditInputValue(tag);
                            e.preventDefault();
                          }
                        }}
                        >
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </span>
                    </Tag>
                  );
                  return isLongTag ? 
                    (
                      <Tooltip title={tag} key={tag}>
                        {tagElem}
                      </Tooltip>
                    ) : 
                    (
                      tagElem
                    );
                })}
                {inputVisible && (
                  <Input
                    ref={inputRef}
                    type="text"
                    size="large"
                    className="tag-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                    />
                  )}
                  {!inputVisible && (
                    <Tag className="site-tag-plus" onClick={showInput}>
                      <PlusOutlined /> New Tag
                    </Tag>
                  )}
              </>
            </Form.Item>

            <Form.Item
              name="header"
              label="restaurant header"
              rules={[
                {
                  required: false,
                  message: 'Please input your restaurant header!',
                },
              ]}
              >
              <Upload
                action=""
                listType="picture"
                className="upload-list-inline"
              >
                <Button className='btn-upload' icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </div>

          <div className='right-info'>
            <Form.Item
              name="city"
              label="City"
              rules={[
                {
                  required: true,
                  message: 'Please input your restaurant code!',
                },
              ]}
              >
              <Input maxLength={10} placeholder='city' style={{ width: '50%' }} />
            </Form.Item>

            <Form.Item
              name="address"
              label="restauran address"
              rules={[
                {
                  required: true,
                  message: 'Please input your restaurant address!',
                },
              ]}
              >
                <Input placeholder='address' />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
              >
                <Input.Group compact>
                  <Input placeholder='' maxLength={3} style={{ width: '20%' }} defaultValue="021" />
                  <Input placeholder='12345678' maxLength={8} style={{ width: '55%' }} defaultValue="" />
                </Input.Group>
            </Form.Item>

            <Form.Item
              name="description"
              label="description"
              rules={[
                {
                  required: false,
                  message: 'Please input description',
                },
              ]}
            >
              <Input.TextArea className='txt-area' 
                placeholder='Offers, High speed, ...'
                showCount 
                maxLength={100}
                style={{
                  height: 120,
                  resize: 'none',
                }} 
                />
            </Form.Item>
          </div>
        </div>

        <div className='end-info'>
          <Form.Item
            style={{margin:'0'}}
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            >
              <Checkbox >
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <button className='button-add' htmlType="submit">
                Submit
              </button>
            </Form.Item>
        </div>
      
      </Form>
      
    </div>
  );
};