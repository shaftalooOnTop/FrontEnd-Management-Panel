import React, { useEffect, useRef, useState } from "react";
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
} from "antd";

import { postRestaurant } from "../../Services/axios";

import "antd/dist/reset.css";
import "./add-restaurant.css";

const { Option } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export const AddRestaurant = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [imglogo, setImglogo] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = getBase64(file.originFileObj);
    }
    setPreviewImage(file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = (x) => {
    console.log(x);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
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

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const data = {
      name: values.name,
      address: values.address,
      description:
        values.description +
        " phone : " +
        values.phone_code +
        values.phone_number,
      tags: tags.map((x) => {
        return { value: x };
      }),
      logoImg: "",
      backgroundImg: "",
    };

    postRestaurant(data)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
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

  return (
    <div className="add-restaurant">
      <Form
        className="form"
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

        <div className="info">
          <div className="left-info">
            <Form.Item
              name="logo"
              label="restaurant logo"
              rules={[
                {
                  required: false,
                  message: "Please input your restaurant name!",
                },
              ]}
            >
              <>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {fileList.length > 0 ? null : uploadButton}
                </Upload>
                <Modal
                  open={previewOpen}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{
                      width: "100%",
                    }}
                    src={previewImage}
                  />
                </Modal>
              </>
            </Form.Item>

            <Form.Item
              className="name"
              name="name"
              label="restaurant name"
              rules={[
                {
                  required: true,
                  message: "Please input your restaurant name!",
                },
              ]}
            >
              <Input placeholder="restaurant" />
            </Form.Item>

            <Form.Item
              name="tags"
              label="restaurant tags"
              rules={[
                {
                  required: false,
                  message: "Please input your restaurant tags!",
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
              name="header"
              label="restaurant header"
              rules={[
                {
                  required: false,
                  message: "Please input your restaurant header!",
                },
              ]}
            >
              <Upload
                action=""
                listType="picture"
                className="upload-list-inline"
              >
                <Button className="btn-upload" icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>
          </div>

          <div className="right-info">
            <Form.Item
              name="city"
              label="City"
              rules={[
                {
                  required: true,
                  message: "Please input your restaurant code!",
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
              label="restauran address"
              rules={[
                {
                  required: true,
                  message: "Please input your restaurant address!",
                },
              ]}
            >
              <Input placeholder="address" />
            </Form.Item>

            <div className="name-code">
              <Form.Item
                name="phone_code"
                label="Phone code"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone code!",
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
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
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

            <Form.Item
              name="description"
              label="description"
              rules={[
                {
                  required: false,
                  message: "Please input description",
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
              I have read the <a href="">agreement</a>
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
