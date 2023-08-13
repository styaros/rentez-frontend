import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        navbar: {
          logout: 'Logout',
          signIn: 'Log in',
          signUp: 'Registration',
        },
        saveButton: "Save",
        cancelButton: "Cancel",
        box:{
          viewBoxes: "View available boxes",
          number: "Number",
          description: "Description",
          hour: "Hour price"
        },
        sportground:{
          type: "Type",
          address: "Address",
          startTime: "Start time",
          endTime: "End time",
          sportgroundTitle: "Sportgrounds",
          allTypes: "All" 
        },
        search: "Search",
        chooseType: "Choose type",
        haveAccountMessage: 'Already have an account? Sign in',
        noAccountMessage: "Don't have an account? Sign up",
        company:{
          name: "Company name",
          email: "Email",
          password: "Password",
          phone: "Phone",
       }, 
       companyType: "Company",
       userType: "User",
       signInButton: 'Log in',
       signUpButton: 'Registration',
       user:{
        name: "First name",
        lastname: "Last name",
        linkSportground: "Go to sportgrounds",
        linkReservation: "Go to reservations"
       },
       reservation: {
        filter: "Status filter",
        status: "Status",
        finish: "Finish",
        view: "View reservation",
        reserve: "Make reservation"
       }
      },
    },
    ua: {
      translation: {
        navbar: {
          logout: 'Вийти',
          signIn: 'Увійти',
          signUp: 'Зареєструватися',
        },
        saveButton: "Збрегети",
        cancelButton: "Відмінити",
        box:{
          viewBoxes: "Продивитись доступні бокси",
          number: "Номер",
          description: "Опис",
          hour: "Ціна за годину"
        },
        sportground:{
          type: "Тип",
          address: "Адреса",
          startTime: "Час початку",
          endTime: "Час закінчення",
          sportgroundTitle: "Спортивні майданчики",
          allTypes: "Усі" 
        },
        search: "Пошук",
        chooseType: "Обрати тип",
        companyType: "Компанія",
        userType: "Користувач",
        company:{
          name: "Назва компанії",
          email: "Електрона пошта",
          password: "Пароль",
          phone: "Телефон",
        },
       haveAccountMessage: 'Вже є аккаунт? Увійти',
       noAccountMessage: "Немає облікового запису? Зареєструватися",
       signInButton: 'Увійти',
       signUpButton: 'Зареєструватися',
       user:{
        name: "Ім`я",
        lastname: "Призвіще",
        linkSportground: "Перейти до спортивних майданчиків",
        linkReservation: "Перейти до бронювань"
       },
        reservation: {
        filter: "Фильтрація по статусу",
        status: "Статус",
        finish: "Закінчити",
        view: "Переглянути бронь",
        reserve: "Зробити бронь"
       }
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
