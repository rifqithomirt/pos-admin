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

const sleep = (time) => new Promise(resolve => setTimeout(resolve, time))

const app = function (root) {
  // query for root element
  this.app = root
  this.mobileSidebarState = true
  this.mobileSidebarMenuState = true

  // dom
  this.sidebarOverlay = undefined

  // init components
  this.initSidebarScrollbar = function () {
    const sidebar = `${root} .sidebar .sidebar-wrapper .sidebar-menu-wrapper`
    if (document.querySelector(sidebar) != null) {
      this.sidebarOverlay = new PerfectScrollbar(
        sidebar, {
          wheelPropagation: false,
          swipeEasing: true
        }
      );
      window.addEventListener('resize', () => this.sidebarOverlay.update())
    }
  }
  this.initSidebarMenu = function () {
    const sidebarDropdown = document.querySelectorAll(`${root} li.item.dropdown:not(.active) > .item:not(.active) a`)
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

    const sidebarDropdownActive = document.querySelector(`${root} .sidebar .dropdown.menu .active`)
    if (sidebarDropdownActive != null)  {
      const parent = sidebarDropdownActive.parentElement.parentElement.parentElement
      if (!parent.classList.contains('active')) parent.classList.add('active')
    }
  }
  this.initSidebar = function () {
    const sidebarItem = document.querySelector(`${root} .item .menu li.item.active`)
    if (sidebarItem != null) {
      const wrapper = document.querySelector(`${root} .sidebar-menu-wrapper`)
      // wrapper.scrollTop = 0
      // sidebarItem.offsetTop
      wrapper.scroll({ top: sidebarItem.offsetTop, behavior: 'smooth' });
    }

    const dashboard = document.querySelector(`${root}`)
    const sidebar = document.querySelector(`${root} > .sidebar`)
    const sidebarMenu = document.querySelector(`${root} > .sidebar-menu`)
    const overlaySidebar = document.querySelector(`${root} .overlay .sidebar`)
    const toggleSidebar = document.querySelectorAll('.toggle-sidebar')
    const overlaySidebarMenu = document.querySelector(`${root} .overlay .sidebar-menu`)
    const toggleSidebarMenu = document.querySelectorAll('.toggle-sidebar-menu')
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
    toggleSidebarMenu.forEach(function (el) {
      el.addEventListener('click', function (e) {
        $this.mobileSidebarMenuState = !$this.mobileSidebarMenuState
        if ($this.mobileSidebarMenuState) {
          sidebarMenu.animate([
            { opacity: 1 },
            { transform: 'translateX(0)' },
            { transform: 'translateX(-200px)' },
            { opacity: 0 },
          ], {
            easing: 'ease-in-out',
            duration: 250
          })
          setTimeout(() => dashboard.classList.remove('sidebar-menu-mobile-show'), 200)
          overlaySidebarMenu.style.opacity = 0;
          overlaySidebarMenu.animate([
            { opacity: 1 },
            { opacity: 0 },
          ], {
            easing: 'ease-in',
            duration: 250
          })
          setTimeout(() => overlaySidebarMenu.style.display = 'none', 250)
        } else {
          dashboard.classList.add('sidebar-menu-mobile-show')
          sidebarMenu.animate([
            { transform: 'translateX(-200px)' },
            { transform: 'translateX(0)' }
          ], {
            easing: 'ease-in-out',
            duration: 250
          })
          overlaySidebarMenu.style.display = 'block'
          overlaySidebarMenu.style.opacity = 1;
          overlaySidebarMenu.animate([
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
    const menuLink = document.querySelectorAll('a')
    menuLink.forEach((e) => e.addEventListener('click', async (item) => {
      item.preventDefault()
      const href = e.getAttribute('href')
      if (href != null && href != '#') {
        this.loading.show()
        await sleep(500)
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
  this.init = async function () {
    // sidebar - scrollbar
    this.initSidebarScrollbar()
    // sidebar - expand menu
    this.initSidebarMenu()
    await sleep(100)
    // navbar
    this.initNavbar()
    // feather icon
    this.initFeatherIcon()
    // loading
    this.initLoadingAnimation()
    // component - panel
    this.initComponentPanel()
    // sidebar - auto scroll to menu
    this.initSidebar()
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

async function main () {
  // create instance
  const admin = new app('.dashboard')

  // init all component
  await admin.init()

  // setTimeout(() => {
  //   window.location.reload()
  // }, 2000)
}

document.addEventListener("DOMContentLoaded", main)