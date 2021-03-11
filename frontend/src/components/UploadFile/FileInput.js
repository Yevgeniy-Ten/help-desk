import React, { useRef, useState } from 'react';
import { 
    Button,
    Input
    } from "antd";
import { InboxOutlined, DeleteTwoTone } from '@ant-design/icons';

const FileInput = ({name, onChange, error}) => {
    const inputRef = useRef();
    const [filesList, setFilesList] = useState([]);

    const onFileChange = e => {
        const filesListCopy = [...filesList];
        filesListCopy.push(e.target.files[0]);
        setFilesList(filesListCopy);
        // if(e.target.files[0]) {
        //     setFilename(e.target.files[0].name)
        // } else{
        //     setFilename('')
        // }
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
                        <div key={index} style={{"border": "1px solid #ff4d4f"}}>
                            <span>
                                {file.name}
                            </span>
                            <span style={{marginLeft: "5px"}}>
                                <DeleteTwoTone color="red"/>
                            </span>
                        </div>
                    )
                })}
            </>
        </>
    );
};

export default FileInput;