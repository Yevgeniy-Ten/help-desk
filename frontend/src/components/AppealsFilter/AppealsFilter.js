import React, {useEffect} from "react";
import {
    Input,
    Form,
    Button,
    Checkbox,
    Select
} from "antd";
import DateFilter from "../UI/DateFilter/DateFilter";

const {Option} = Select;

const AppealsFilter = ({filterSubmitHandler}) => {
    const [form] = Form.useForm();

    return (
        <Form form={form}
              name="form-filter"
              layout={"vertical"}
              onFinish={filterSubmitHandler}
        >
            <h3>Фильтр</h3>
            <hr/>
            <Form.Item
                name={"id"}
                label="Поиск по идентификатору">
                <Input placeholder={"Выбранные идентефикаторы"}/>
            </Form.Item>
            <Form.Item
                name={"status"}
                label="По статусу"
            >
                <Select
                    placeholder="Выберите статус обращения"
                    name={"status"}>
                    <Option value={"isOpened"}>Открытые</Option>
                    <Option value={"isStarted"}>Выполняется</Option>
                    <Option value={"isFinished"}>Выполнено</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label={"По дате"}
                name={"date"}>
                <DateFilter/>
            </Form.Item>
            <Form.Item name={"myAppeals"} valuePropName="checked">
                <Checkbox >Мои обращения</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={"large"}>
                    Потвердить
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AppealsFilter;