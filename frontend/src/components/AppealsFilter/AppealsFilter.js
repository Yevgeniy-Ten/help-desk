import React from "react";
import {
    Input,
    Form,
    Button,
} from "antd";
import DateFilter from "../UI/DateFilter/DateFilter";
import AdminAppealsFilter from "./AdminAppealsFilter";


const AppealsFilter = ({filterSubmitHandler, filterChangeHandler, isAdmin}) => {
    const [form] = Form.useForm();

    return (
        <Form form={form}
              name="form-filter"
              onFieldsChange={filterChangeHandler}
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
                label={"По дате"}
                name={"date"}>
                <DateFilter/>
            </Form.Item>
            {isAdmin && <AdminAppealsFilter/>}

            <Form.Item>
                <Button type="primary" htmlType="submit" size={"large"}>
                    Потвердить
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AppealsFilter;