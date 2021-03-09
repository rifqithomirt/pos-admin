// datatables
const initTable = () => {
    fetch("/api/products/", {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'text/plain'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

        })
        .then(handleAjaxErrors)
        .then(async response => {
            let message = await response.text()
            let objMessage = JSON.parse(message)
            let arrMessage = objMessage.message.map((row) => {
                return JSON.parse(row.doc)
            })

            $('#table-invoices').DataTable({
                responsive: true,
                autoWidth: false,
                order: [
                    [0, 'asc']
                ],
                columnDefs: [{
                    orderable: false,
                    targets: [3]
                }],
                columns: [{
                        title: '#',
                        data: null,
                        render: (data, type, row, meta) => meta.row + meta.settings._iDisplayStart + 1
                    },
                    {
                        title: 'Name',
                        data: 'productName'
                    },
                    {
                        title: 'Price',
                        data: 'productPrice',
                        render: (data) => `Rp${data}`
                    },
                    {
                        title: 'Actions',
                        data: null,
                        render: (data, type, row) => `
                <div>
                    <a href="sales-product-services-edit.html" class="btn btn-sm btn-outline-warning">
                        <i class="bi bi-pencil"></i>
                    </a>
                    <a class="btn btn-sm btn-outline-danger">
                        <i class="bi bi-trash"></i>
                    </a>
                </div>
                `
                    },
                ],
                data: arrMessage
            });
        })
        .catch(error => {
            console.log(error);
            alert(error.toString())
        });

}


// init
document.addEventListener('DOMContentLoaded', function () {
    initTable()
})