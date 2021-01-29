import PerfectScrollbar from 'perfect-scrollbar'
const OverlayScrollbars = require('overlayscrollbars')

const app = function (root) {
  // query for root element
  this.app = root

  // dom
  this.sidebarOverlay = undefined

  // init all component
  this.init = function () {
    const sidebar = document.querySelector(`${root} .sidebar .sidebar-wrapper .sidebar-menu-wrapper`)
    this.sidebarOverlay = new PerfectScrollbar(`${root} .sidebar .sidebar-wrapper .sidebar-menu-wrapper`);
    // this.OverlayScrollbars = OverlayScrollbars(sidebar, overlayScrollbarOption)
    // sidebar.querySelector('.os-content-glue').remove()
    // this.OverlayScrollbars = OverlayScrollbars(sidebar, {
    //   // className: 'os-theme-minimal-dark',
    //   sizeAutoCapable: true,
    //   scrollbars: {
    //     visibility: 'auto',
    //     autoHide: 'leave',
    //     clickScrolling: true
    //   }
    // })
  }
}

function main () {
  // create instance
  const admin = new app('.dashboard')

  // init all component
  admin.init()

  // setTimeout(() => {
  //   window.location.reload()
  // }, 2000)
}

document.addEventListener("DOMContentLoaded", main)