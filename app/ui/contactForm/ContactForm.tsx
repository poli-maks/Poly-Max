'use client'

import { submitData } from '@/app/lib/actions'
import sendEmail from '@/app/lib/utils/sendEmail'
import { Flex, FormControl, Input, Textarea, Checkbox } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'

import SubmitButton from '../submitButton/SubmitButton'
import { theme } from '../theme'

const ContactForm = () => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
	const [state, dispatch] = useFormState(submitData, undefined)
	const ref = useRef<HTMLFormElement | null>(null)

	useEffect(() => {
		;(async () => {
			if (state?.message === 'success') {
				try {
					setIsSubmitting(true)

					const res = await sendEmail(state)
					if (res?.status === 200) {
						alert(`Submitted succesfully!`)

						ref.current?.reset()
					}
				} catch (error) {
					console.error(error)
				} finally {
					setIsSubmitting(false)
				}
			}
		})()
	}, [state])

	const nameError =
		state?.errors?.name && state?.errors?.name.length > 0 ? state.errors.name[0] : null

	const emailError =
		state?.errors?.email && state?.errors?.email.length > 0 ? state.errors.email[0] : null

	const userMessageError =
		state?.errors?.userMessage && state?.errors?.userMessage.length > 0
			? state.errors.userMessage[0]
			: null

	const policyError =
		state?.errors?.policy && state?.errors?.policy.length > 0 ? state.errors.policy[0] : null

	return (
		<Flex as="form" action={dispatch} ref={ref} flexDir={'column'} gap={'5px'}>
			<FormControl>
				<Input
					name="name"
					type="text"
					borderRadius={'2px'}
					p={'0 10px'}
					placeholder="Name"
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
					placeholder="E-Mail"
					bgColor={theme.colors.tableRow}
					focusBorderColor={'#9E9E9E'}
					border={`1px solid ${emailError ? '#D30000' : 'transparent'}`}
					_placeholder={{
						color: emailError ? '#D30000' : '#9E9E9E',
					}}
				/>
			</FormControl>

			<FormControl>
				<Textarea
					name="userMessage"
					borderRadius={'2px'}
					bgColor={theme.colors.tableRow}
					p={'10px'}
					minHeight={'200px'}
					placeholder="Your message..."
					focusBorderColor={'#9E9E9E'}
					border={`1px solid ${userMessageError ? '#D30000' : 'transparent'}`}
					resize="none"
					_placeholder={{
						color: userMessageError ? '#D30000' : '#9E9E9E',
					}}
				/>
			</FormControl>
			<SubmitButton variant={'accentAlt'} isSubmitting={isSubmitting}>
				Send
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
					I accepted the processing of personal data
				</Checkbox>
			</FormControl>
		</Flex>
	)
}

export default ContactForm
