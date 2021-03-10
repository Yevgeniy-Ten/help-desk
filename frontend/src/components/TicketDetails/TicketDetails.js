import React, {useState} from "react";

const TicketDetails = ({ticket}) => {
    const [loading, setLoading] = useState(false);
    const [tiketEditPut, setTiketEditPut] = useState(false);

    const [state, setState] = useState({
        status: "Открыт",
        serviceType: "Обслуживание",
        priority: "Normal",
        department: "Отдел обслуживания",
        coWorker: "Борщев А. М.",
        laborCosts: "3 часа",
        serviceTitle: "Устранить тех. неполадки с доменом",
        description: "У клиента не работает домен. Проверить сервер.",
    });


    return (
        <div>
            "kek"
        </div>
    );
};

export default TicketDetails;