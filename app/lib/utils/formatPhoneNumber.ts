export const formatPhoneNumber = (rawNumber: string): string => {
	const countryCode = rawNumber.slice(0, 2)
	const firstPart = rawNumber.slice(2, 5)
	const secondPart = rawNumber.slice(5, 8)
	const thirdPart = rawNumber.slice(8, 10)
	const fourthPart = rawNumber.slice(10)

	return `Tel.: +${countryCode}(${firstPart})${secondPart}-${thirdPart}-${fourthPart}`
}
