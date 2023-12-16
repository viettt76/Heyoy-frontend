import { useEffect, useState } from 'react';

const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        let time = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(time);
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
