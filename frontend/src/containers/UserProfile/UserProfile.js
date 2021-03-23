import React from "react";
import {useSelector} from "react-redux";
import {getUser} from "../Auth/redux/getters/getters";
import {Avatar} from "antd"
import styles from "./UserProfile.module.css"

const UserProfile = () => {
    const user = useSelector(getUser)
    return (
        <div className={styles.card}>
            <div className={styles.card__info}>
                <h2>{user.firstName} {user.lastName}</h2>
                <p>Сотрудник компании: Beeline</p>
                <p>{user.isAuthorized ? "Потвержден администратором" : "Выполняется проверка вашего профиля"}</p>
                <p>Сотрудник отдела: Бухгалетрия</p>
            </div>
            <div>
                <Avatar size={128}
                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLDrc9cpQKd5VWf1UfsbwUW4rm1j2LrAOsUg&usqp=CAU"}/>
            </div>
        </div>
    );
};

export default UserProfile;
