// choice
const initChoice = () => {
    const el = document.querySelector('#input-tax')
    const a = new Choices(el, {
        removeItemButton: true
    })
    const els = document.querySelectorAll('.choices.choice-default')
    els.forEach(function (el) {
        new Choices(el)
    })
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
// action
const initActions = () => {
    const elFormGroupIncome = document.querySelector('#form-group-income-account')
    const elFormGroupExpense = document.querySelector('#form-group-expense-account')
    const elInputIncome = document.querySelector('#input-income-account')
    const elInputExpense = document.querySelector('#input-expense-account')
    const eventInputCheckIncome = () => elFormGroupIncome.style.display = elInputIncome.checked ? 'flex' : 'none'
    const eventInputCheckExpense = () => elFormGroupExpense.style.display = elInputExpense.checked ? 'flex' : 'none'

    // add eventListnner
    elInputIncome.addEventListener('click', eventInputCheckIncome)
    elInputExpense.addEventListener('click', eventInputCheckExpense)

    // on mounted
    eventInputCheckIncome()
    eventInputCheckExpense()
}
//form-validation
const initFormValidation = () => {
    $("#create-product").validate({
        ignore: [],
        rules: {
            "name": "required",
            "description": "required",
            "price": "required"
        },
        submitHandler: function (form) {
            let submitButton = $(form).find("button[type='submit']");
            let productName = $(form).find("[name='name']");
            let productDescription = $(form).find("[name='description']");
            let productPrice = $(form).find("[name='price']");
            let productCategorySell = $(form).find("[name='category-sell']");
            let dataAccount = {
                productName: productName.val(),
                productDescription: productDescription.val(),
                productPrice: productPrice.val(),
                productCategorySell: productCategorySell.val()
            }
            showLoading(submitButton);
            let tid = uuidv1();
            fetch("/api/products/" + tid, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify(dataAccount) // body data type must match "Content-Type" header
                })
                .then(handleAjaxErrors)
                .then(response => {
                    hideLoading(submitButton)
                    console.log("ok")
                    window.location = "./sales-product-services.html"
                })
                .catch(error => alert(error.toString()));
        }
    });
}

// init
document.addEventListener('DOMContentLoaded', function () {
    initChoice()
    initDatepicker()
    initActions()
    initFormValidation()
})