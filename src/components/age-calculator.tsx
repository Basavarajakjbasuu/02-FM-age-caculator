import arrowDown from '../assets/images/icon-arrow.svg';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

interface AgeCalculator {
	day: number;
	month: number;
	year: number;
}

const schema = z.object({
	day: z
		.number({
			required_error: 'This field is required',
			invalid_type_error: 'This field is required',
		})
		.gte(1, { message: 'Must be a valid day' })
		.lte(31, { message: 'Must be a valid day' }),
	month: z
		.number({
			required_error: 'This field is required',
			invalid_type_error: 'This field is required',
		})
		.gte(1, { message: 'Must be a valid month' })
		.lte(12, { message: 'Must be a valid month' }),
	year: z
		.number({
			required_error: 'This field is required',
			invalid_type_error: 'This field is required',
		})
		.gte(1900, { message: 'Must be a valid year' })
		.lte(new Date().getFullYear(), { message: 'Must be a valid year' }),
});

const AgeCalculator = () => {
	const [age, setAge] = useState<AgeCalculator | null>(null);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<AgeCalculator>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: AgeCalculator) => {
		const today = new Date();
		const dob = new Date(+data.year, +data.month - 1, +data.day);

		// difference in milliseconds
		const diff = today.getTime() - dob.getTime();

		// converting milliseconds into years
		const years = Math.floor(diff / 31556736000);
		//1 day has 86400000 milliseconds
		const days_diff = Math.floor((diff % 31556736000) / 86400000);
		const months = Math.floor(days_diff / 30.4167);
		const days = Math.floor(days_diff % 30.4167);

		setAge({
			day: days,
			month: months,
			year: years,
		});
	};
	return (
		<div className="flex items-center justify-center h-full shadow">
			<div className="bg-white md:w-[600px] md:h-[450px] rounded-2xl md:rounded-br-[170px] rounded-br-[100px] md:p-10 p-6">
				{/* dob data collect */}
				<form onSubmit={handleSubmit(onSubmit)}>
					<ul className="flex justify-between md:justify-start md:items-start gap-x-1 md:gap-x-6">
						<li>
							<span
								className={`text-xs font-bold tracking-widest text-Smokey-grey ${
									errors.day ? 'text-red-500' : 'text-Smokey-grey'
								}`}>
								DAY
							</span>
							<input
								type="number"
								placeholder="DD"
								{...register('day', {
									valueAsNumber: true,
								})}
								id="day"
								className={`w-20 md:w-32 remove-arrow md:p-3 p-2 focus:outline-none border-2 rounded mt-2 font-bold text-xl  ${
									errors.day ? 'border-red-500' : 'focus-within:border-gray-700'
								}`}
							/>
							{errors.day && (
								<p className="text-xs mt-1 text-red-500">
									{errors.day?.message}
								</p>
							)}
						</li>

						<li>
							<span
								className={`text-xs font-bold tracking-widest text-Smokey-grey ${
									errors.month ? 'text-red-500' : 'text-Smokey-grey'
								}`}>
								MONTH
							</span>
							<input
								type="number"
								placeholder="MM"
								{...register('month', {
									valueAsNumber: true,
								})}
								id="month"
								className={`w-20 remove-arrow md:w-32 md:p-3 p-2 focus:outline-none border-2 rounded mt-2 font-bold text-lg md:text-xl  focus-within:border-gray-700 ${
									errors.month ? 'border-red-500' : ''
								}`}
							/>
							{errors.month && (
								<p className="text-xs mt-1 text-red-500">
									{errors.month?.message}
								</p>
							)}
						</li>

						<li>
							<span
								className={`text-xs  font-bold tracking-widest  ${
									errors.year ? 'text-red-500' : 'text-Smokey-grey'
								}`}>
								YEAR
							</span>
							<input
								type="number"
								placeholder="YYYY"
								{...register('year', {
									valueAsNumber: true,
								})}
								id="day"
								className={`w-20 md:w-32 remove-arrow md:p-3 p-2 focus:outline-none border-2 rounded mt-2 font-bold text-xl focus-within:border-gray-700 ${
									errors.year ? 'border-red-500' : ''
								}`}
							/>
							{errors.year && (
								<p className="text-xs mt-1 text-red-500">
									{errors.year?.message}
								</p>
							)}
						</li>
					</ul>

					{/* divider */}

					<div className="md:my-6 my-16 relative">
						<hr className="border-b-gray-300" />

						<button className="bg-purple-600 hover:bg-black transition-colors duration-300 rounded-full p-3 w-14 h-14 absolute right-[40%]   md:right-0 -bottom-7">
							<img
								src={arrowDown}
								alt=""
							/>
						</button>
					</div>
				</form>

				{/* Result */}

				<div className="">
					<h1 className="text-4xl md:text-7xl font-bold">
						<span className="inline text-purple-600">
							{age?.year ? age?.year : '- -'}
						</span>{' '}
						years
					</h1>
					<h1 className="text-4xl md:text-7xl font-bold">
						<span className="inline text-purple-600">
							{age?.month == 0 ? '00' : age?.month ? age.month : '- -'}
						</span>{' '}
						months
					</h1>
					<h1 className="text-4xl md:text-7xl font-bold">
						<span className="inline text-purple-600">
							{age?.day == 0 ? '00' : age?.day ? age.day : '- -'}
						</span>{' '}
						days
					</h1>
				</div>
			</div>
		</div>
	);
};

export default AgeCalculator;
