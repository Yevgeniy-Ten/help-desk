import React, {useEffect} from "react";
import {Button, Form, Input, Select} from "antd";
// import FileInput from "../../../components/UploadFile/FileInput";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {fetchTopics} from "../redux/action/topicsActions";
import {getTopicsState} from "../redux/getters/getters";
import "./AddAppealForm.css";

const {Option} = Select;

const AddAppealForm = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {topics} = useSelector(getTopicsState, shallowEqual);
    useEffect(() => {
        dispatch(fetchTopics());
    }, [dispatch]);

    const onFilesChange = (filesList) => {
        form.setFieldsValue({upload: filesList});
    };
    const onCreateAppeal = (appeal) => {
        console.log(appeal)
    }
    return (
        <Form form={form}
              name="add-appeal"
              className={"appeal-form"}
              layout={"vertical"}
              onFinish={onCreateAppeal}>
            <Form.Item
                name={"topicId"}
                label="Тематика обращения"
                rules={[{required: true}]}>
                <Select placeholder="Выберите тематику обращения" allowClear>
                    {topics.map((topic, index) => {
                        return (
                            <>
                                <Option key={index} value={topic.id}>
                                    {topic.name}
                                </Option>
                            </>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                name={"title"}
                label="Заголовок обращения"
                rules={[
                    {
                        required: true,
                        message: "Заголовок обязателен!"
                    }]}>
                <Input placeholder={"Опишите вкратце обращение"}/>
            </Form.Item>
            <Form.Item
                name={"description"}
                label="Полное описание"
            >
                <Input.TextArea
                    placeholder={"Подробно опишите проблему"}
                    allowClear={true}
                />
            </Form.Item>
            {/*<Form.Item name={"upload"} >*/}
            {/*    <FileInput*/}
            {/*        name="files"*/}
            {/*        onChange={onFilesChange}*/}
            {/*        inputType={false}*/}
            {/*    />*/}
            {/*</Form.Item>*/}
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"middle"}>
                    Создать обращение
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddAppealForm;
