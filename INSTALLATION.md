For usage in library

Usage images
<img src="/assets/fy-lib-comp/img/logo.png" alt=""  >
<img src="/assets/fy-lib-comp/img/pici2.webp" alt="" >


For publlish
npm login
npm publish



For usage facility in you project

npm i @popperjs/core
npm i bootstrap
npm i jquery
npm i @types/jquery

Verifier version in package.json

Angular.json

  "assets": [
              "projects/dashboard-customer/src/favicon.ico",  // Of your proyect
              "projects/dashboard-customer/src/assets",  // Of your proyect
              {
                "input": "node_modules/fy-lib-comp/src/assets",
                "glob": "**/*",
                "output": "assets/fy-lib-comp"
              }
            ],
            "styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "node_modules/fy-lib-comp/src/assets/css/fy-css.css",
              "projects/dashboard-customer/src/styles.css"  // Of your proyect
            ],
            "scripts": [
               "node_modules/jquery/dist/jquery.min.js",
              "node_modules/@popperjs/core/dist/umd/popper.min.js",
              "node_modules/bootstrap/dist/js/bootstrap.min.js",
              "node_modules/fy-lib-comp/src/assets/js/fy-sidebar.js"
            ]

npm i fy-lib-comp