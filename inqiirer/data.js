const isOverwriteSelect = [
  {
    name: 'Overwrite',
    value: 'overwrite'
  },
  {
    name: 'Cancel',
    value: false
  }
]

const featureList = [
  {
    name: 'Babel',
    value: 'babel',
    checked: true
  },
  {
    name: 'TypeScript',
    value: 'TypeScript'
  },
  {
    name: 'Router',
    value: 'router'
  },
  {
    name: 'Vuex',
    value: 'vuex'
  }
]

const vueVersionList = [
  {
    name: '3. x',
    value: '3'
  },
  {
    name: '2. x',
    value: '3'
  },
]

// const routerMode = [
//   {
//     name: 'routerMode',
//     type: 'list',
//     message: 'Target directory already exists Pick an action:',
//     choices: [
//       {
//         name: 'Overwrite',
//         value: 'overwrite'
//       },
//       {
//         name: 'Cancel',
//         value: false
//       }
//     ]
//   }
// ]
module.exports = {
  isOverwriteSelect,
  featureList,
  vueVersionList
}