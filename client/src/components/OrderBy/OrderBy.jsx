import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { orderByForce, orderByName } from '../../actions/index';
import './OrderBy.css';

export const OrderBy = ({ orderByForce, orderByName }) => {

    const dispatch = useDispatch();
    const allPokes = useSelector(state => state.allPokemons);

    const [orderName, setOrderName] = useState("ascendent");
    const [orderForce, setOrderForce] = useState("ascendent");

    const getByName = async (e) => {

        e.preventDefault();

        await orderByName(orderName);

        if (orderName === "ascendent") {
            setOrderName("descendent")
        }
        if (orderName === "descendent") {
            setOrderName("ascendent")
        }
    }

    const getByForce = async (e) => {
        e.preventDefault();
        await orderByForce(orderForce);
        if (orderForce === "ascendent") {
            setOrderForce("descendent")
        }
        if (orderForce === "descendent") {
            setOrderForce("ascendent")
        }
    }

    return (
        <div className='order-container'>
            <button onClick={(e) => getByName(e)}>Order By Name</button>
            <button onClick={(e) => getByForce(e)}>Order By Force</button>
        </div>
    )
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         orderByForce: (order) => dispatch(orderByForce(order)),
//         orderByName: (order) => dispatch(orderByName(order))
//     }
// }

// export default connect(null, mapDispatchToProps)(OrderBy);