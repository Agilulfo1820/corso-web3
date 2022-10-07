const SimpleStorage = artifacts.require("SimpleStorage");
const catchRevert = require("./helpers/exceptionHelpers.js").catchRevert;

contract('Test that ownership of smart contract works as desired', (accounts) => {
    const deployAccount = accounts[0];

    let simpleStorageContract = null
    before(async () => {
        simpleStorageContract = await SimpleStorage.deployed()
    })

    it('Should change owner correctly', async () => {
        const newOwner = accounts[1]
        await simpleStorageContract.transferOwnership(newOwner, { from: deployAccount })
        const owner = await simpleStorageContract.owner()
        assert(owner === newOwner)
    })

    it('Only owner should be able to change ownership', async () => {
        const newOwner = accounts[2]
        const PREFIX = "Returned error: VM Exception while processing transaction: ";
        const message = "revert"

        try {
            // console.log('awaiting promise');
            await simpleStorageContract.transferOwnership(newOwner, { from: deployAccount });
            throw null;
        }
        catch (error) {
            // console.log('error', error);
            assert(error, "Expected an error but did not get one");
            // console.log(error.message);
            assert(error.message.startsWith(PREFIX + message), "Expected an error starting with '" + PREFIX + message + "' but got '" + error.message + "' instead");
        }
    })
})