import React from 'react'

export default function Reports() {
    return (
        <>
            <div className="row p-4 gy-4">
                <div className="col-md-3">
                    <div className="card-box">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6>Total User</h6>
                                <h4>40,689</h4>
                                <small className="text-success">↑ 8.5% Up from yesterday</small>
                            </div>
                            <div className="icon-box bg-light-purple">
                                <i className="bi bi-person-fill text-primary fs-4"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card-box">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6>Total Order</h6>
                                <h4>10,293</h4>
                                <small className="text-success">↑ 1.3% Up from past week</small>
                            </div>
                            <div className="icon-box bg-light-warning">
                                <i className="bi bi-box-fill text-warning fs-4"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card-box">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6>Total Sales</h6>
                                <h4>EGP89,000</h4>
                                <small className="text-danger">↓ 4.3% Down from yesterday</small>
                            </div>
                            <div className="icon-box bg-light-success">
                                <i className="bi bi-graph-up-arrow text-success fs-4"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card-box">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6>Total Pending</h6>
                                <h4>2,040</h4>
                                <small className="text-success">↑ 1.8% Up from yesterday</small>
                            </div>
                            <div className="icon-box bg-light-danger">
                                <i className="bi bi-clock-history text-danger fs-4"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>)
}
