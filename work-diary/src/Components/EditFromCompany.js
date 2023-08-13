import React, { useState } from "react";
import {
    Button,
    Modal,
    TextField,
    Box,
    Paper,
} from '@mui/material';
import { updateCompanies } from "../Api/CompanyApi";
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

const EditFormCompany = ({ fetchData, company }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [companies, setCompanies] = useState({
        email: company.email,
        name: company.name,
        phone: company.phone,
        description: company.description
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCompanies((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        await updateCompanies(company.id, companies);
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
                        <form>
                            <TextField
                                label={t("company.name")}
                                name="name"
                                value={companies.name}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label={t("company.email")}
                                name="email"
                                value={companies.email}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label={t("company.phone")}
                                name="phone"
                                value={companies.phone}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label={t("box.description")}
                                name='description'
                                value={companies.description}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                            <Button variant="contained" color="primary" onClick={handleSave}>
                            {t("saveButton")}
                            </Button>
                            <Button style={{ marginLeft: 5 }} variant="contained" onClick={handleClose}>
                            {t("cancelButton")}
                            </Button>
                        </form>
                    </Box>
                </Paper>
            </Modal>
        </>
    );
};

export default EditFormCompany;
