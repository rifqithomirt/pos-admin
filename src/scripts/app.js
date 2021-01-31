import PerfectScrollbar from 'perfect-scrollbar'
const OverlayScrollbars = require('overlayscrollbars')

const debounce = function (func, wait, immediate) {
	var timeout
	return function() {
		var context = this, args = arguments
		var later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		};
		var callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}

const app = function (root) {
  // query for root element
  this.app = root
  this.mobileSidebarState = true

  // dom
  this.sidebarOverlay = undefined

  // init components
  this.initSidebarScrollbar = function () {
    const sidebar = document.querySelector(`${root} .sidebar .sidebar-wrapper .sidebar-menu-wrapper`)
    this.sidebarOverlay = new PerfectScrollbar(
      `${root} .sidebar .sidebar-wrapper .sidebar-menu-wrapper`, {
        wheelPropagation: false,
        swipeEasing: true
      }
    );
    window.addEventListener('resize', () => this.sidebarOverlay.update())
  }
  this.initSidebarMenu = function () {
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
  }
  this.initSidebar = function () {
    const sidebarItem = document.querySelector(`${root} li.item.active`)
    if (sidebarItem != null) sidebarItem.scrollIntoView({ 
      behavior: 'smooth' 
    })

    const dashboard = document.querySelector(`${root}`)
    const sidebar = document.querySelector(`${root} > .sidebar`)
    const overlaySidebar = document.querySelector(`${root} .overlay .sidebar`)
    const toggleSidebar = document.querySelectorAll('.toggle-sidebar')
    const $this = this
    toggleSidebar.forEach(function (el) {
      el.addEventListener('click', function (e) {
        $this.mobileSidebarState = !$this.mobileSidebarState
        if ($this.mobileSidebarState) {
          sidebar.animate([
            { opacity: 1 },
            { transform: 'translateX(0)' },
            { transform: 'translateX(-200px)' },
            { opacity: 0 },
          ], {
            easing: 'ease-in-out',
            duration: 250
          })
          setTimeout(() => dashboard.classList.remove('sidebar-mobile-show'), 200)
          overlaySidebar.style.opacity = 0;
          overlaySidebar.animate([
            { opacity: 1 },
            { opacity: 0 },
          ], {
            easing: 'ease-in',
            duration: 250
          })
          setTimeout(() => overlaySidebar.style.display = 'none', 250)
        } else {
          dashboard.classList.add('sidebar-mobile-show')
          sidebar.animate([
            { transform: 'translateX(-200px)' },
            { transform: 'translateX(0)' }
          ], {
            easing: 'ease-in-out',
            duration: 250
          })
          overlaySidebar.style.display = 'block'
          overlaySidebar.style.opacity = 1;
          overlaySidebar.animate([
            { opacity: 0 },
            { opacity: 1 },
          ], {
            easing: 'ease-in',
            duration: 250
          })
        }
      })
    })
  }
  this.initNavbar = function () {
    const onrezise = function(e) {
      const width = window.innerWidth
      const dashboard = document.querySelector(`${root}`)
      if (dashboard != null) {
        if (width < 1024) {
          dashboard.classList.add('navbar-mobile-show')
        } else {
          dashboard.classList.remove('navbar-mobile-show')
        }
      }
    }
    window.addEventListener('resize', onrezise)
    onrezise()
  }
  this.initFeatherIcon = function () {
    if (typeof feather == 'object') {
      feather.replace({
        class: 'fh'
      })
    }
  }
  this.initLoadingAnimation = function () {
    setTimeout(() => this.loading.hide(), 1000)
    const menuLink = document.querySelectorAll('.item a')
    menuLink.forEach((e) => e.addEventListener('click', async (item) => {
      item.preventDefault()
      const href = e.getAttribute('href')
      if (href != null && href != '#') {
        this.loading.show()
        await new Promise(resolve => setTimeout(resolve, 500))
        window.location.href = href
      }
    }))
  }
  this.initComponentPanel = function () {
    const panels = document.querySelectorAll('.panel')
    panels.forEach((panel) => {
      panel.addEventListener('click', function (e) {
        const link = panel.querySelector('.link')
        if (link != null) {
          link.click()
        }
      })
    })
  }

  // init all component
  this.init = function () {
    // sidebar - scrollbar
    this.initSidebarScrollbar()
    // sidebar - expand menu
    this.initSidebarMenu()
    // sidebar - auto scroll to menu
    this.initSidebar()
    // navbar
    this.initNavbar()
    // feather icon
    this.initFeatherIcon()
    // loading
    this.initLoadingAnimation()
    // component - panel
    this.initComponentPanel()
  }

  // loading
  this.loading = {
    show: () => {
      const overlayLoading = document.querySelector(`${root} .overlay .loading`)
      if (overlayLoading != null) {
        overlayLoading.style.display = 'flex'
        overlayLoading.animate([
          { opacity: 0 },
          { opacity: 1 }
        ], {
          duration: 250,
          easing: 'ease-in'
        })
      }
    },
    hide: () => {
      const overlayLoading = document.querySelector(`${root} .overlay .loading`)
      if (overlayLoading != null) {
        overlayLoading.animate([
          { opacity: 1 },
          { opacity: 0 }
        ], {
          duration: 250,
          easing: 'ease-in'
        })
        setTimeout(() => overlayLoading.style.display = 'none', 250)
      }
    },
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