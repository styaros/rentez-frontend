import React, { useEffect, useState } from "react";
import { deleteSportground, getAllSportground, getAllSportgroundTypes } from "../Api/SportgroundApi";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button, Pagination, TextField, Select, MenuItem, Link } from "@mui/material";
import EditFormSportground from "../Components/EditFormSportground";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import AddFormSportground from "../Components/AddFormSportground";
import ViewBoxes from "../Components/ViewBoxes";
import { useTranslation } from "react-i18next";

const Sportground = () => {
    const { t } = useTranslation();
    const [sportgrounds, setSportgrounds] = useState([]);
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); // New state for search
    const [selectedType, setSelectedType] = useState(""); // New state for selected type
    const sportgroundsPerPage = 3; // Adjust this as needed
    const [types, setType] = useState([]);
    dayjs.extend(utc);

    const fetchData = async () => {
        try {
            const result = await getAllSportground();
            const filteredSportgrounds = result.filter(sportground => sportground.company.id === parseInt(id));
            setSportgrounds(filteredSportgrounds);
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

    const removecSportground = async (id) => {
        await deleteSportground(id);
        await fetchData();
    };

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
                <AddFormSportground fetchData={fetchData} id={id} />
            </div>
            {currentSportgrounds.map((sportground) => (
                <Card key={sportground.id} variant="outlined" style={{ margin: "16px", cursor: 'pointer' }}>
                    <CardContent>
                        <ViewBoxes  id={sportground.id}/>
                        <Typography variant="h6">{t("sportground.address")}: {sportground.address || "N/A"}</Typography>
                        <Typography>{t("box.description")}: {sportground.description || "N/A"}</Typography>
                        <Typography>{t("sportground.startTime")}: {dayjs.utc(sportground.work_start_time).local().format('YYYY-MM-DD h:mm A')}</Typography>
                        <Typography>{t("sportground.endTime")}: {dayjs.utc(sportground.work_end_time).local().format('YYYY-MM-DD h:mm A')}</Typography>
                        <Typography>{t("sportground.type")}: {sportground.sportground_type.type}</Typography>
                        <div style={{ marginTop: "16px" }}>
                            <EditFormSportground fetchData={fetchData} sportground={sportground} />
                            <Button
                                style={{ marginLeft: 5 }}
                                variant="outlined"
                                color="error"
                                onClick={() => removecSportground(sportground.id)}
                            >
                                <span role="img" aria-label="Delete">🗑️</span>
                            </Button>
                        </div>
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

export default Sportground;
