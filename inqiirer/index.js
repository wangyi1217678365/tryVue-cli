const isOverwriteSelect = [
  {
    name: 'action',
    type: 'list',
    message: 'Target directory already exists Pick an action:',
    choices: [
      {
        name: 'Overwrite',
        value: 'overwrite'
      },
      {
        name: 'Cancel',
        value: false
      }
    ]
  }
]
module.exports = {
  isOverwriteSelect
}