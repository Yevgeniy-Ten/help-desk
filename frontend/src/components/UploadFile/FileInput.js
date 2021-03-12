import React, { useRef, useState } from 'react';
import { 
    Button,
    Input
    } from "antd";
import { InboxOutlined, DeleteFilled } from '@ant-design/icons';

const FileInput = ({name, onChange, error}) => {
    const inputRef = useRef();
    const [filesList, setFilesList] = useState([]);

    const onFileChange = e => {
        const filesListCopy = [...filesList];
        if(e.target.files.length > 0) {
            filesListCopy.push(e.target.files[0]);
        }
        setFilesList(filesListCopy);
        onChange(filesListCopy);
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
                {/* <Input 
                id={name}
                value={filename}
                disabled={true}
                onClick={activateInput}
                /> */}
                <Button 
                id="selectFile"
                icon={<InboxOutlined />}
                onClick={activateInput}
                >
                    Нажмите для загрузки
                </Button>
                {filesList.map((file, index) => {
                    return (
                        <div 
                        key={index} 
                        style={{
                            border: "1px solid #ff4d4f", 
                            borderRadius: "3px",
                            padding: "15px", 
                            margin: "5px 0", 
                            maxWidth: "400px", 
                            display: "flex",
                            justifyContent: "space-between",
                            color: "#ff4d4f",
                            background: "#fff"
                            }}>
                            <span>
                                {file && file.name ? file.name : null}
                            </span>
                            <span onClick={() => removeFile(index)}>
                                <DeleteFilled style={{ color: "#ff4d4f", cursor: "pointer" }}/>
                            </span>
                        </div>
                    )
                })}
            </>
        </>
    );
};

export default FileInput;