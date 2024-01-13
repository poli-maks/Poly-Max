import emailjs from 'emailjs-com'

interface IEmailData {
	name?: string
	phone?: string
}

interface IEmailjsRes {
	status: number
	text: string
}

emailjs.init(process.env.NEXT_PUBLIC_EMAIL_JS_USER_ID as string)

const sendEmail = async (data: IEmailData): Promise<IEmailjsRes | undefined> => {
	const { name, phone } = data
	const emailData = {
		subject: `${name}`,
		from_name: `${name}`,
		message: `
    🙂 Name: ${name}
    📞 Phone: ${phone}
    `,
	}

	try {
		const res = await emailjs.send(
			process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID as string,
			process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID as string,
			emailData
		)

		return res
	} catch (error) {
		console.error('Error sending email:', error)
	}
}

export default sendEmail
