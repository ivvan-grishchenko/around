import { useEffect, useState } from 'react';

const useDebounce = <ValueType>(value: ValueType, delay: number): ValueType => {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(handler);
	}, [value, delay]);

	return debouncedValue;
};

export { useDebounce };
