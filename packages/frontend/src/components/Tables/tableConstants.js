export const getMergedColumns = (columns, isEditing) => {
  return columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          inputType: "text", // этот тип редактируем номер или текст
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record) // это нужно ant чтобы определять какой из ячеек сделать редактируемой, тип чтобы появился input!!!
        };
      }
    };
  });
};
