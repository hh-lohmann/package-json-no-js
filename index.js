const package_info = require('node:fs').existsSync( './package.json' )
  ? require( './package.json' )
  : {}
console.log( '' 
  + '\n#'
  + '\n#\t'
  + ( package_info.name ? package_info.name + ': ' + package_info.description : '' )
  + '\n#\t' + 'This package contains only manual instructions - consult file://./README.md'
  + '\n#\n'
)
exports.README =
  ( package_info.name ? 'Package ' + package_info.name + ': ' : '' )
  + 'see console'
