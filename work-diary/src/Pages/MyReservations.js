import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, MenuItem } from '@mui/material';
import { changeStatusReservation, getReservation } from '../Api/BoxesApi';
import { useTranslation } from "react-i18next";

const MyReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const { t } = useTranslation();
    const fetchData = async () => {
        try {
            const reservationResult = await getReservation();
            const activeReservations = reservationResult.filter(reservation => reservation.user_id === parseInt(localStorage.getItem('id')));
            setReservations(activeReservations);
            console.log(activeReservations);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateChangeStatus = async (id) => {
        await changeStatusReservation(id);
        await fetchData();
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const filteredReservations = statusFilter === 'all' ? reservations : reservations.filter(reservation => reservation.status === statusFilter);

    return (
        <>
            <div>
                <TextField
                style={{margin: '16px', width: '20%'}}
                    select
                    label="Status Filter"
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    variant="outlined"
                >
                    <MenuItem value="all">{t("sportground.allTypes")}</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="finished">Finished</MenuItem>
                </TextField>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("sportground.startTime")}</TableCell>
                            <TableCell>{t("sportground.endTime")}</TableCell>
                            <TableCell>{t("reservation.status")}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredReservations.map((reservation) => (
                            <TableRow key={reservation.id}>
                                <TableCell>{reservation.start_date}</TableCell>
                                <TableCell>{reservation.end_date}</TableCell>
                                <TableCell>{reservation.status}</TableCell>
                                {reservation.status === 'active' && (
                                    <TableCell>
                                        <Button onClick={() => updateChangeStatus(reservation.id)} variant='contained'>
                                        {t("reservation.finish")}
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default MyReservations;
