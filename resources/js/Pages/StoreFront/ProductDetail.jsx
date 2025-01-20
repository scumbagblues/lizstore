import { Head, Link } from '@inertiajs/react';

export default function ProductDetail({ company, product }) {
    const images = [
        product.image1,
        product.image2,
        product.image3,
        product.image4,
        product.image5,
    ].filter(Boolean); // Filtrar imágenes no nulas

    const defaultImage = '/images/noproduct.jpg';
    const displayImages = images.length > 0 ? images : [defaultImage];

    // Crear la URL del producto
    const celNumber = '523312975542';
    const productUrl = `${window.location.origin}/product/detail/${product.id}`;
    const urlencodedtext = encodeURIComponent(`Estoy interesado en este producto: ${product.name}. Puedes verlo aquí: ${productUrl}`);

    return (
        <>
            <Head title="Detalle de Producto" />
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
                                        alt="Garage Sale"
                                    />
                                </Link>
                            </div>
                        </header>

                        <main className="mt-6">
                            <section className="container mx-auto mt-12 mb-4">
                                <div className="hero min-h-[30rem] bg-base-100 rounded-xl">
                                    <div className="hero-content text-center">
                                        <div className="max-w-4xl">
                                            <div className="carousel w-72 h-72">
                                                {displayImages.map((image, index) => (
                                                    <div key={index} id={`item${index + 1}`} className="carousel-item w-72">
                                                        <img src={`/storage/${image}`} className="w-72" alt={`Product Image ${index + 1}`} />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex w-full justify-center gap-2 py-2">
                                                {displayImages.map((_, index) => (
                                                    <a key={index} href={`#item${index + 1}`} className="btn btn-xs">
                                                        {index + 1}
                                                    </a>
                                                ))}
                                            </div>
                                            <p className="py-6 text-xl md:text-2xl">
                                                <strong>${product.price}</strong>
                                            </p>
                                            <p className="py-6 text-xl md:text-2xl">
                                                {product.description}
                                            </p>
                                        
                                            <a
                                                aria-label="Chat on WhatsApp"
                                                href={`https://wa.me/${celNumber}?text=${urlencodedtext}`}
                                                className="btn btn-secondary flex items-center justify-center"
                                            >
                                                <img
                                                    alt="Chat on WhatsApp"
                                                    src="/images/whatsapp.png"
                                                    className="w-6 h-6 mr-2"
                                                />
                                                Comprar en WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </section>
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