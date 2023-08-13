import React, { useEffect, useState } from "react";
import { Card, CardContent, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getByIdEmployee } from "../Api/UserApi";
import { MY_RESERVATIONS, SPORTGROUNDS } from "../Helpers/Link";
import EditFormUser from "../Components/EditFormUser";
import { useTranslation } from "react-i18next";

const User = () => {
    const [user, setUser] = useState({});
    const { t } = useTranslation();
    const navigation = useNavigate();
    const fetchData = async () => {
        try {
            const result = await getByIdEmployee(localStorage.getItem('id'));
            setUser(result);
            console.log(result)
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Card key={user.id} variant="outlined"
                style={{ margin: "16px", cursor: 'pointer' }}>
                <CardContent
                >
                    <Typography
                        variant="h6">{user.name || "N/A"} {user.surname || "N/A"}</Typography>
                    <Typography>{t("company.email")}: {user.email || "N/A"}</Typography>
                    <Typography>{t("company.phone")}: {user.phone || "N/A"}</Typography>
                </CardContent>
                <CardContent >
                    <div className="d-block">
                    <Link
                        onClick={() => navigation(SPORTGROUNDS)}
                        style={{ textDecorationLine: 'underline', cursor: 'pointer', color: 'blue' }}
                    >{t("user.linkSportground")} </Link>
                
                    </div>
                    <div className="d-block">
                    <Link
                        onClick={() => navigation(MY_RESERVATIONS)}
                        style={{ textDecorationLine: 'underline', cursor: 'pointer', color: 'blue' }}
                    >{t("user.linkReservation")}</Link>
                    </div>
                    <div className="d-block">
                    <EditFormUser fetchData={fetchData} user={user} />  
                    </div>    
                </CardContent>
            </Card>
        </>
    );
};

export default User;
