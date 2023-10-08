import { faXmark } from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import {removerCartItem, increseQuantity, decreaseQuantity, resetItems} from '../../../Redux/index'
import IconBtn from '../../../Components/IconBtn'
import {removingFromCart, increasingQty, decreasingQty} from '../../../Redux/index'


const CartItem = ({cartItem}) => {

	const dispatch = useDispatch();
	const {token} = useSelector(state => state.cart);
	const [stockOut, setStockOut] = useState(false);

	// const totalAmoutOfItem = cartItem.quantity * cartItem.pricePerOneItem;
	const handleRemoveItem = (e) => {
		dispatch(removingFromCart(token,cartItem.id))
	}

	const handleIncrementQty = () =>{
		if(cartItem.stock_qty > cartItem.pivot.quantity){
			dispatch(increasingQty(token, cartItem.id))
		}else{
			setStockOut(true)
		}
	}

	const handleDecrementQty = () =>{
		setStockOut(false)
		if(cartItem.pivot.quantity > 1){
			dispatch(decreasingQty(token, cartItem.id))
		}else{
			dispatch(removingFromCart(token,cartItem.id))
		}	
	}



	return (
		<div className={`${stockOut ? 'border-red-600' : 'border-slate-400'} p-4 my-4 sm:h-[10rem] h-fit rounded-lg overflow-hidden flex flex-col sm:flex-row relative items-center justify-center border-[0.05rem]`}>

			<div className="min-w-[5rem] flex items-center justify-center me-4 bg-slate-800">
				<img 
				src="data:image/jpeg;base64,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" 
				alt=""
				className='h-full w-full object-center object-cover'
				/>
			</div>

			<div className="mb-4 font-bold md:hidden">
				<h3>{cartItem.name}</h3>
			</div>
			<div className="flex w-full">
				<div className="lg:w-[15rem] md:w-[10rem] flex flex-col justify-center text-lg hidden sm:block">
					<h3>{cartItem.name}</h3>
					<p className="text-slate-400 text-sm">{cartItem.product_code}</p>
				</div>
				<div className="col-span-1 flex-1 flex flex-col justify-center items-center">
					<div className="flex">
						<button 
							className="bg-slate-800 text-white w-8 h-8 hover:bg-slate-600" 
							onClick={handleIncrementQty}
						>
						+
						</button>
						<div className="w-12 text-center flex items-center justify-center">{cartItem.pivot.quantity}</div>
						<button 
							className="bg-slate-800 text-white w-8 h-8 hover:bg-slate-600"
							onClick={handleDecrementQty}
						>
						-
						</button>
					</div>
				</div>
				<div className="col-span-1 flex-1 flex flex-col justify-center items-end px-2">
					<p>{cartItem.price} MMK</p>
				</div>

				<div className="col-span-1 flex-1 flex flex-col justify-center items-end px-2 text-skin-secondary font-bold">
					<p>{cartItem.pivot.total_price} Ks</p>
				</div>

			</div>
			<div className="px-2 flex items-center absolute right-0 top-0 text-red-600">
				<button>
					<IconBtn 
						icon={faXmark}
						onClick={handleRemoveItem}
					/>
				</button>

			</div>
		</div>
	)
}

export default CartItem;