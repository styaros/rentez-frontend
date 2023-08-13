import { useEffect, useState } from "react";
import React from 'react';
import {
    Button,
    Modal,
    Box,
    Paper,
    Grid,
} from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import utc from 'dayjs/plugin/utc';
import { makeReservation } from "../Api/BoxesApi";
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

const ReservationForm = ({ fetchData, box }) => {
    dayjs.extend(utc);
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [reservation, setReservation] = useState({
        userId: parseInt(localStorage.getItem('id')),
        start_date: dayjs.utc().local(),
        end_date: dayjs.utc().local()
    });

    const handleDateChange = (date, key) => {
        setReservation((prevFormData) => ({
            ...prevFormData,
            [key]: date,
        }));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        // Format the selected dates to match the expected format in the database
        const formattedStartDate = reservation.start_date.format('YYYY-MM-DD HH:mm:ss');
        const formattedEndDate = reservation.end_date.format('YYYY-MM-DD HH:mm:ss');

        // Convert the formatted dates to UTC before sending to the server
        const formattedDatesStartUTC = dayjs.utc(formattedStartDate);
        const formattedDatesEndUTC = dayjs.utc(formattedEndDate);

        // Use .format() to convert the UTC dates to the desired format (with timezone offset) for the server
        const formattedDatesStartToSend = formattedDatesStartUTC.format();
        const formattedDatesEndToSend = formattedDatesEndUTC.format();

        console.log(
            {
                ...reservation,
                startDate: formattedDatesStartToSend,
                endDate: formattedDatesEndToSend
            }
        )
        await makeReservation(parseInt(box.id),{
            ...reservation,
            startDate: formattedDatesStartToSend,
            endDate: formattedDatesEndToSend
        });
       
        setReservation({
            userId: parseInt(localStorage.getItem('id')),
            startDate: dayjs.utc().local(),
            endDate: dayjs.utc().local()
        });
        await fetchData();
        handleClose();    
    };
    return (
        <>
            <Button onClick={handleOpen} variant="contained">
            {t("reservation.reserve")}
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
                                {/* Reuse the same DateTimePicker for both start and end dates */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                        <DateTimePicker
                                            label={t("sportground.startTime")}
                                            value={reservation.start_date}
                                            onChange={(date) => handleDateChange(date, 'start_date')}
                                        />
                                        <DateTimePicker
                                            label={t("sportground.endTime")}
                                            value={reservation.end_date}
                                            onChange={(date) => handleDateChange(date, 'end_date')}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
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
export default ReservationForm;
