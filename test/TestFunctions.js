const SimpleStorage = artifacts.require("SimpleStorage");
const truffleAssert = require('truffle-assertions');

contract('Test Base Functions', (accounts) => {
    const deployAccount = accounts[0];

    let simpleStorageContract = null
    before(async () => {
        simpleStorageContract = await SimpleStorage.deployed()
    })

    //numero viene aggiornato quando chiamo set con owner e con un numero maggiorne di 10 e ho inviato ether giusti
    //voglio controllare che tutti gli eventi sono giusti
    it('Should set number correctly', async () => {
        const number = 11
        const tx = await simpleStorageContract.set(number, { from: deployAccount, value: 1000000000000000 })
        
        const storedNumber = await simpleStorageContract.get()
        assert(storedNumber.toNumber() === number)

        truffleAssert.eventEmitted(tx, 'NumberUpdated', (ev) => {
            return ev.user === deployAccount;
        }, 'event should have the correct user');

        truffleAssert.eventEmitted(tx, 'NumberUpdated', (ev) => {
            return ev.newNumber.toNumber() === number;
        }, 'event should have the correct number');

        console.log('Hello world')
    })

    //se passo un numero minore di 10 deve fare revert
    it('Should not update number if param is lower than 10', async () => {
        const number = 9

        await truffleAssert.reverts(simpleStorageContract.set(number, { from: deployAccount, value: 1000000000000000 }))

        const storedNumber = await simpleStorageContract.get()
        assert(storedNumber.toNumber() !== number)

    })


    //fallisce se non mando ether giusti
    it('Should not update number if not enough ether is sent', async () => {
        const number = 50

        await truffleAssert.reverts(simpleStorageContract.set(number, { from: deployAccount, value: 1000000 }))           

        const storedNumber = await simpleStorageContract.get()
        assert(storedNumber.toNumber() !== number)
    })
})