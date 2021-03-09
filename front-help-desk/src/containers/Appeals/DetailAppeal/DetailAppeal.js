import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getAppeals } from '../redux/action/appealsAction';
import { getAppealsState } from '../redux/getters/getters';
import DetailAppealForm from '../../../components/UI/DetailAppealForm/DetailAppealForm';

const DetailAppeal = (props) => {
    const dispatch = useDispatch();

    const { appealsList } = useSelector(getAppealsState, shallowEqual);

    useEffect(() => {
        const id = props.match.params.id;
        dispatch(getAppeals(id));
    })
    return (
        <>
            <DetailAppealForm appealsList={appealsList} />
        </>
    );
};

export default DetailAppeal;