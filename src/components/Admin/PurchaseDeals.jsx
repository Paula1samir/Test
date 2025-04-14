import React from 'react'

export default function PurchaseDeals() {
    return (
        <>
            <div class="flex-grow-1">
                <div class="container py-4">
                    <h4 class="fw-semibold mb-4">Purchase Deals</h4>
                    <div class="table-responsive">
                        <table class="table align-middle" id="dealsTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>ADDRESS</th>
                                    <th>DATE</th>
                                    <th>Category</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>#6545</td><td>macbook pro</td><td>089 Kutch Green Apt. 448</td><td>04 Sep 2025</td><td>Electronics</td><td><span class="badge-status badge-purchased">purchased</span></td></tr>
                                <tr><td>#9645</td><td>perfume</td><td>979 Immanuel Ferry Suite 526</td><td>28 May 2025</td><td>Personal Care</td><td><span class="badge-status badge-pending">pending</span></td></tr>
                                <tr><td>#9554</td><td>blanket</td><td>8587 Frida Ports</td><td>23 Nov 2025</td><td>Bedding</td><td><span class="badge-status badge-cancelled">cancelled</span></td></tr>
                                <tr><td>#3547</td><td>headphone</td><td>768 Destiny Lake Suite 600</td><td>05 Feb 2025</td><td>Electronics</td><td><span class="badge-status badge-shipped">shipped</span></td></tr>
                                <tr><td>#3547</td><td>blusher huda beauty</td><td>042 Mylene Throughway</td><td>29 Jul 2025</td><td>Beauty</td><td><span class="badge-status badge-arrived">arrived</span></td></tr>
                                <tr><td>#6857</td><td>Wireless Earbuds</td><td>543 Weinman Mountain</td><td>15 Aug 2025</td><td>Electronics</td><td><span class="badge-status badge-purchased">purchased</span></td></tr>
                                <tr><td>#8957</td><td>red dress</td><td>New Scottieberg</td><td>21 Dec 2019</td><td>women fashion</td><td><span class="badge-status badge-purchased">purchased</span></td></tr>
                                <tr><td>#2435</td><td>vanish</td><td>New Jon</td><td>30 Apr 2025</td><td>laundry</td><td><span class="badge-status badge-pending">pending</span></td></tr>
                                <tr><td>#4526</td><td>black jacket</td><td>124 Lyle Forge Suite 975</td><td>09 Jan 2025</td><td>fashion</td><td><span class="badge-status badge-cancelled">cancelled</span></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
