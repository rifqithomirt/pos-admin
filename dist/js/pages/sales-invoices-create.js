// choice
const initChoice = (index) => {
    const choose = new Choices('.body-invoices tr:nth-child(' + index + ') .choices')

    choose.setChoices(async () => {
        try {
            let response = await fetch('/api/products/')
            let message = await response.text()
            let objMessage = JSON.parse(message)
            let arrMessage = objMessage.message.map((row) => {
                return JSON.parse(row.doc)
            })
            return arrMessage.map((row) => {
                return {
                    value: row.productName,
                    label: row.productName,
                    className: row.productPrice
                }
            })
        } catch (err) {
            console.error(err);
        }
    });

    choose.passedElement.element.addEventListener('choice',
        (event) => {
            let parentElement = event.target.parentNode
            let selectedElement = $(parentElement).innerHTML
            console.log( selectedElement )
        },
        false,
    );
}
// datepicker
const initDatepicker = () => {
    const els = document.querySelectorAll('.datepicker')
    els.forEach((el) => new Pikaday({
        field: el,
        format: 'DD-MM-YYYY',
        toString(date, format) {
            // you should do formatting based on the passed format,
            // but we will just return 'D/M/YYYY' for simplicity
            const day = ('0' + date.getDate()).slice(-2);
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        },
    }))
}

// 
const AddItem = () => {
    const table = document.querySelector('table tbody')
    const index = $('.body-invoices tr').length + 1

    //console.log(table.childNodes[(table.childNodes.length - 2)].dataset)

    const html = `
        <td></td>
        <td>
            <select name="item[0]" class="choices choice-item">
            </select>
        </td>
        <td>
            <input type="number" name="quantity[0]" class="form-control" value="1">
        </td>
        <td>
            <input type="number" name="price[0]" class="form-control" value="1000">
        </td>
        <td class="text-end">
            Rp1.000
        </td>
        <td class="text-center">
            <a href="btn btn-link btn-link-danger">
                <i class="bi bi-trash"></i>
            </a>
        </td>
    `
    const tr = document.createElement('tr')
    tr.innerHTML = html
    table.append(tr)
    initChoice(index)

}
const initAction = () => {
    const el = document.querySelector('#add-item')
    el.addEventListener('click', AddItem)
}

const initLogoUploader = () => {
    const el = document.querySelector('.logo-box-upload')
    const input = el.querySelector('input[type=file]')
    const actions = document.querySelector('.logo-box-upload-actions')
    const removeBtn = document.querySelector('.remove-logo-btn')
    const preview = el.querySelector('.preview img')
    preview.style.display = 'none'
    const updateFile = (e) => {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                preview.setAttribute('src', e.target.result)
            }
            reader.readAsDataURL(input.files[0]);
            actions.style.display = 'inline-block'
            preview.style.display = 'block'
        } else {
            actions.style.display = 'none'
            preview.setAttribute('src', '')
            preview.style.display = 'none'
        }
    }
    actions.style.display = 'none'
    el.addEventListener('click', function (e) {
        input.click()
    })
    input.addEventListener('change', updateFile)
    removeBtn.addEventListener('click', function (e) {
        input.value = '';
        updateFile(input)
    })
}

// init
document.addEventListener('DOMContentLoaded', function () {
    initLogoUploader()
    initChoice(1)
    initDatepicker()
    initAction()
})