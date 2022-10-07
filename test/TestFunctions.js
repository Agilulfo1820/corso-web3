const SimpleStorage = artifacts.require("SimpleStorage");

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

        assert(tx.logs.length === 1, "one event should have been triggered");
        assert(tx.logs[0].args.newNumber.toNumber() === number, "event should have the correct number");
        assert(tx.logs[0].args.user === deployAccount, "event should have the correct number");
    })

    //se passo un numero minore di 10 deve fare revert
    it('Should not update number if param is lower than 10', async () => {
        const number = 9
        const PREFIX = "Returned error: VM Exception while processing transaction: ";
        const message = "revert"

        try {
            await simpleStorageContract.set(number, { from: deployAccount, value: 1000000000000000 });
            throw null;
        }
        catch (error) {
            assert(error, "Expected an error but did not get one");
            assert(error.message.startsWith(PREFIX + message), "Expected an error starting with '" + PREFIX + message + "' but got '" + error.message + "' instead");
        }

        const storedNumber = await simpleStorageContract.get()
        assert(storedNumber.toNumber() !== number)

    })


    //fallisce se non mando ether giusti
    it('Should not update number if not enough ether is sent', async () => {
        const number = 50
        const PREFIX = "Returned error: VM Exception while processing transaction: ";
        const message = "revert"

        try {
            await simpleStorageContract.set(number, { from: deployAccount, value: 1000000 });
            throw null;
        }
        catch (error) {
            assert(error, "Expected an error but did not get one");
            assert(error.message.startsWith(PREFIX + message), "Expected an error starting with '" + PREFIX + message + "' but got '" + error.message + "' instead");
        }

        const storedNumber = await simpleStorageContract.get()
        assert(storedNumber.toNumber() !== number)

    })
})