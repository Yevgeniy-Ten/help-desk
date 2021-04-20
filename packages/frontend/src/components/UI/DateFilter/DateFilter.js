import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

const DateFilter = ({ onChange }) => {
  return (
    <Space direction="vertical" size={12}>
      <RangePicker onChange={onChange} />
    </Space>
  );
};

export default DateFilter;
