import { Button } from '@chakra-ui/react'
import { useFormStatus } from 'react-dom'

import Arrow from '../svg/Arrow'

interface ISubmitButton {
	children: React.ReactNode
	variant: 'accent' | 'arrow' | 'accentAlt'
	isSubmitting?: boolean
	onClick?: () => void
}

const SubmitButton: React.FC<ISubmitButton> = ({
	children,
	isSubmitting = false,
	variant,
	onClick,
}) => {
	const { pending } = useFormStatus()

	return (
		<Button
			rightIcon={variant === 'arrow' ? <Arrow /> : undefined}
			variant={variant}
			type="submit"
			isLoading={pending || isSubmitting}
			isDisabled={pending || isSubmitting}
			onClick={onClick}
		>
			{children}
		</Button>
	)
}
export default SubmitButton
