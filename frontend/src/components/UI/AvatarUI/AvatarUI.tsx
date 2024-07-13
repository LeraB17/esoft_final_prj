import { FC } from 'react';
import { IAvatarUIProps } from './IAvatarUIProps';
import { Avatar } from '@mui/material';
import { STATIC_URL } from '#utils/urls';

const borderStyle = '1px solid rgba(0, 0, 0, 0.12)';

const AvatarUI: FC<IAvatarUIProps> = ({ size, path, isBordered = false, isFile = false }) => {
    return (
        <>
            {isFile ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={isFile ? URL.createObjectURL(path as File) : `${STATIC_URL}${path}`}
                        alt="Avatar"
                        style={{
                            width: size,
                            height: size,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: isBordered ? borderStyle : '',
                        }}
                    />
                </div>
            ) : (
                <Avatar
                    alt="Avatar"
                    src={`${STATIC_URL}${path}`}
                    sx={{ width: size, height: size, border: isBordered ? borderStyle : '' }}
                />
            )}
        </>
    );
};

export default AvatarUI;
