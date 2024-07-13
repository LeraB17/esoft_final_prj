import { IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MAIN_PAGE, PROFILE_PAGE } from '#utils/urls';
import { useAppDispatch, useAppSelector } from '#hooks/redux';
import { clearToken } from '#store/reducers/authSlice';
import { removeToken } from '#utils/token';
import { authAPI } from '#services/AuthService';
import AvatarUI from '#components/UI/AvatarUI/AvatarUI';

const UserMenu: FC = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const { user } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [logoutUser, {}] = authAPI.useLogoutUserMutation();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleUserMenuItemClick = (page: string) => {
        handleCloseUserMenu();
        navigate(page);
    };

    const handleLogout = async (page: string) => {
        if (window.confirm('Вы действительно хотите выйти?')) {
            handleUserMenuItemClick(page);
            await logoutUser();
            dispatch(clearToken());
            removeToken();
        }
    };

    return (
        <>
            <Tooltip title="Open settings">
                <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                >
                    <AvatarUI path={user?.avatar || ''} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem disabled>
                    <Typography textAlign="center">@{user?.nickname}</Typography>
                </MenuItem>

                <MenuItem onClick={() => handleUserMenuItemClick(PROFILE_PAGE)}>
                    <Typography textAlign="center">Мой профиль</Typography>
                </MenuItem>

                <MenuItem onClick={() => handleLogout(MAIN_PAGE)}>
                    <Typography textAlign="center">Выйти</Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
