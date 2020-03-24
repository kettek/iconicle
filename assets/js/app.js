const I = {
  el: null,
  groups: {
    'Windows': {
      active: true,
      export: true,
      el: null,
      icons: ['256x256', '48x48', '32x32', '16x16'],
      icon_els: [],
    },
    'Windows (Classic Mode)': {
      active: false,
      export: false,
      el: null,
      icons: ['64x64', '48x48', '32x32', '24x24', '16x16'],
      icon_els: [],
    },
    'Windows (Overlays)': {
      active: false,
      export: false,
      el: null,
      icons: ['128x128', '24x24', '16x16', '10x10'],
      icon_els: [],
    },
    'Windows (Balloon)': {
      active: false,
      export: false,
      el: null,
      icons: ['40x40', '32x32'],
      icon_els: [],
    },
    'Windows (Other)': {
      active: false,
      export: false,
      el: null,
      icons: ['128x128', '96x96', '64x64', '40x40', '24x24', '22x22', '14x14', '10x10', '8x8'],
      icon_els: [],
    }
  },
  // Make is a quick HTML element creator. It takes in an object whose keys are in the form of 'name:tag.class', where name will be the resulting property in the return object for that given element.
  make: (structure, root) => {
    let obj = {}
    for (let [k, v] of Object.entries(structure)) {
      let prop, tag, className = ''
      let split = k.split(':')
      prop = split[0]
      split = split[1] ? split[1].split('.') : ['div']
      tag = split[0]
      className = split[1] ? split[1] : ''

      let el = document.createElement(tag)
      el.className = className
      obj[prop] = Object.assign({
        el: el,
      }, I.make(v, el))
      root.appendChild(el)
    }
    return obj
  },
  init: () => {
    I.el = document.getElementById('Icons')
    for(let [key, group] of Object.entries(I.groups)) {
      // Create our basic element structure.
      let s = I.make({
        'group:article.Icons__Group': {
          'title:label.Icons__Group__Title': {
            'show:label': {
              'checkbox:input': {
              },
            },
            'text:span.Icons__Group__Title__Text': {
            },
          },
          'icons:div.Icons__Group__Icons': {
          }
        }
      }, I.el)

      // Set up our title
      s.group.title.text.el.innerHTML = key
      // Set up show/hide checkbox.
      s.group.title.show.checkbox.el.type = 'checkbox'
      s.group.title.show.checkbox.el.checked = I.groups[key].active
      s.group.title.show.checkbox.el.onchange = e => {
        I.groups[key].active = e.target.checked
        if (!e.target.checked) {
          s.group.icons.el.classList.add('-hidden')
        } else {
          s.group.icons.el.classList.remove('-hidden')
        }
      }
      s.group.title.show.checkbox.el.dispatchEvent(new Event('change'))
      // Create our icons.
      group.icons.forEach((icon, index) => {
        let s2 = I.make({
          'icon:span.Icons__Group__Icons__Icon': {
            'image:img.Icons__Group__Icons__Icon__Image': {},
            'title:div.Icons__Group__Icons__Icon__Title': {},
          }
        }, s.group.icons.el)
        let size = icon.split('x')
        s2.icon.image.el.style.width = size[0]+'px'
        s2.icon.image.el.style.height = size[1]+'px'
        s2.icon.title.el.innerHTML = icon
      })
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  I.init()
})
