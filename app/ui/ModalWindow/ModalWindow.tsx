'use client'

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React, { FC, ReactNode } from 'react'

interface ModalWindowProps {
	onClose: () => void
	isOpen: boolean
	children: ReactNode
}

const ModalWindow: FC<ModalWindowProps> = ({ onClose, isOpen, children }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent
				bgSize={'cover'}
				bgPos={'center'}
				bgRepeat={'no-repeat'}
				width={{ base: '360px', lg: '480px' }}
				borderRadius={'2px'}
			>
				<ModalCloseButton right={'4px'} />
				<ModalBody
					p={{ base: '45px 10px 30px 10px', lg: '35px 20px' }}
					borderRadius={2}
					overflowY={'auto'}
				>
					{children}
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default ModalWindow
