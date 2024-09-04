import { ICategory, SEARCH_PARAMS } from '@/app/lib/interfaces';
import { Box, Button } from '@chakra-ui/react';
import React from 'react';

interface ICategoryProps {
	category: ICategory['attributes'];
	onClick: (queries: { [key: string]: string | number }) => void;
	choosedCategory?: string | null;
}

const Category = ({ category, onClick, choosedCategory }: ICategoryProps) => {
	return (
		<>
			<Button
				w={'full'}
				justifyContent={'start'}
				onClick={() => onClick({ [SEARCH_PARAMS.CATEGORY]: category.uid })}
				variant={'ghost'}
				_hover={{ backgroundColor: 'transparent', opacity: 0.9 }}
			>
				{category.title}
			</Button>
			{choosedCategory && choosedCategory === category.uid.toString() && (
				<Box
					position={'absolute'}
					top={'100%'}
					left={0}
					w={'100%'}
					h={'3px'}
					bgColor={'#000'}
				></Box>
			)}
		</>
	);
};

export default Category;
