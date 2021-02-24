function rupiahFormat(value, index, values) {
  if(parseInt(value) >= 1000){
    return 'Rp' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  } else if (parseInt(value) < 0) {
    return '-Rp' + (value*(-1))
  } else {
    return 'Rp' + value
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // chart - cash flow
  var ctxCashFlow = document.getElementById('chartCashFlow')
  var chartCashFlow = new Chart(ctxCashFlow, {
    type: 'line',
    data: {
      labels: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
      datasets: [{
        label: 'Inflow',
        data: [
          10000, 20000, 50000, 40000, 20000, 30000,
          30000, 50000, 20000, 30000, 20000, 10000,
        ],
        backgroundColor: 'rgba(54, 162, 235, .2)',
        borderColor: 'rgba(54, 162, 235, .5)',
        borderWidth: 1
      }, {
        label: 'Outflow',
        data: [
          -10000, -20000, -50000, -40000, 10000, 20000,
          50000, -50000, -20000, 20000, -20000, 30000,
        ],
        backgroundColor: 'rgba(255, 159, 64, .2)',
        borderColor: 'rgba(255, 159, 64, .5)',
        borderWidth: 1
      }, {
        label: 'Net Change',
        data: [
          100000,
          50000,
          100000,
          50000,
          10000,
          25000,
          0, 0, 0, 0, 0, 0
        ],
        backgroundColor: 'rgba(255, 99, 132, .2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: rupiahFormat
          }
        }]
      }
    }
  })

  // chart - profit loss
  var ctxProfitLoss = document.getElementById('chartProfitLoss')
  var chartProfitLoss = new Chart(ctxProfitLoss, {
    type: 'line',
    data: {
      labels: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
      datasets: [{
        label: 'Income',
        data: [
          10000, 20000, 50000, 40000, 20000, 30000,
          30000, 50000, 20000, 30000, 20000, 10000,
        ],
        backgroundColor: 'rgba(54, 162, 235, .2)',
        borderColor: 'rgba(54, 162, 235, .5)',
        borderWidth: 1
      }, {
        label: 'Expense',
        data: [
          0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0,
        ],
        backgroundColor: 'rgba(255, 159, 64, .2)',
        borderColor: 'rgba(255, 159, 64, .5)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: rupiahFormat
          }
        }]
      }
    }
  })

  // chart - Expense Breakdown
  var ctxExpenseBreakdown = document.getElementById('chartExpenseBreakdown')
  var chartExpenseBreakdown = new Chart(ctxExpenseBreakdown, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [
          10000,
          10000,
          10000,
          10000,
        ],
        backgroundColor: [
          'rgba(255, 159, 64, .2)',
          'rgba(54, 162, 235, .2)',
          'rgba(255, 99, 132, .2)',
          'rgba(120, 145, 255, .2)',
        ]
      }],
      labels: [
        'Rent Expense',
        'Repairs & Maintenance',
        'Transporation',
        'Other'
      ]
    },
    // options: {
    //   scales: {
    //     yAxes: [{
    //       ticks: {
    //         beginAtZero: true,
    //         callback: rupiahFormat
    //       }
    //     }]
    //   }
    // }
  })
})