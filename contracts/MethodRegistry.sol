// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title MethodRegistry
 * @dev Allows to add methods to the registry from which worker nodes can pick up methods for execution.
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract MethodRegistry {
    mapping(string => string) public registry;
    mapping(string => address[]) public workerNodes;

    /**
     * @dev Adds the method in the regsitry.
     * @param methodName - name of the method to add.
     * @param ipfsCodeLink - ipfs file containing the code for the method.
     */
    function addMethod(string memory methodName, string memory ipfsCodeLink)
        public
    {
        registry[methodName] = ipfsCodeLink;
    }

    /**
     * @dev Adds a new worker for a method.
     * @param ipfsCodeLink - ipfs file containing the code for the method which worker is ready to execute.
     */
    function pickMethod(string memory ipfsCodeLink) public {
        workerNodes[ipfsCodeLink].push(msg.sender);
    }
}
