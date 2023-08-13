import React, { useEffect, useState } from 'react';
import { Link, Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { getBoxesBySportground, getReservation } from '../Api/BoxesApi';
import AddBoxes from './AddBoxes';
import Reservation from '../Pages/Reservations';
import ReservationForm from './Reservation';
import { useTranslation } from "react-i18next";

const ViewBoxes = ({ id }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [boxes, setBoxes] = useState([]);
    const fetchData = async () => {
        try {
            const result = await getBoxesBySportground(id);
            const reservationResult = await getReservation();
            // Filter active reservations
            const activeReservations = reservationResult.filter(reservation => reservation.status === "active");

            // Get ids of reserved boxes from active reservations
            const reservedIds = activeReservations.map(reservation => reservation.box_id);

            // Filter available boxes based on reservedIds
            const availableBoxes = result.filter(box => !reservedIds.includes(box.id));
            setBoxes(availableBoxes);
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
            <Link
                style={{ textDecorationLine: 'underline', cursor: 'pointer', color: 'blue' }}
                onClick={handleClickOpen}
            >
                 {t("box.viewBoxes")}
            </Link>
            <Dialog open={open} onClose={handleClose}>

                <DialogContent>
                    {
                        localStorage.getItem('type') === 'company' &&
                        <AddBoxes fetchData={fetchData} id={id} />
                    }
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>  {t("box.number")}</TableCell>
                                    <TableCell>  {t("box.description")}</TableCell>
                                    <TableCell>  {t("box.hour")}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                boxes.map((box) => (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{box.number}</TableCell>
                                            <TableCell>{box.description}</TableCell>
                                            <TableCell>${box.hour_price}</TableCell>
                                            {
                                                localStorage.getItem('type') === 'user' ?
                                                    <TableCell>
                                                       <ReservationForm fetchData={fetchData}  box={box} />
                                                    </TableCell>
                                                    :
                                                    <TableCell>
                                                        <Reservation box_id={box.id} />
                                                    </TableCell>
                                            }
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

export default ViewBoxes;
