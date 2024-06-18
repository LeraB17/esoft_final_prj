import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { IUserMenuProps } from './IUserMenuProps';
import { useNavigate } from 'react-router-dom';

const UserMenu: FC<IUserMenuProps> = ({ pages }) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();

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

    return (
        <>
            <Tooltip title="Open settings">
                <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                >
                    <Avatar
                        alt="Avatar"
                        src="/static/images/avatar/2.jpg"
                    />
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
                {pages.map((page) => (
                    <MenuItem
                        key={page.name}
                        onClick={() => handleUserMenuItemClick(page.link)}
                    >
                        <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default UserMenu;
