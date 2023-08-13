import React, { useState } from "react";
import {
    Button,
    Modal,
    TextField,
    Box,
    Paper,
} from '@mui/material';
import { useTranslation } from "react-i18next";
import { createBox } from "../Api/BoxesApi";

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

const AddBoxes = ({ fetchData, id }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [companies, setCompanies] = useState({
        number: '',
        description: '',
        hourPrice: '',
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
        console.log(companies)
        await createBox(id, companies);
        await fetchData();
        setCompanies({
            number: '',
            description: '',
            hourPrice: '',
            sportground_id: id,
        });
        handleClose();
    };

    return (
        <>
             <Button onClick={handleOpen} variant="contained">
                +
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
                                label={t("box.number")}
                                name="number"
                                value={companies.number}
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
                               <TextField
                                label={t("box.hour")}
                                name='hourPrice'
                                value={companies.hourPrice}
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

export default AddBoxes;
