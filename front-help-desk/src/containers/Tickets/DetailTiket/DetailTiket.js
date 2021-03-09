import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getTikets } from '../redux/action/tiketsAction';
import { getTiketsState } from '../redux/getters/getters';
import TiketEditPut from '../../../components/UI/TiketEditPut/TiketEditPut';

const DetailTiket = (props) => {
    const dispatch = useDispatch();

    const { tiketsList } = useSelector(getTiketsState, shallowEqual);

    useEffect(() => {
        const id = props.match.params.id;
        dispatch(getTikets(id));
    });

    return (
        <>
            <TiketEditPut tiketsList={tiketsList} />
        </>
    );
};

export default DetailTiket;