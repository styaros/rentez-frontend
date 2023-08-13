import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { getReservation } from '../Api/BoxesApi';
import { useTranslation } from "react-i18next";

const Reservation = ({ box_id }) => {
    dayjs.extend(utc);
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [reservations, setReservation] = useState([]);
    const fetchData = async () => {
        try {
            const allReservation = await getReservation();
            const reservationResult = allReservation.filter(reservation => reservation.box_id === parseInt(box_id));
            setReservation(reservationResult);
        } catch (error) {
            console.error("Error fetching sportgrounds:", error);
        }
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Button
                onClick={handleClickOpen}
            >{t("reservation.view")}</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>{t("sportground.startTime")}</TableCell>
                                    <TableCell>{t("sportground.endTime")}</TableCell>
                                    <TableCell>{t("reservation.status")}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                reservations.map((reservation) => (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{reservation.id}</TableCell>
                                            <TableCell>{dayjs.utc(reservation.start_date).local().format('YYYY-MM-DD h:mm A')}</TableCell>
                                            <TableCell>{dayjs.utc(reservation.end_date).local().format('YYYY-MM-DD h:mm A')}</TableCell>
                                            <TableCell>{reservation.status}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                ))
                            }
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Reservation;