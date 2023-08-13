import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography} from "@mui/material";
import { getCompany } from "../Api/CompanyApi";
import EditFormCompany from "../Components/EditFromCompany";
import { useNavigate } from "react-router-dom";
import { SPORTGROUNDS } from "../Helpers/Link";
import { useTranslation } from "react-i18next";

const Companies = () => {
    const [companies, setCompanies] = useState({});
    const { t } = useTranslation();
    const navigation = useNavigate();
    const fetchData = async () => {
        try {
            const result = await getCompany(localStorage.getItem('id'));
            setCompanies(result.company);
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Card key={companies.id} variant="outlined"
                style={{ margin: "16px", cursor: 'pointer' }}>
                <CardContent
                    onClick={() => navigation(SPORTGROUNDS + companies.id)}
                >
                    <Typography
                        variant="h6">{companies.name || "N/A"}</Typography>
                    <Typography>{t("company.email")}: {companies.email || "N/A"}</Typography>
                    <Typography>{t("company.phone")}: {companies.phone || "N/A"}</Typography>
                    <Typography>{t("box.description")}: {companies.description || "N/A"}</Typography>
                </CardContent>
                <CardContent >
                    <EditFormCompany fetchData={fetchData} company={companies} />
                </CardContent>
            </Card>
        </>
    );
};

export default Companies;
