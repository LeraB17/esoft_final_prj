import { ComponentType } from 'react';
import Error from '#components/Error/Error';

interface IWithErrorHandlingProps {
    isError: boolean;
}

const withErrorHandling = <P extends object, T extends object>(
    WrappedComponent: ComponentType<P>,
    ErrorComponent: ComponentType<T> = Error
) => {
    return (props: P & IWithErrorHandlingProps & T) => {
        return props.isError ? <ErrorComponent {...props} /> : <WrappedComponent {...props} />;
    };
};

export default withErrorHandling;
