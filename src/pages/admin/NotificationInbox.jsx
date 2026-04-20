import { useEffect, useState } from "react";
import { socket } from "../../config/socket"; 
import NotificationBox from "../../components/notificationSystem/NotificationBox";
import { useTranslation } from "react-i18next";

export default function NotificationInbox() {
    const {t} = useTranslation()
    return (
        <div>
            <NotificationBox />
        </div>
    );
}