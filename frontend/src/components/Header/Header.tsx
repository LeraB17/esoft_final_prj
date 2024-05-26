import { FC } from 'react';
import styles from './Header.module.scss';
import { Container, Navbar, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MAIN_PAGE, MAP_PAGE, PERSONAL_ACCOUNT_PAGE as PROFILE_PAGE } from '#utils/urls';

const Header: FC = () => {
    return (
        <Navbar
            fixed="top"
            bg="dark"
            data-bs-theme="dark"
            className="bg-body-tertiary justify-content-between"
        >
            <Container>
                <Navbar.Brand>
                    <Link to={MAIN_PAGE}>
                        <div>Name & Icon</div>
                    </Link>
                </Navbar.Brand>

                <Stack
                    direction="horizontal"
                    gap={5}
                >
                    <Link to={PROFILE_PAGE}>профиль</Link>
                    <Link to={MAP_PAGE}>моя карта</Link>
                </Stack>
            </Container>
        </Navbar>
    );
};

export default Header;
