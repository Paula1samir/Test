import React from 'react'

export default function LivePurchase() {
    return (
        <>
            <div className="p-4" style={{width: "-webkit-fill-available"}}>
                <h5 className="mb-4">Purchase deals that has started from your products</h5>
                <div className="row g-4">
                    {/* Product Card */}
                    <div className="col-md-3">
                        <div className="product-card">
                            <img src="./images/1634584510_1668191.webp" className="img-fluid" alt="Product" />
                            <div className="product-name">2020 Apple MacBook Pro</div>
                            <div className="contributors">8 out of 12 Contributors</div>
                            <div className="price">EGP4900</div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="product-card">
                            <img src="./images/Imagee.png" className="img-fluid" alt="Product" />
                            <div className="product-name">TOZO T6 True keyboard</div>
                            <div className="contributors">6 out of 12 Contributors</div>
                            <div className="price">EGP400</div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="product-card">
                            <img src="./images/Image.png" className="img-fluid" alt="Product" />
                            <div className="product-name">Wireless On Ear Headphones</div>
                            <div className="contributors">4 out of 12 Contributors</div>
                            <div className="price">EGP300</div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="product-card">
                            <img src="./images/Image (1).png" className="img-fluid" alt="Product" />
                            <div className="product-name">Amazon Basics High–Speed</div>
                            <div className="contributors">6 out of 12 Contributors</div>
                            <div className="price">EGP5,000</div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="product-card">
                            <img src="./images/Image (2).png" className="img-fluid" alt="Product" />
                            <div className="product-name">Camera</div>
                            <div className="contributors">2 out of 12 Contributors</div>
                            <div className="price">EGP400</div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
