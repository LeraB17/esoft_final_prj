import React from 'react';

export interface IFormWrapperProps {
    title: string;
    errorMessage?: string;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    buttonText: string;
    textBelow?: JSX.Element;
    children: string | JSX.Element | JSX.Element[];
    fullWidth?: boolean;
}
