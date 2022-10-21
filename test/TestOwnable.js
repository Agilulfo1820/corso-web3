const SimpleStorage = artifacts.require("SimpleStorage");
const truffleAssert = require('truffle-assertions');

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
       
        await truffleAssert.reverts(simpleStorageContract.transferOwnership(newOwner, { from: deployAccount })) 
    })
})