'use client';

import { Button, Center } from '@chakra-ui/react';
import { useEffect } from 'react';

import Arrow from '../../svg/Arrow';

const LoadMore = ({
	children,
	total,
	page,
	hasProducts,
	setTotal,
	setPage,
}: {
	page: number;
	children: React.ReactNode;
	total: number;
	hasProducts: boolean;
	setTotal: (total: number) => void;
	setPage: (page: number) => void;
}) => {
	const limit = 8;

	useEffect(() => {
		if (total && hasProducts) {
			setTotal(total);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasProducts, total]);

	let hasNext;
	if (page && total) {
		hasNext = limit * (page - 1) + limit < total;
	}

	const handleChangePage = () => {
		setPage(page + 1);
	};

	return (
		hasProducts && (
			<Center mt={'60px'}>
				<Button
					variant="arrow"
					type="button"
					onClick={handleChangePage}
					rightIcon={<Arrow />}
					isDisabled={!hasNext}
				>
					{children}
				</Button>
			</Center>
		)
	);
};

export default LoadMore;
