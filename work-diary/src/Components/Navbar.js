import { useNavigate } from "react-router-dom";
import { SIGN_IN, SIGN_UP, USER_MANAGEMENT } from "../Helpers/Link";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const navigation = useNavigate()
  const { t, i18n } = useTranslation();

  const logout = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    localStorage.removeItem('type')
    navigation(SIGN_IN)
  }

  return (
    <>
      {'token' in localStorage ? (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <a className="navbar-brand" style={{ color: 'white' }} >
              </a>
            </div>
            <div className="ml-auto">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link"
                    onClick={logout}
                    style={{ cursor: 'pointer',color:'white' }}>
                    {t("navbar.logout")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"
                   onClick={() => i18n.changeLanguage('en')}
                    style={{ cursor: 'pointer', color:'white' }}>
                    EN
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"
                    onClick={() => i18n.changeLanguage('ua')}
                    style={{ cursor: 'pointer', color:'white' }}>
                    UA
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      ) : (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <a className="navbar-brand" style={{ color: 'white' }}>
              </a>
            </div>
            <div className="ml-auto">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link"
                    onClick={() => navigation(SIGN_IN)}
                    style={{ cursor: 'pointer', color:'white' }}>
                    {t("navbar.signIn")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" style={{ cursor: 'pointer',color:'white' }}
                    onClick={() => navigation(SIGN_UP)}
                  >
                    {t("navbar.signUp")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"
                    onClick={() => i18n.changeLanguage('en')}
                    style={{ cursor: 'pointer', color:'white' }}>
                    EN
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"
                    onClick={() => i18n.changeLanguage('ua')}
                    style={{ cursor: 'pointer', color:'white' }}>
                    UA
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}

    </>
  )
};

export default Navbar;