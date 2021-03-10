import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Input } from 'antd';
import { getTiketsState } from '../redux/getters/getters';

const AddTicketForm = () => {
    const dispatch = useDispatch();
    const { TextArea } = Input;
    const [loading, setLoading] = useState(false);



    return (
        <>

        </>
    );
};

export default AddTicketForm;