import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { COMPANIES, SIGN_UP, USER } from '../Helpers/Link';
import { useNavigate } from 'react-router-dom';
import { getEmployeeByJwt, loginCompany, loginEmployee, registerEmployee } from '../Api/UserApi';
import { MenuItem } from '@mui/material';

const Selector = ({ onSelect }) => {
    const [selected, setSelected] = useState('');
    const { t } = useTranslation();
    const handleSelect = (event) => {
        setSelected(event.target.value);
        onSelect(event.target.value);
    };

    return (
        <Grid item xs={12}>
            <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                select
                label={t("chooseType")}
                value={selected}
                onChange={handleSelect}
            >
                <MenuItem value="company">{t("companyType")}</MenuItem>
                <MenuItem value="employee">{t("userType")}</MenuItem>
            </TextField>
        </Grid>
    );
};

const SignIn = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [selectedType, setSelectedType] = useState('company');
    const navigation = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = selectedType === 'company'
            ? await loginCompany(formData)
            : await loginEmployee(formData);

        selectedType === 'company'
            ? localStorage.setItem('id', result.company.id)
            : localStorage.setItem('id', result.user.id)

        selectedType === 'company'
            ? localStorage.setItem('type', 'company')
            : localStorage.setItem('type', 'user')

         localStorage.setItem('token', result.token)
        console.log(result.token)
        selectedType === 'company'
            ? navigation(COMPANIES)
            : navigation(USER)

        console.log('Form submitted:', formData);
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {t('signInButton')}
                </Typography>
                <Box >
                    <Grid container spacing={2}>
                        <Selector onSelect={setSelectedType} />
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label={t('company.email')}
                                name="email"
                                onChange={handleChange}
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="password"
                                label={t('company.password')}
                                name="password"
                                type="password"
                                onChange={handleChange}
                                autoComplete="password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {t('signInButton')}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                style={{ textDecorationLine: 'underline', cursor: 'pointer', color: 'blue' }}
                                onClick={() => navigation(SIGN_UP)}
                                variant="body2"
                            >
                                {t('noAccountMessage')}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;