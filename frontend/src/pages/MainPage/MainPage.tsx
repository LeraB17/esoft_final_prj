import { FC } from 'react';
import styles from './MainPage.module.scss';
import { Card, Chip, Typography } from '@mui/material';
import ButtonUI from '#components/UI/ButtonUI/ButtonUI';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { LOGIN_PAGE, MAP_PAGE, SIGN_UP_PAGE } from '#utils/urls';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '#store/reducers/authSlice';

const phrases = ['Создавай заметки', 'Делись с друзьями', 'Сохраняй заметки других', 'Узнавай, что интересно другим'];

const MainPage: FC = () => {
    const isAuth = useSelector(selectIsAuth);

    return (
        <div className={styles.MainPage}>
            <Card
                variant="outlined"
                className={styles.Card}
            >
                <Typography variant="h6">
                    <LocationOnRoundedIcon color="inherit" />
                    Заполни свою карту!
                </Typography>

                <div className={styles.Phrases}>
                    {phrases.map((phrase, index) => (
                        <Chip
                            key={index}
                            className={styles.Phrase}
                            label={phrase}
                        />
                    ))}
                </div>

                <div className={styles.Buttons}>
                    {isAuth ? (
                        <ButtonUI
                            variant="contained"
                            href={MAP_PAGE}
                            sx={{ width: '50%' }}
                        >
                            К карте
                        </ButtonUI>
                    ) : (
                        <>
                            <ButtonUI
                                variant="contained"
                                href={SIGN_UP_PAGE}
                            >
                                Зарегистрироваться
                            </ButtonUI>
                            <ButtonUI
                                variant="contained"
                                href={LOGIN_PAGE}
                            >
                                Войти
                            </ButtonUI>
                        </>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default MainPage;
