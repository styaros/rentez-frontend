import { useEffect, useState } from "react";
import React from 'react';
import {
    Button,
    Modal,
    TextField,
    Box,
    Paper,
    Grid,
} from '@mui/material';
import { useTranslation } from "react-i18next";
import { putEmployee } from "../Api/UserApi";

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

const EditFormUser = ({ fetchData, user }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        phone: user.phone,
        email: user.email,
        surname: user.surname
    });

    const handleOpen = () => {
        console.log(user)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        await putEmployee(user.id, formData);
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
                                    required
                                    variant="outlined"
                                    fullWidth
                                    id="name"
                                    value={formData.name}
                                    label={t("user.name")}
                                    name="name"
                                    onChange={handleChange}
                                    autoComplete="user-first-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    variant="outlined"
                                    fullWidth
                                    value={formData.surname}
                                    id="surname"
                                    label={t("user.lastname")}
                                    name="surname"
                                    onChange={handleChange}
                                    autoComplete="user-last-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    variant="outlined"
                                    value={formData.phone}
                                    fullWidth
                                    id="phone"
                                    label={t("company.phone")}
                                    name="phone"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    variant="outlined"
                                    value={formData.email}
                                    fullWidth
                                    id="email"
                                    label={t("company.email")}
                                    name="email"
                                    onChange={handleChange}
                                    autoComplete="email"
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
export default EditFormUser;
