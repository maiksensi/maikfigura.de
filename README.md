# README maikfigura.de

## 🚀 Develop

You can:

- add new asciidoctor content in `./content`
- run the development server via `npm start`
- run Jest tests via `npm run test`
- run Cypress e2e tests via `npm run test:e2e:ci`
- run validation via `npm run validate`

## 💫 Deploy

To create a fresh deployment:

- run `npm run build`
- run all exports from `export_vars.sh` (needs deployment key and password `MAIKFIGURA_DE_DEPLOYMENT_KEY_PASSWORD`)
- run `./ssh_add_key.sh`
- run `./rsync-deploy.sh`
