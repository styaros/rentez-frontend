import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import { COMPANIES, MY_RESERVATIONS, SIGN_IN, SIGN_UP, SPORTGROUNDS, USER } from "./Helpers/Link";
import SignUp from "./Pages/SignUp";
import Companies from "./Pages/Companies";
import Sportground from "./Pages/Sportground";
import User from "./Pages/User";
import Sportgrounds from "./Pages/Sportgrounds";
import MyReservations from "./Pages/MyReservations";

const AppRoutes = observer(() => {

    return (
        <Routes>
            <Route path={SIGN_UP} element={<SignUp />} />
            <Route path={SIGN_IN} element={<SignIn />} />
            {
                'type' in localStorage &&
                <>
                    {
                        localStorage.getItem('type') === 'company' ?
                            <>
                                <Route path={COMPANIES} element={<Companies />} />
                                <Route path={SPORTGROUNDS + ':id'} element={<Sportground />} /></>
                            :
                            <>
                                <Route path={USER} element={<User />} />
                                <Route path={SPORTGROUNDS} element={<Sportgrounds />} />
                                <Route path={MY_RESERVATIONS} element={<MyReservations />} /></>
                    }
                </>
            }
        </Routes>
    );
});

export default AppRoutes;