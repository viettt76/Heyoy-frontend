import Header from '~/containers/Header';

const LayoutOnlyHeader = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

export default LayoutOnlyHeader;
