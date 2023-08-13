import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SIGN_IN } from '../Helpers/Link';
import { registerCompanies, registerEmployee } from '../Api/UserApi';
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
      <MenuItem value="user">{t("userType")}</MenuItem>
    </TextField>
    </Grid>
  );
};

const SignUp = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    surname: '',
  });

  const [selectedType, setSelectedType] = useState('company'); // Default to "Company" option
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
    if (selectedType === 'company') {
      // Remove the surname field for the company form data
      const { surname, ...companyFormData } = formData;
      const result = await registerCompanies(companyFormData);
      localStorage.setItem('token', result.token);
    } else {
      const result = await registerEmployee(formData);
      localStorage.setItem('token', result.token);
    }
    navigation(SIGN_IN);
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
          {t("signUpButton")}
        </Typography>
        <form onSubmit={handleSubmit}>
       
          <Grid container spacing={2}>
          <Selector onSelect={setSelectedType} />
            {selectedType === 'company' ? (
              // Render Company form fields
              <>
                <Grid item xs={12}>
                  <TextField
                    required
                    variant="outlined"
                    fullWidth
                    id="name"
                    label={t("company.name")}
                    name="name"
                    onChange={handleChange}
                    autoComplete="company-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    variant="outlined"
                    fullWidth
                    id="phone"
                    label={t("company.phone")}
                    name="phone"
                    onChange={handleChange}
                    autoComplete="company-phone"
                  />
                </Grid>
              </>
            ) : (
              // Render User form fields
              <>
                <Grid item xs={12}>
                  <TextField
                    required
                    variant="outlined"
                    fullWidth
                    id="name"
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
                    fullWidth
                    id="phone"
                    label={t("company.phone")}
                    name="phone"
                    onChange={handleChange}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
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
                variant="outlined"
                fullWidth
                id="password"
                label={t('company.password')}
                name="password"
                type="password"
                onChange={handleChange}
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          {t("signUpButton")}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link style={{ textDecorationLine: 'underline', cursor: 'pointer', color: 'blue' }} onClick={() => navigation(SIGN_IN)} variant="body2">
                {t('haveAccountMessage')}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );

};

export default SignUp;
