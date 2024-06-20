import { ComponentType } from 'react';

interface IWithLoadingProps {
    isLoading: boolean;
}

const withLoading = <P extends object, T extends object>(
    WrappedComponent: ComponentType<P>,
    Loader: ComponentType<T>
) => {
    return (props: P & IWithLoadingProps & T) => {
        return props.isLoading ? <Loader {...props} /> : <WrappedComponent {...props} />;
    };
};

export default withLoading;
