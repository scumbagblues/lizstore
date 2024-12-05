import { Head, Link } from '@inertiajs/react';
import ProductCard from '@/Components/ProductCard';

export default function Product({ company, products }) {

    return (
        <>
            <Head title="Productos" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
               
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <img
                                    id="logo"
                                    width="165"
                                    height="35"
                                    className='rounded-xl'
                                    src="/images/GarageSale.png"
                                />
                            </div>
                        </header>

                        <main className="mt-6">
                        {products.length === 0 ? (
                                <div className="text-center text-lg text-gray-700 dark:text-gray-300">
                                    No hay productos disponibles.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            message={'Ir a detalle de producto'}
                                            imgPath={product.image1}
                                            link={`/product/detail/${product.id}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            {company}
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
