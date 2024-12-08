import { Head, Link } from '@inertiajs/react';
import ProductCard from '@/Components/ProductCard';


export default function Welcome({ auth, company,categories }) {

    return (
        <>
            <Head title="Garage Sales" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
               
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <Link href='/'>
                                <img
                                    id="logo"
                                    width="165"
                                    height="35"
                                    className="rounded-xl"
                                    src="/images/GarageSale.png"
                                />
                                </Link>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <></>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {categories.map((category) => (
                                    <ProductCard
                                    Card key={category.id} 
                                        product={category} 
                                        message={'Ir a los productos'}
                                        imgPath={category.path_category_img}
                                        link={`/products/category/${category.id}`}
                                    />
                                ))}
                            </div>
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
