'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { MdDone } from "react-icons/md"

import Link from 'next/link'
import { useState, useEffect } from 'react'

import Button from '@/components/Button'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from "react-hook-form"
import { FormValidation, NewsletterSchema } from '@/lib/validations/Newsletter'

import { submitNewsletterForm } from '@/lib/actions/formspree.actions'

function Newsletter() {
	const [isSubmitSuccesfull, setIsSubmitSuccesfull] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<FormValidation>({
		resolver: zodResolver(NewsletterSchema),
		defaultValues: {
			email: '',
		}
	});

	const processSubmit: SubmitHandler<FormValidation> = async (data) => {
		setIsSubmitting(true)

		// Timeout for TESTING ->
		// const promise = new Promise((resolve) => {
		// 	setTimeout(()=>{
		// 		resolve()
		// 	},2000)
		// })

		// await promise

		const isSubmitted = await submitNewsletterForm(data)
		setIsSubmitSuccesfull(isSubmitted)

		//If submit successfull reset isSubmitSuccessfull after {timeout}, if no - show alert
		if(isSubmitted){
			reset()
			setTimeout(()=>(
				setIsSubmitSuccesfull(false)
			),3000)
		} else {
			alert('Oops, coś poszło nie tak, skontaktuj się z nami przez maila: kupazsklep@gmail.com')
		}

		setIsSubmitting(false)
	}
	return (
		<form 
			className='
				p-6 lg:p-8 
				bg-white 
				rounded-2xl
				flex flex-col gap-4
				text-center lg:text-left
			'
			onSubmit={handleSubmit(processSubmit)}
		>
			<p className='text-[1.5rem]'>Chcę zniżkę !</p>
			<p>Subskrybując nasz newsletter masz szansę otrzymać zniżkę aż do -30%. Zniżki wysyłane są losowo</p>
			<input 
				className='bg-gray-100 rounded-2xl p-4' 
				placeholder='Email'
				type="email"
				{...register('email')}
			/>
			{errors?.email?.message && <p className='text-sm text-alert'>{errors.email?.message}</p>}
			<div className='flex justify-center items-center lg:justify-start'>
				<Button
					disabled={isSubmitSuccesfull || isSubmitting}
					appearance='fill' 
					className={`
						${isSubmitSuccesfull && `bg-success`}
						w-full lg:w-fit
						disabled:!opacity-100
					`}
				>
					<AnimatePresence mode='popLayout'>
						{isSubmitSuccesfull ?
							<motion.span
								className='flex items-center gap-2'
								key='done'
								initial={{
									opacity: 0,
									y:100
								}}
								animate={{
									opacity: 1,
									y:0
								}}
								exit={{
									opacity: 0,
									y:-100
								}}
							>
								<span><MdDone className='text-[1.25rem]'/></span>
								Udało się !
							</motion.span>
							:
							<motion.span
								key='send'
								initial={{
									opacity: 0,
									y:100
								}}
								animate={{
									opacity: 1,
									y:0
								}}
								exit={{
									opacity: 0,
									y:-100
								}}
							>	
								<AnimatePresence mode='popLayout'>
									{isSubmitting ?
										<motion.span
											key='submitting'
											className='flex gap-2 items-center'
											initial={{
												opacity: 0,
												y: 100
											}}
											animate={{
												opacity: 1,
												y: 0
											}}
											exit={{
												opacity: 0,
												y: -100
											}}
										>
											<span className='animate-spin'><AiOutlineLoading3Quarters className='text-[1.25rem]'/></span>
											Wysyłanie...
										</motion.span>
										:
										<motion.span
											key='idle'
											initial={{
												opacity: 0,
												y: 100
											}}
											animate={{
												opacity: 1,
												y: 0
											}}
											exit={{
												opacity: 0,
												y: -100
											}}
										>
											Wysyłam
										</motion.span>
									}
								</AnimatePresence>
							</motion.span>
						}
					</AnimatePresence>
				</Button>
			</div>
			<p className='text-gray-400 text-sm'>Klikając przycisk zgadzasz się z regulaminem sklepu oraz polityką prywatności</p>
		</form>
	)
}

export default Newsletter