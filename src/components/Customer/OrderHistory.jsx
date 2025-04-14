import React from 'react'

export default function OrderHistory() {
  return (
<>
<div class="d-flex">
        <div class="content">
            <h2>ORDER HISTORY</h2>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#FTR478</td>
                        <td class="status-pending">PENDING</td>
                        <td>Dec 18, 2020 17:32</td>
                        <td>GBP579.88 bulk</td>
                    </tr>
                    <tr>
                        <td>#FTR479</td>
                        <td class="status-purchased">PURCHASED</td>
                        <td>Dec 18, 2020 17:32</td>
                        <td>GBP579.88 bulk</td>
                    </tr>
                    <tr>
                        <td>#FTR480</td>
                        <td class="status-cancelled">CANCELLED</td>
                        <td>Jan 5, 2021 12:42</td>
                        <td>GBP579.88 bulk</td>
                    </tr>
                    <tr>
                        <td>#FTR481</td>
                        <td class="status-arrived">ARRIVED</td>
                        <td class="status-arrived">Feb 8, 2021 09:00</td>
                        <td>GBP579.88 bulk</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</>  )
}
