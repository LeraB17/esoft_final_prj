import { FC } from 'react';
import styles from './Footer.module.scss';
import { Container, MenuItem, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { MAIN_PAGE } from '#utils/urls';
import { pages } from '#components/Header/menuPages';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';

const Footer: FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.Footer}>
            <Container
                maxWidth="xl"
                className={styles.Content}
            >
                <div className={styles.Menu}>
                    {pages.map((page) => (
                        <MenuItem
                            key={page.name}
                            onClick={() => navigate(page.link)}
                        >
                            <Typography textAlign="center">{page.name}</Typography>
                        </MenuItem>
                    ))}
                </div>
                <div className={styles.Center}>
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
                    <Typography variant="body2">
                        Веб-приложение реализовано в рамках проекта <br />
                        на Школе Программирования Esoft 2024
                    </Typography>
                </div>
                <div className={styles.Menu}>
                    <Link
                        className={styles.Link}
                        to={'https://github.com/LeraB17/esoft_final_prj'}
                        target="blank"
                    >
                        <div style={{ display: 'flex' }}>
                            <GitHubIcon color="inherit" />
                            <Typography sx={{ marginLeft: 1 }}>GitHub проекта</Typography>
                        </div>
                    </Link>
                    <Link
                        className={styles.Link}
                        to={''}
                        target="blank"
                    >
                        <div style={{ display: 'flex' }}>
                            <TelegramIcon color="inherit" />
                            <Typography sx={{ marginLeft: 1 }}>Telegram</Typography>
                        </div>
                    </Link>
                </div>
                <div className={styles.Text}>
                    <Typography variant="body2">
                        Веб-приложение реализовано в рамках проекта <br />
                        на Школе Программирования Esoft 2024
                    </Typography>
                </div>
            </Container>
        </div>
    );
};

export default Footer;
