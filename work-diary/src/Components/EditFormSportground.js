import { useState } from "react";
import React from 'react';
import {
    Button,
    Modal,
    TextField,
    Box,
    Paper,
    Autocomplete,
    Grid,
} from '@mui/material';
import { getAllSportgroundTypes, updateSportground } from "../Api/SportgroundApi";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import utc from 'dayjs/plugin/utc';
import { useTranslation } from "react-i18next";

const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const paperStyle = {
    backgroundColor: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    padding: '16px',
    minWidth: '300px',
};

const EditFormSportground = ({ fetchData, sportground }) => {
    dayjs.extend(utc);
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [types, setType] = useState([]);
    const [typeId, setTypeId] = useState(sportground.sportground_type.id);
    const [sportgrounds, setSportgrounds] = useState({
        address: sportground.address,
        description: sportground.description,
        workStartTime:  dayjs.utc(sportground.work_start_time).local(),
        workEndTime: dayjs.utc(sportground.work_end_time).local(),
        sportgroundTypeId: sportground.sportground_type.id,
    });

    const handleDateChange = (date, key) => {
        setSportgrounds((prevFormData) => ({
            ...prevFormData,
            [key]: date,
        }));
    };

    const fetchType = async () => {
        try {
            const result = await getAllSportgroundTypes();
            setType(result);
        } catch (error) {
            console.error("Error fetching types:", error);
        }
    };

    const handleOpen = () => {
        fetchType()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSportgrounds((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        // Format the selected dates to match the expected format in the database
    const formattedStartDate = sportgrounds.workStartTime.format('YYYY-MM-DD HH:mm:ss');
    const formattedEndDate = sportgrounds.workEndTime.format('YYYY-MM-DD HH:mm:ss');

    // Convert the formatted dates to UTC before sending to the server
    const formattedDatesStartUTC = dayjs.utc(formattedStartDate);
    const formattedDatesEndUTC = dayjs.utc(formattedEndDate);

    // Use .format() to convert the UTC dates to the desired format (with timezone offset) for the server
    const formattedDatesStartToSend = formattedDatesStartUTC.format();
    const formattedDatesEndToSend = formattedDatesEndUTC.format();

    await updateSportground(sportground.id, {
        ...sportgrounds,
        workStartTime: formattedDatesStartToSend,
        workEndTime: formattedDatesEndToSend,
        sportgroundTypeId: typeId,
    });
        await fetchData();
        handleClose();
    };
    return (
        <>
            <Button onClick={handleOpen} variant="outlined">
                <span role="img" aria-label="Edit">✏️</span>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                style={modalStyle}
                aria-labelledby="add-sensor-modal"
                aria-describedby="add-sensor-form"
            >
                <Paper style={paperStyle}>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label={t("sportground.address")}
                                    name="address"
                                    value={sportgrounds.address}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={t("box.description")}
                                    name="description"
                                    value={sportgrounds.description}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {/* Reuse the same DateTimePicker for both start and end dates */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                        <DateTimePicker
                                            label={t("sportground.startTime")}
                                            value={sportgrounds.workStartTime}
                                            onChange={(date) => handleDateChange(date, 'workStartTime')}
                                        />
                                        <DateTimePicker
                                            label={t("sportground.endTime")}
                                            value={sportgrounds.workEndTime}
                                            onChange={(date) => handleDateChange(date, 'workEndTime')}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    options={types}
                                    getOptionLabel={(option) => option.type}
                                    renderInput={(params) => <TextField {...params} label={t("sportground.type")}/>}
                                    value={types.find((item) => parseInt(item.id) === parseInt(sportground.sportground_type.id)) || null}
                                    onChange={(event, newValue) => setTypeId(newValue?.id || null)}
                                />
                            </Grid>

                        </Grid>
                        <div style={{ marginTop: 5 }}>
                            <Button variant="contained" color="primary" onClick={handleSave}>
                            {t("saveButton")}
                            </Button>
                            <Button style={{ marginLeft: 5 }} variant="contained" onClick={handleClose}>
                            {t("cancelButton")}
                            </Button>
                        </div>

                    </Box>
                </Paper>
            </Modal>
        </>
    );
};
export default EditFormSportground;
