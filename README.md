# piggybank

## TODO

- Add truffle to the project, currently contract migration is manual (😥 :disappointed_relieved:) via remix.

- Improve the folder structure, create modules to better segment the code and ensure scalability.

- Improve the flow of the present state with vuex

- Make the page responsive

- Validate methods in contracts and add comments

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Make the manual migration of the contract in remix (This will be replaced soon, sorry 😢:cry:)

- Copy and paste the contract 'src/contracts/PiggyManager.sol' in remix and deploy the contract in any public eth net.
- Replace the attribute value in 'src/store/index.js' line:20 'deployedContractAddress:' by the deployed contract address from remix.
- Enjoy

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
