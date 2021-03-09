import React, {useRef} from "react";

const UploadFile = ({onFileChange, name}) => {
    const inputRef = useRef();
    const activateInput = () => {
        inputRef.current.click();
    }

    return (
        <input
            type="file"
            name={name}
            style={{display: "none"}}
            onChange={onFileChange}
            ref={inputRef}
        />
    );
};

export default UploadFile;
