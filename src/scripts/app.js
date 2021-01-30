import PerfectScrollbar from 'perfect-scrollbar'
const OverlayScrollbars = require('overlayscrollbars')

const app = function (root) {
  // query for root element
  this.app = root

  // dom
  this.sidebarOverlay = undefined

  // init all component
  this.init = function () {
    // sidebar - scrollbar
    const sidebar = document.querySelector(`${root} .sidebar .sidebar-wrapper .sidebar-menu-wrapper`)
    this.sidebarOverlay = new PerfectScrollbar(
      `${root} .sidebar .sidebar-wrapper .sidebar-menu-wrapper`, {
        wheelPropagation: false,
        swipeEasing: true
      }
    );
    window.addEventListener('resize', () => this.sidebarOverlay.update())
    
    // sidebar - expand menu
    const sidebarDropdown = document.querySelectorAll(`${root} li.item.dropdown > .item a`)
    sidebarDropdown.forEach((item) => {
      item.addEventListener('click', (e) => {
        const container = item.parentElement.parentElement;
        const dropdownMenu = container.querySelector('.dropdown.menu')

        // remove all show
        sidebarDropdown.forEach((i) => i.classList.remove('show'))

        // toggle
        if (!container.classList.contains('show')) {
          container.classList.add('show')
          dropdownMenu.animate([
            { opacity: '0', transform: 'translateY(-30px)' },
            { opacity: '0.3', transform: 'translateY(-10px)' },
            { opacity: '1', transform: 'translateY(0px)' }
          ], {
            duration: 250,
            easing: 'ease-in-out'
          })
        } else {
          dropdownMenu.animate([
            { opacity: '1', transform: 'translateY(0px)' },
            { opacity: '0', transform: 'translateY(-30px)' }
          ], {
            duration: 250,
            easing: 'ease-in-out'
          })
          setTimeout(() => container.classList.remove('show'), 250)
        }

        // 
        e.preventDefault()
      })
    })
    // sidebar - auto scroll to menu
    const sidebarItem = document.querySelector(`${root} li.item.active`)
    if (sidebarItem != null) sidebarItem.scrollIntoView({ 
      behavior: 'smooth' 
    })


    // feather icon
    if (typeof feather == 'object') {
      feather.replace({
        class: 'fh'
      })
    }
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