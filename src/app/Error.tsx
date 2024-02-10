"use client";

export default function Error() {
    return (
        <section className="page_404 bg-white py-10 font-serif">
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="w-10/12 sm:w-8/12 text-center">
                        <div className="contant_box_404 mt-10">
                            <p>The page you are looking for is not available!</p>
                            <a href="/" className="link_404 inline-block py-2 px-4 bg-green-500 text-white rounded-lg mt-4">Go to Home</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
