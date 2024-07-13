import { ComponentType } from 'react';
import LoaderUI from '#components/UI/LoaderUI/LoaderUI';

interface IWithLoadingProps {
    isLoading: boolean;
}

const withLoading = <P extends object, T extends object>(
    WrappedComponent: ComponentType<P>,
    Loader: ComponentType<T> = LoaderUI
) => {
    return (props: P & IWithLoadingProps & T) => {
        return props.isLoading ? <Loader {...props} /> : <WrappedComponent {...props} />;
    };
};

export default withLoading;
