import { FC, useState } from 'react';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import UserMenu from './UserMenu';
import { pages, settings } from './menuPages';
import { MAIN_PAGE, SIGN_UP_PAGE } from '#utils/urls';

const Header: FC = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const isAuth = false;

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
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                        }}
                    >
                        <Link
                            className={styles.Link}
                            to={MAIN_PAGE}
                        >
                            LOGO
                        </Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
                        <Link
                            className={styles.Link}
                            to={MAIN_PAGE}
                        >
                            LOGO
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => handleNavMenuItemClick(page.link)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {isAuth ? (
                            <UserMenu pages={settings} />
                        ) : (
                            <div className={styles.ButtonWrapper}>
                                <Button
                                    variant="text"
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    onClick={() => {
                                        navigate(SIGN_UP_PAGE);
                                    }}
                                >
                                    Создать аккаунт
                                </Button>
                                <Button
                                    variant="text"
                                    sx={{ my: 2, color: 'white', display: 'block', ml: 2 }}
                                    onClick={() => {
                                        navigate(MAIN_PAGE);
                                    }}
                                >
                                    Войти
                                </Button>
                            </div>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
