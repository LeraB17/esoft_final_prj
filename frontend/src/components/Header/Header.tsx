import { FC, useState } from 'react';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EditLocationAltRoundedIcon from '@mui/icons-material/EditLocationAltRounded';
import UserMenu from './UserMenu';
import { pages } from './menuPages';
import { LOGIN_PAGE, MAIN_PAGE, SIGN_UP_PAGE } from '#utils/urls';
import { selectIsAuth } from '#store/reducers/authSlice';
import { useSelector } from 'react-redux';
import ButtonUI from '#components/UI/ButtonUI/ButtonUI';

const Header: FC = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const isAuth = useSelector(selectIsAuth);

    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleNavMenuItemClick = (page: string) => {
        handleCloseNavMenu();
        navigate(page);
    };

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link
                        className={styles.Link}
                        to={MAIN_PAGE}
                    >
                        <EditLocationAltRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                            }}
                        >
                            NotesOnMap
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        {isAuth && (
                            <>
                                <IconButton
                                    size="large"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem
                                            key={page.name}
                                            onClick={() => handleNavMenuItemClick(page.link)}
                                        >
                                            <Typography textAlign="center">{page.name}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        )}
                    </Box>

                    <Link
                        className={styles.Link}
                        to={MAIN_PAGE}
                    >
                        <EditLocationAltRoundedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                            }}
                        >
                            NotesOnMap
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {isAuth && (
                            <>
                                {pages.map((page) => (
                                    <ButtonUI
                                        key={page.name}
                                        onClick={() => handleNavMenuItemClick(page.link)}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page.name}
                                    </ButtonUI>
                                ))}
                            </>
                        )}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {isAuth ? (
                            <UserMenu />
                        ) : (
                            <div className={styles.ButtonWrapper}>
                                <ButtonUI
                                    variant="text"
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    onClick={() => {
                                        navigate(SIGN_UP_PAGE);
                                    }}
                                >
                                    Создать аккаунт
                                </ButtonUI>

                                <ButtonUI
                                    variant="text"
                                    sx={{ my: 2, color: 'white', display: 'block', ml: 2 }}
                                    onClick={() => {
                                        navigate(LOGIN_PAGE);
                                    }}
                                >
                                    Войти
                                </ButtonUI>
                            </div>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
