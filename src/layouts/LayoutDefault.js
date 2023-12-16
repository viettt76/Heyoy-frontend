import Header from '~/containers/Header';
import Footer from '~/containers/Footer';

const LayoutDefault = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default LayoutDefault;
