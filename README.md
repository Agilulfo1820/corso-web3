# Requisiti
NodeJs v17.1.0
NPM v8.11.0

# Istruzioni

Installare dipendenze

```
npm install -g ganache-cli
npm install -g truffle
npm install
```

Copia .env.example e rinominiamo il file in .env (aggiungendo la private key).

Per compilare usare comando `truffle compile`.

Per eseguire i test usare il comando `truffle test`.

Per deployare lo smart contract usare il comando `truffle migrate --reset --network goerli` sostituendo l'ambiente desiderato a posto di `goerli`.

Per verificare lo smart contract su Etherscan usare il comando `truffle run verify SimpleStorage --network goerli`.

# Deployed addresses

[0x9d2527c74dD17ed67180b7c5fC49E655cE6C65F0](https://goerli.etherscan.io/address/0x9d2527c74dD17ed67180b7c5fC49E655cE6C65F0)

# Startd frontend
Per far partire index.html dentro la cartella frontend (con metamask che viene iniettato nella pagina) bisogna avere un server che gira, per questo esempio dunque sarà necessario installare o il package "Live Server" dentro Visual Studio Code oppure l'estension [Web Server for Chrome](chrome://extensions/?id=ofhbbkphhbklhfoeikjpcbhemlocgigb) e selezionare il file index.html dall'estensione.