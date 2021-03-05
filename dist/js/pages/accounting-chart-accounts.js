 // choice
 const initChoice = () => {
     const el = document.querySelector('#input-account-type')
     const eltype = new Choices(el, {
         itemSelectText: '',
     })
     eltype.setChoices(
         [{
                 label: 'Assets',
                 disabled: false,
                 choices: [{
                         value: 'Cash and Bank',
                         label: 'Cash and Bank'
                     },
                     {
                         value: 'Money in Transit',
                         label: 'Money in Transit'
                     },
                     {
                         value: 'Expected Payments from Customers',
                         label: 'Expected Payments from Customers'
                     },
                     {
                         value: 'Inventory',
                         label: 'Inventory'
                     },
                     {
                         value: 'Property, Plant, Equipment',
                         label: 'Property, Plant, Equipment'
                     },
                     {
                         value: 'Depreciation and Amortization',
                         label: 'Depreciation and Amortization'
                     },
                     {
                         value: 'Vendor Prepayments and Vendor Credits',
                         label: 'Vendor Prepayments and Vendor Credits'
                     },
                     {
                         value: 'Other Short-Term Asset',
                         label: 'Other Short-Term Asset'
                     },
                     {
                         value: 'Other Long-Term Asset',
                         label: 'Other Long-Term Asset'
                     },
                 ],
             },
             {
                 label: 'liabilities & Credit Cards',
                 disabled: false,
                 choices: [{
                         value: 'Credit Card',
                         label: 'Credit Card'
                     },
                     {
                         value: 'Loan and Line of Credit',
                         label: 'Loan and Line of Credit'
                     },
                     {
                         value: 'Expected Payments from Customers',
                         label: 'Expected Payments from Customers'
                     },
                     {
                         value: 'Due for Payroll',
                         label: 'Due for Payroll'
                     },
                     {
                         value: 'Due to You and Other Business owners',
                         label: 'Due to You and Other Business owners'
                     },
                     {
                         value: 'Customer Prepayments and Customer Credits',
                         label: 'Customer Prepayments and Customer Credits'
                     },
                     {
                         value: 'Other Short-Term Liability',
                         label: 'Other Short-Term Liability'
                     },
                     {
                         value: 'Other Long-Term Liability',
                         label: 'Other Long-Term Liability'
                     },
                 ],
             },
             {
                 label: 'Income',
                 disabled: false,
                 choices: [{
                         value: 'Income',
                         label: 'Income'
                     },
                     {
                         value: 'Discount',
                         label: 'Discount'
                     },
                     {
                         value: 'Other Income',
                         label: 'Other Income'
                     },
                 ],
             },
             {
                 label: 'Expenses',
                 disabled: false,
                 choices: [{
                         value: 'Operating Expense',
                         label: 'Operating Expense'
                     },
                     {
                         value: 'Cost of Goods Sold',
                         label: 'Cost of Goods Sold'
                     },
                     {
                         value: 'Payment Processing Fee',
                         label: 'Payment Processing Fee'
                     },
                     {
                         value: 'Payroll Expense',
                         label: 'Payroll Expense'
                     },
                 ],
             },
             {
                 label: 'Equity',
                 disabled: false,
                 choices: [{
                         value: 'Business owner Contribution and Drawing',
                         label: 'Business owner Contribution and Drawing'
                     },
                     {
                         value: 'Retained Earnings: Profit',
                         label: 'Retained Earnings: Profit'
                     },
                 ],
             },
         ]
     )
 }

 //custom Validation
 $.validator.addMethod("notEmpty", function (value, element) {
     return $(element).val() != null;
 }, "Please select type");

 //form-validation
 const initFormValidation = () => {
     $("#create-account").validate({
         ignore: [],
         rules: {
             "account-name": "required",
             "account-id": "required",
             "account-type": "notEmpty"

         },
         submitHandler: function (form) {
             let submitButton = $(form).find("button[type='submit']");
             let accountName = $(form).find("[name='account-name']");
             let accountType = $(form).find("[name='account-type']");
             let accountId = $(form).find("[name='account-id']");
             let accountDescription = $(form).find("[name='account-description']");
             let dataAccount = {
                 accountName: accountName.val(),
                 accountType: accountType.val(),
                 accountId: accountId.val(),
                 accountDescription: accountDescription.val()
             }
             showLoading(submitButton);
             fetch("/api/accounts/12983712", {
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
                     window.location = "./accounting-chart-accounts.html"
                 })
                 .catch(error => alert(error.toString()));
         }
     });
 }

 // init
 document.addEventListener('DOMContentLoaded', function () {
     initFormValidation()
     initChoice()
 })