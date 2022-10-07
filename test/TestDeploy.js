const SimpleStorage = artifacts.require("SimpleStorage");

contract('Test Deploy', (accounts) => {
    const deployAccount = accounts[0];

    let simpleStorageContract = null
    before(async () => {
        simpleStorageContract = await SimpleStorage.deployed()
    })

    it('Should deploy smart contract properly', async () => {
        assert(simpleStorageContract.address != '')
    })

    it('Should set ownership correctly to deployer account', async () => {
        const owner = await simpleStorageContract.owner()
        assert(owner === deployAccount)
    })
})