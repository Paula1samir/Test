import React from 'react'
import './SuppDashboard.css'
import { Link } from 'react-router-dom'
import SuppDashboard from './SuppDashboard'
export default function EditProduct() {
    return (
        <>

        <div className="container-fluid">
            <div className="row">


                    {/* Main Content */}
                    <div className="col-md-10 " style={{width: "-webkit-fill-available"}}>

                        {/* Table Section */}
                        <div className="p-4">
                            <div className="table-section">
                                <h5 className="mb-4">Edit Or Delete Product</h5>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Product Name</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                                <th>Bulk Pieces</th>
                                                <th>Bulk Price</th>
                                                <th>Pieces</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><img src="./images/Bitmap.png" className="product-img" alt="" /></td>
                                                <td>Apple Watch Series 4</td>
                                                <td>Electronics</td>
                                                <td>EGP690.00</td>
                                                <td>12</td>
                                                <td>EGP11,520</td>
                                                <td>63</td>
                                                <td className="action-icons">
                                                    <i className="bi bi-pencil-square edit me-2"></i>
                                                    <i className="bi bi-trash delete"></i>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><img src="./images/Bitmap (1).png" className="product-img" alt="" /></td>
                                                <td>Microsoft Headsquare</td>
                                                <td>Electronics</td>
                                                <td>EGP190.00</td>
                                                <td>12</td>
                                                <td>EGP2,280</td>
                                                <td>13</td>
                                                <td className="action-icons">
                                                    <i className="bi bi-pencil-square edit me-2"></i>
                                                    <i className="bi bi-trash delete"></i>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><img src="./images/Bitmap (2).png" className="product-img" alt="" /></td>
                                                <td>Samsung A50</td>
                                                <td>Electronics</td>
                                                <td>EGP400.00</td>
                                                <td>12</td>
                                                <td>EGP4,800</td>
                                                <td>67</td>
                                                <td className="action-icons">
                                                    <i className="bi bi-pencil-square edit me-2"></i>
                                                    <i className="bi bi-trash delete"></i>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><img src="./images/Bitmap (3).png" className="product-img" alt="" /></td>
                                                <td>Camera</td>
                                                <td>Electronics</td>
                                                <td>EGP420.00</td>
                                                <td>12</td>
                                                <td>EGP5,040</td>
                                                <td>52</td>
                                                <td className="action-icons">
                                                    <i className="bi bi-pencil-square edit me-2"></i>
                                                    <i className="bi bi-trash delete"></i>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><img src="./images/Bitmap (4).png" className="product-img" alt="" /></td>
                                                <td>Microsoft Headsquare</td>
                                                <td>Electronics</td>
                                                <td>EGP190.00</td>
                                                <td>12</td>
                                                <td>EGP2,280</td>
                                                <td>13</td>
                                                <td className="action-icons">
                                                    <i className="bi bi-pencil-square edit me-2"></i>
                                                    <i className="bi bi-trash delete"></i>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
