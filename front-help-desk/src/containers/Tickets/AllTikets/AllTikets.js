import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchTikets } from '../redux/action/tiketsAction';
import { getTiketsState } from '../redux/getters/getters';
import FilterTiketForm from '../../../components/UI/FilterTiketForm/FilterTiketForm';

const AllTikets = () => {
    const dispatch = useDispatch();

    const { tiketsList } = useSelector(getTiketsState, shallowEqual);

    useEffect(() => {
        dispatch(fetchTikets())
    });
    return (
        <>
            <FilterTiketForm tiketsList={tiketsList} />
        </>
    );
};

export default AllTikets;