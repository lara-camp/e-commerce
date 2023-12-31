import IconBtn from './IconBtn'
import {useState, useEffect} from 'react'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'

const Card = ({cardData}) => {

	const [isMouseEnter, setIsMouseEnter] = useState(false);

	return (
		<div className="mx-4">

			<div className="card min-h-[25rem] min-w-[20rem] lg:w-[20rem] shadow-lg bg-white">
				<div 
				className="img flex items-center justify-center h-[20rem] overflow-hidden cursor-pointer relative"
				onMouseEnter = {() => setIsMouseEnter(true)}
				onMouseLeave = {() => setIsMouseEnter(false)}
				>
					{isMouseEnter && (
						<div className="absolute top-0 left-0 w-full h-full">
							<div className="flex items-center justify-center h-full bg-slate-900/20">
									<Link to={`/pos/products/prodxts_${cardData.product_code}`}>
										<button 
											className="bg-white border-2 border-slate-600 px-10 py-1 hover:bg-slate-900 hover:text-white"
										>
										View Item
										</button>
									</Link>
							</div>

						</div>
					)}
					<img 
						src={cardData.image} alt=""
						className='h-full w-full object-cover object-center'
					/>
				</div> 
				<div className="content  flex items-center justify-center flex-col w-full h-[5rem] text-slate-600">
					<h3 className="text-center font-bold mb-2 text-xl text-slate-700">{cardData.name}</h3>

					<div className='flex justify-center items-center w-full text-slate-600 px-4'>
						<p>
							Price - {cardData.price} Ks
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card;