import React from "react";
import { Alert, Button, List, Typography } from "antd";
import { useDispatch } from "react-redux";
import { clearAllErrors } from "./redux/action/errorsAction";

const ErrorHandler = ({ errors }) => {
  const dispatch = useDispatch();

  const errorsList = (
    <List
      size="small"
      bordered
      dataSource={Object.values(errors).filter((value) => value !== null)}
      renderItem={(item, index) => (
        <List.Item>
          <Typography.Text mark>{`${index + 1} : `}</Typography.Text>
          {item.message}
        </List.Item>
      )}
    />
  );
  return (
    <Alert
      message="Ошибка"
      description={errorsList}
      showIcon
      type="error"
      style={{position:"absolute",left:"30%",zIndex:100}}
      action={
        <Button danger onClick={() => dispatch(clearAllErrors())}>
          Закрыть
        </Button>
      }
    />
  );
};

export default ErrorHandler;
