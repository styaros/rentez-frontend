import React, { useEffect, useState } from "react";
import { getAllSportground, getAllSportgroundTypes } from "../Api/SportgroundApi";
import { Card, CardContent, Typography, Pagination, TextField, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import ViewBoxes from "../Components/ViewBoxes";
import { useTranslation } from "react-i18next";

const Sportgrounds = () => {
    const { t } = useTranslation();
    const [sportgrounds, setSportgrounds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); // New state for search
    const [selectedType, setSelectedType] = useState(""); // New state for selected type
    const sportgroundsPerPage = 3; // Adjust this as needed
    const [types, setType] = useState([]);
    dayjs.extend(utc);

    const fetchData = async () => {
        try {
            const result = await getAllSportground();
       setSportgrounds(result);
        } catch (error) {
            console.error("Error fetching sportgrounds:", error);
        }
    };

    const fetchType = async () => {
        try {
            const result = await getAllSportgroundTypes();
            setType(result);
            console.log(types)
        } catch (error) {
            console.error("Error fetching types:", error);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    useEffect(() => {
        fetchData();
        fetchType();
    }, []);

    const indexOfLastSportground = currentPage * sportgroundsPerPage;
    const indexOfFirstSportground = indexOfLastSportground - sportgroundsPerPage;

    // Apply filtering based on the search term and selected type across all fields
    const filteredSportgrounds = sportgrounds.filter(sportground =>
        (selectedType === "" || sportground.sportground_type.id === selectedType) &&
        Object.values(sportground).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const currentSportgrounds = filteredSportgrounds.slice(indexOfFirstSportground, indexOfLastSportground);

    return (
        <>
            <TextField
                sx={{
                    width: '20%',
                    margin: "16px"
                }}
                label={t("search")}
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <TextField
                select
                sx={{
                    width: '20%',
                    margin: "16px"
                }}
                label={t("sportground.type")}
                variant="outlined"
                value={selectedType}
                onChange={handleTypeChange}
            >
                <MenuItem value="">{t("sportground.allTypes")}</MenuItem>
                {types.map((type) => (
                    <MenuItem key={type.id} value={type.id}>{type.type}</MenuItem>
                ))}
            </TextField>

            <div style={{ margin: "16px" }}>

                <Typography style={{ marginBottom: "16px" }} variant="h6">{t("sportground.sportgroundTitle")}</Typography>
          </div>
            {currentSportgrounds.map((sportground) => (
                <Card key={sportground.id} variant="outlined" style={{ margin: "16px", cursor: 'pointer' }}>
                    <CardContent>
                        <ViewBoxes  id={sportground.id}/>
                        <Typography variant="h6">{t("sportground.address")}: {sportground.address || "N/A"}</Typography>
                        <Typography>{t("box.decription")}: {sportground.description || "N/A"}</Typography>
                        <Typography>{t("sportground.startTime")}: {dayjs.utc(sportground.work_start_time).local().format('YYYY-MM-DD h:mm A')}</Typography>
                        <Typography>{t("sportground.endTime")}: {dayjs.utc(sportground.work_end_time).local().format('YYYY-MM-DD h:mm A')}</Typography>
                        <Typography>{t("sportground.type")}: {sportground.sportground_type.type}</Typography>
                    </CardContent>
                </Card>
            ))}

            <Pagination
                style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}
                count={Math.ceil(filteredSportgrounds.length / sportgroundsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
            />
        </>
    );
};

export default Sportgrounds;
