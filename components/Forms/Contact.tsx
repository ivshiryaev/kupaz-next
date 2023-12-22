import React from 'react'

import Button from '@/components/Button'

function Contact() {
	return (
		<form className='
			p-6 lg:p-8
			bg-white 
			rounded-2xl
			flex flex-col gap-4
			justify-center
			flex-1
		'>
			<p className='text-[1.5rem]'>Skontaktuj się</p>
			<input className='bg-gray-100 rounded-2xl p-4' placeholder='Imie' type="text"/>
			<textarea className='bg-gray-100 rounded-2xl p-4' placeholder='Opis' rows={6}/>
			<Button appearance='fill' className='w-fit'>Wysyłam</Button>
			<p className='text-gray-400 text-sm'>Klikając przycisk zgadzasz się z regulaminem sklepu oraz polityką prywatności</p>
		</form>
	)
}

export default Contact