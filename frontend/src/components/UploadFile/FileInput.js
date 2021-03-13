import React, { useRef, useState } from 'react';
import './FileInput.css';
import { 
    Button,
    Input,
    Row,
    Col
    } from "antd";
import { InboxOutlined, DeleteFilled } from '@ant-design/icons';

const FileInput = ({name, onChange, inputType}) => {
    const inputRef = useRef();
    const [filesList, setFilesList] = useState([]);
    const [fileName, setFileName] = useState();

    const onFileChange = e => {
        const filesListCopy = [...filesList];
        if(inputType) {
            console.log(e.target.files[0]);
            if(e.target.files.length > 0) {
                setFileName(e.target.files[0].name);
                onChange(e.target.files[0]);
            }
        }
        else {
            if(e.target.files.length > 0) {
                filesListCopy.push(e.target.files[0]);
                setFilesList(filesListCopy);
                onChange(filesListCopy);
            }
        }
    };

    const removeFile = (index) => {
        const filesListCopy = [...filesList];
        filesListCopy.splice(index, 1);
        setFilesList(filesListCopy);
        onChange(filesListCopy);
    };

    const activateInput = () => {
        inputRef.current.click();
    };

    return (
        <>
            <input
                type="file"
                name={name}
                style={{display: "none"}}
                onChange={onFileChange}
                ref={inputRef}
            />
            <>
                <Row gutter={{ xs: 5, lg: 8 }}>
                    
                    {inputType ? (
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Input 
                            id={name}
                            value={fileName}
                            disabled={true}
                            onClick={activateInput}
                            style={{marginBottom: "10px"}}
                            />
                        </Col>
                    ) : null}
                    
                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <Button 
                        id="selectFile"
                        icon={<InboxOutlined />}
                        onClick={activateInput}
                        >
                            Нажмите для загрузки
                        </Button>
                    </Col>
                    <Col span={24}>
                        {!inputType ? filesList.map((file, index) => {
                            return (
                                <div 
                                key={index} 
                                className="files"
                                >
                                    <span>
                                        {file && file.name ? file.name : null}
                                    </span>
                                    <span onClick={() => removeFile(index)}>
                                        <DeleteFilled style={{ color: "#ff4d4f", cursor: "pointer" }}/>
                                    </span>
                                </div>
                            )
                        }) : null}
                    </Col>
                </Row>
            </>
        </>
    );
};

export default FileInput;