import SystemHeader from '~/containers/System/SystemHeader';

const LayoutSystem = ({ children }) => {
    return (
        <div>
            <SystemHeader />
            {children}
        </div>
    );
};

export default LayoutSystem;
