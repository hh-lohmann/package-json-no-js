###### Concept

# Using package.json without JavaScript exports

Offering a `package.json` without JavaScript code to import may lead users and automated processes to think the package is broken. To clarify that the package intentionally exports no code (directly) you can put a piece of JavaScript to instruct verbatim to refer to e.g. the README.md file.


## Packages are expected to offer a JavaScript entry point

The `package.json` file started its career in Node.js as one way to support folders as modules (see [References](#references)). A module in Node is simply a JavaScript file whose contents can be "attached" to the current JavaScript environment. If no such file is explicitly defined in the `package.json` or no `package.json` is given, then a file named `index.js` in the folder is searched to be loaded.

In principle there is no direct connection between the existence of a `package.json` and its folder being a module, but in practice it would be quite natural for humans and automated processes to assume one, running into errors or irritations on trying to access such a non-existing module.


## Catching possible access errors by dummy `index.js`

Since automated processes are also recognizing a file `index.js` as a JavaScript entry point, you can store a dummy `index.js` next to `package.json` with this content:

```js
  // index.js
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
```

Accessing the folder with the "entry-less" `package.json` and the dummy `index.js` will print a message to console and offer the export `README` that resolves to a string containing a hint to refer to the console output:

```
  // example Node console
  > const new_module = require( './project-without-js' )

  #
  #       project-without-js: Useful tips to solve nearly every problem
  #       This package contains only manual instructions - consult file://./README.md
  #

  undefined
  > new_module.README
  'Package project-without-js: see console'
```

Note that:
  * this `index.js` will also work if no `package.json` exist, but `name` and `description` then will miss in the output
  * `README.md` is addressed with the `file://` protocol and `./` for location "this folder" - depending on your system's settings this should allow to open it directly from console with `Ctrl+Click`

You may adjust details to your needs.



## References

### Node.js v0.10.0: Folders as Modules

  * https://nodejs.org/download/release/v0.10.0/docs/api/all.html#all_folders_as_modules