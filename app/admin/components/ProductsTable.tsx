import { Product } from '@prisma/client'
import React from 'react'

function ProductsTable({products}: {products: Product[]}) {
  
    return (
        <div>
            {/* header */}
            <div>

            </div>

            {/* content */}
            {
                products.map((product) => {
                    return (
                        <div key={product.id}>
                            x
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProductsTable