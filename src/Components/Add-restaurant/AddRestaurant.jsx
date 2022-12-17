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
  Modal
} from 'antd';

import { postRestaurant } from '../../Services/axios';

import 'antd/dist/reset.css';
import './add-restaurant.css';

export const AddRestaurant = () => {

  const [imageHeader, setImageHeader] = useState()
  const [imglogo, setImglogo] = useState()
  const [tags, setTags] = useState([]);
  
  /**tags */
  // const [tags, setTags] = useState([]);
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


  const logobase64 = (e) => {
    let filereader = new FileReader()
    filereader.readAsDataURL(e.target.files[0])
    filereader.onload = () => {
      console.log(filereader.result)
      setImglogo(filereader.result)
    }
  }

  const headerbase64 = (e) => {
    let filereader = new FileReader()
    filereader.readAsDataURL(e.target.files[0])
    filereader.onload = () => {
      console.log(filereader.result)
      setImageHeader(filereader.result)
    }
  }

  /**form */
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    const data = {
      "name" : values.name,
      "address" : values.address,
      "description" : values.description + " phone : " + values.phone_code + values.phone_number,
      "tags" : JSON.stringify(tags),
      "logoImg" : imglogo,
      "backgroundImg" : imageHeader
    }

    postRestaurant(data)
      .then((response) => {
        console.log(response)
      }
    )
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
         console.log(error.request);
        
      } else {
         console.log('Error', error.message);
      }
      console.log(error.config);
    })

    console.log(data)
  };


/******render */

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
          <h1>Create Restaurant</h1>
        </div>

        <div className='info'>
          <div className='left-info'>
            <Form.Item
              name="logo"
              label="RESTAURANT LOGO"
              rules={[
                {
                  required: false,
                  message: 'Please input your restaurant name!',
                },
              ]}
              >
                <input type='file' id="logoUpload" accept=".png, .jpg, .jpeg" onChange={logobase64} />
            </Form.Item>

            <Form.Item className='name'
              name="name"
              label="RESTAURANT NAME"
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
              name="tags"
              label="TAGS"
              rules={[
                {
                  required: false,
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
                      closable={true}
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
                          {isLongTag ? `${tag.slice(0, 10)}...` : tag}
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
                    size="small"
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
              label="RESTAURANT HEADER"
              rules={[
                {
                  required: false,
                  message: 'Please input your restaurant header!',
                },
              ]}
              >
                <input type='file' id="headerUpload" accept=".png, .jpg, .jpeg" onChange={headerbase64} />
            </Form.Item>
          </div>

          <div className='right-info'>
            <Form.Item
              name="city"
              label="CITY"
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
              label="ADDRESS"
              rules={[
                {
                  required: true,
                  message: 'Please input your restaurant address!',
                },
              ]}
              >
                <Input placeholder='address' />
            </Form.Item>

              <div className='name-code'>
            <Form.Item
              name="phone_code"
              label="code"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone code!',
                },
              ]}
              >
                <Input type='number' placeholder='021' minLength={3} maxLength={3} style={{ width: '50%', marginRight: "2px" }} defaultValue=''/>
            </Form.Item>

            <Form.Item
              name="phone_number"
              label="PHONE"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
              >
                  <Input type='number' placeholder='12345678' minLength={8} maxLength={8} style={{ }} defaultValue="" />
            </Form.Item>
              </div>
              
            <Form.Item
              name="description"
              label="DESCRIPTION"
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