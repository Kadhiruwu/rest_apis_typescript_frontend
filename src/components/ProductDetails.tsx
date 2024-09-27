import { deleteProduct } from "../services/ProductService"
import { Product } from "../types"
import { useNavigate, Form, ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"

type ProductDetailsProps = {
    product: Product
}
export async function action({ params}: ActionFunctionArgs){
    if(params.id !== undefined){
        await deleteProduct(+params.id)
        return redirect('/')
    }

}

export default function ProductDetails({product} : ProductDetailsProps) {
    const fetcher = useFetcher()
    const isAvailable = product.availability
    const navigate = useNavigate()

  return (
    <tr className="border-b text-center">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            ${product.price}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form method="POST">
                <button type="submit" name="id" value={product.id}
                className={`${isAvailable ? 'text-black font-bold' : 'text-red-500 font-bold'} rounded-lg p-2 text-sm w-full 
                border border-slate-400`}>
                    {isAvailable ? 'Disponible' : 'Agotado'}
                </button>
                
            </fetcher.Form>
            
        </td>
        <td className="p-3 text-lg text-gray-800 ">
           <div className="flex gap-2 items-center">
                <button onClick={() => navigate(`/products/${product.id}/edit`)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg w-full p-1 uppercase font-bold text-center">Editar</button>
                <Form className="w-full" method="POST" onSubmit={(e) => {
                    if(!confirm('¿Eliminar Productos?')){
                        e.preventDefault()
                    }
                }}
                action={`products/${product.id}/delete`}>
                    <input type="submit" value='Eliminar' className="bg-red-600 hover:bg-red-500 text-white rounded-lg w-full p-1 uppercase font-bold text-center cursor-pointer"/>
                
                </Form>
           </div>
        </td>
    </tr> 
  )
}
