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
                                <Link href="/">
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
                            <div className="flex justify-center mt-8 mb-7">
                                <button
                                    className="btn btn-warning"
                                    onClick={() =>
                                        document
                                            .getElementById("disclaimer")
                                            .showModal()
                                    }
                                >
                                    Dinámica de compra
                                </button>
                                <dialog
                                    id="disclaimer"
                                    className="modal modal-bottom sm:modal-middle"
                                >
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">
                                            Hola!
                                        </h3>
                                        <p className="py-4">
                                            Bienvenid@ a GarageSale; todos los
                                            productos que encontrarás aquí están
                                            en excelentes condiciones, si alguno
                                            tiene un detalle, estará descrito en
                                            la información del producto. Todos
                                            los artículos tienen al menos un 50%
                                            de descuento de su precio como
                                            nuevo; por lo que la dinámica de
                                            compra será la siguiente:
                                        </p>
                                        <ol className="list-decimal list-inside py-4">
                                            <li>
                                                Cada producto tiene un botón de
                                                "Comprar en WhatsApp", al hacer
                                                click en él, me llegará un
                                                mensaje via WhatsApp diciéndome
                                                que estás interesad@ en el
                                                producto. Piensa que estás
                                                agregando artículos a tu carrito
                                                de compras.
                                            </li>
                                            <li>
                                                Una vez que tengas todos los
                                                artículos que deseas en nuestro
                                                chat de WhatsApp, te daré el
                                                costo total y acordaremos la
                                                forma de entrega de los
                                                productos.
                                            </li>
                                            <li>
                                                El pago puede realizarse por
                                                transferencia antes de la
                                                entrega o en efectivo al momento
                                                de la entrega.
                                                <ul className="list-disc list-inside ml-4">
                                                    <li>
                                                        Para compras menores a
                                                        $400, los productos se
                                                        entregarán en Plaza
                                                        Triventi.
                                                    </li>
                                                    <li>
                                                        Para compras iguales o
                                                        mayores a $400, podemos
                                                        acordar la entrega en un
                                                        punto medio dentro de la
                                                        Zona de López Mateos Sur
                                                        (Plaza Triventi, Mega,
                                                        Costco, Walmart Palomar,
                                                        La Platza, Galerías
                                                        Santa Anita).
                                                    </li>
                                                </ul>
                                            </li>
                                        </ol>
                                        <p className="py-4">
                                            Listo! Puedes comenzar a disfrutar
                                            de tus productos. <p><strong>NOTA:</strong> Si tienes
                                            cualquier pregunta antes de hacer
                                            una compra, puedes hacer click en el
                                            botón de "Compra por Whatsapp" para
                                            iniciar un chat conmigo. Gracias por
                                            estar aquí!</p>
                                        </p>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-secondary">
                                                    Close
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {categories.map((category) => (
                                    <ProductCard
                                        Card
                                        key={category.id}
                                        product={category}
                                        message={"Ir a los productos"}
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
