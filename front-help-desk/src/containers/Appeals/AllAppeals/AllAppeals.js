import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchAppeals } from '../redux/action/appealsAction';
import { getAppealsState } from '../redux/getters/getters';
import FilterAppealForm from '../../../components/UI/FilterAppealForm/FilterAppealForm';

const AllAppeals = () => {
    const dispatch = useDispatch();

    const { appealsList } = useSelector(getAppealsState, shallowEqual);

    useEffect(() => {
        dispatch(fetchAppeals());
    })
    return (
        <>
            <FilterAppealForm appealsList={appealsList} />
        </>
    );
};

export default AllAppeals;