import React, { useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router-dom";
import {
  PlusOutlined,
  UploadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
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
  Modal,
  notification,
  Divider 
} from "antd";

import { postRestaurant } from "../../Services/axios";

import "antd/dist/reset.css";
import "./add-restaurant.css";

export const AddRestaurant = () => {

  const [imageHeader, setImageHeader] = useState()
  const [imglogo, setImglogo] = useState()
  const [tags, setTags] = useState([]);
  
  /**tags */
  // const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
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
    setInputValue("");
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue("");
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

  /**check box */
  const CheckboxGroup = Checkbox.Group;
  const plainOptions = ['birth', 'theme2', 'theme3'];
  //const defaultCheckedList = ['Apple', 'Orange'];

  const [checkedList, setCheckedList] = useState();
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
    //console.log(checkedList)
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  /**form */
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const city = {cityName: values.city}
    const data = {
      "name" : values.name,
      "address" : values.address,
      "city" : city,
      "description" : values.description + " phone : " + values.number,
      "tags" : tags.map(x=>{
        return {"value":x}
      }),
      "logoImg" : imglogo,
      "backgroundImg" : imageHeader
    }

    postRestaurant(data)
      .then((response) => {
        console.log(response);
        navigate('/menu-managment');
      })
      .catch(function (error) {
        notification.open({
          message: 'Unsuccessful!',
          description: error.response.data,
          type:'error',
          style: {borderRadius: '5px', backgroundColor: '#fbc403'}
        });
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

    console.log(data);
  };


/******render */

  return (
    <div className="add-restaurant">
      <Form
        className="form-add-restaurant"
        layout="vertical"
        size="large"
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <div className="top-info">
          <h1>Create Restaurant</h1>
        </div>

        <div className="info-add-res">
          <div className="left-info">
            <Form.Item
              name="logo"
              label="LOGO IMAGE"
              rules={[
                {
                  required: true,
                  message: "restaurant logo!",
                },
              ]}
              >
                <input style={{color: 'white', width:'80%'}} type='file' id="logoUpload" accept=".png, .jpg, .jpeg" onChange={logobase64} />
            </Form.Item>

            <Form.Item
              name="name"
              label="RESTAURANT NAME"
              rules={[
                {
                  required: true,
                  message: "restaurant name!",
                },
              ]}
            >
              <Input placeholder="restaurant" />
            </Form.Item>

            <Form.Item
              name="tags"
              label="TAGS"
              rules={[
                {
                  required: false,
                  message: "restaurant tags!",
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
                  return isLongTag ? (
                    <Tooltip title={tag} key={tag}>
                      {tagElem}
                    </Tooltip>
                  ) : (
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
              name="theme"
              label="THEME"
              rules={[
                {
                  required: false,
                  message: "restaurant header!",
                },
              ]}
              >
                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                  Check all
                </Checkbox>
                <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
            </Form.Item>
            
            <Form.Item
              name="header"
              label="HEADER IMAGE"
              rules={[
                {
                  required: true,
                  message: "restaurant header!",
                },
              ]}
              >
                <input style={{color: 'white', width:'80%'}} type='file' id="headerUpload" accept=".png, .jpg, .jpeg" onChange={headerbase64} />
            </Form.Item>
          </div>

          <div className="right-info">
            <Form.Item
              name="city"
              label="CITY"
              rules={[
                {
                  required: true,
                  message: "city!",
                },
              ]}
            >
              <Input
                maxLength={10}
                placeholder="city"
                style={{ width: "50%" }}
              />
            </Form.Item>

            <Form.Item
              name="address"
              label="ADDRESS"
              rules={[
                {
                  required: true,
                  message: "restaurant address!",
                },
              ]}
            >
              <Input placeholder="address" />
            </Form.Item>
{/*
              <div className='name-code'>
            <Form.Item
              name="phone_code"
              label="code"
              rules={[
                {
                  required: true,
                  message: 'code!',
                },
              ]}
              >
                <Input
                  type="number"
                  placeholder="021"
                  minLength={3}
                  maxLength={3}
                  style={{ width: "50%", marginRight: "2px" }}
                  defaultValue=""
                />
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
                <Input
                  type="number"
                  placeholder="12345678"
                  minLength={8}
                  maxLength={8}
                  style={{}}
                  defaultValue=""
                />
              </Form.Item>
            </div>
*/}
            <Form.Item
              name="number"
              label="PHONE NUMBER"
              rules={[
                {
                  required: true,
                  message: "phone number!",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="12345678"
                minLength={8}
                maxLength={8}
                style={{width: '80%'}}
                defaultValue=""
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="DESCRIPTION"
              rules={[
                {
                  required: false,
                  message: "description!",
                },
              ]}
            >
              <Input.TextArea
                className="txt-area"
                placeholder="Offers, High speed, ..."
                showCount
                maxLength={100}
                style={{
                  height: 120,
                  resize: "none",
                }}
              />
            </Form.Item>
          </div>
        </div>

        <div className="end-info">
          <Form.Item
            style={{ margin: "0" }}
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
          >
            <Checkbox>
              I have read the <a className="agreement" href="">agreement</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <button className="button-add" htmlType="submit">
              Submit
            </button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
