'use client'

import { submitData } from '@/app/lib/actions'
import { IDictionaryModal } from '@/app/lib/interfaces'
import sendEmail from '@/app/lib/utils/sendEmail'
import { Flex, FormControl, Input, Textarea, Checkbox } from '@chakra-ui/react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'

import SubmitButton from '../submitButton/SubmitButton'
import { theme } from '../theme'

interface ContactFormProps {
	nameProduct?: string
	dictionaryModal?: IDictionaryModal
}

const ContactForm: React.FC<ContactFormProps> = ({ nameProduct, dictionaryModal }) => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
	const [state, dispatch] = useFormState(submitData, undefined)
	const ref = useRef<HTMLFormElement | null>(null)

	const router = useRouter()

	const { lang } = useParams()

	const pathname = usePathname()
	const arr = pathname.split('/')

	const contactPage = arr[2]

	useEffect(() => {
		;(async () => {
			if (state?.message === 'success') {
				try {
					setIsSubmitting(true)

					const res = await sendEmail({ ...state, nameProduct })
					if (res?.status === 200) {
						const newPath = `/${lang}/contact/success`
						router.push(newPath)

						ref.current?.reset()
					}
				} catch (error) {
					console.error(error)
				} finally {
					setIsSubmitting(false)
				}
			}
		})()
	}, [state, nameProduct, router, lang])

	const nameError =
		state?.errors?.name && state?.errors?.name.length > 0 ? state.errors.name[0] : null

	const emailError =
		state?.errors?.email && state?.errors?.email.length > 0 ? state.errors.email[0] : null

	const policyError =
		state?.errors?.policy && state?.errors?.policy.length > 0 ? state.errors.policy[0] : null

	return (
		<Flex as="form" action={dispatch} ref={ref} flexDir={'column'} gap={'5px'}>
			<Flex
				flexDir={contactPage === 'contact' ? { base: 'column', md: 'row' } : 'column'}
				gap={'5px'}
			>
				<FormControl>
					<Input
						name="name"
						type="text"
						borderRadius={'2px'}
						p={'0 10px'}
						placeholder={`${dictionaryModal?.nameField}`}
						bgColor={theme.colors.tableRow}
						focusBorderColor={'#9E9E9E'}
						border={`1px solid ${nameError ? '#D30000' : 'transparent'}`}
						_placeholder={{
							color: emailError ? '#D30000' : '#9E9E9E',
						}}
					/>
				</FormControl>
				<FormControl>
					<Input
						name="email"
						type="email"
						borderRadius={'2px'}
						p={'0 10px'}
						placeholder={`${dictionaryModal?.emailField}`}
						bgColor={theme.colors.tableRow}
						focusBorderColor={'#9E9E9E'}
						border={`1px solid ${emailError ? '#D30000' : 'transparent'}`}
						_placeholder={{
							color: emailError ? '#D30000' : '#9E9E9E',
						}}
					/>
				</FormControl>
			</Flex>
			<FormControl>
				<Textarea
					name="userMessage"
					borderRadius={'2px'}
					bgColor={theme.colors.tableRow}
					p={'10px'}
					minHeight={'200px'}
					placeholder={`${dictionaryModal?.message}`}
					focusBorderColor={'#9E9E9E'}
					border={'1px solid  transparent'}
					resize="none"
					_placeholder={{
						color: '#9E9E9E',
					}}
				/>
			</FormControl>
			<SubmitButton variant={'accentAlt'} isSubmitting={isSubmitting}>
				{dictionaryModal?.button}
			</SubmitButton>
			<FormControl marginTop={'10px'}>
				<Checkbox
					name="policy"
					colorScheme="#ECEFF1"
					borderColor={'transparent'}
					color={'black'}
					iconColor={theme.colors.hText}
					_focus={{
						borderColor: 'none',
						outlineColor: 'transparent',
						boxShadow: 'none',
					}}
					css={{
						'& .chakra-checkbox__control': {
							border: `1px solid ${policyError ? '#D30000' : 'transparent'}`,
							background: '#ECEFF1',
							width: '20px',
							height: '20px',
							borderRadius: '2px',
							outline: 'none',
						},

						'& span': {
							fontSize: '14px',
							color: '#616161',
							lineHeight: 1.1,
						},
					}}
				>
					{dictionaryModal?.policy}
				</Checkbox>
			</FormControl>
		</Flex>
	)
}

export default ContactForm
