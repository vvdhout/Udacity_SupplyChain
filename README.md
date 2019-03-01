# Architect a Supply Chain: Part A - Lumber Supply Chain

This repository holds all the files that consitute our blockchain-based supply chain solution for the lumber industry. We will build an application using the Ethereum blockchain for storage of data and smart contract functionality that can be used to track and transfer ownership of lumber and lumber products when moving along the supply chain from harvester all the way to the end consumer.

## Content

In the /diagrams/ folder you will find the following UML diagrams:
- Activity diagram (mapping out the activities of each participant)
- Sequence diagram (mapping out the functions that will be used and the sequence of them)
- State diagram (mapping out the state changes to the item(s) being tracked)
- Data diagram (mapping out the structure of our smart contract and their inheritance)

## Libraries

We use the Roles library which allows simple creation and management of different roles, and then provide access controls for these.

## IPFS

We will not be using IPFS as a storage mechanism as of now.

## Contract

Address: 0x55303749064bd75ab5fd04cd0b5fe74725382f74

## Versions

Solidity: v0.5.1
Truffle: v5
Web3.js: v1.0

## Running the application

```
node run.js
```
Go to http://localhost:8000/ and interact with the contract. Only the owner of the contract can set roles which can operate the supply chain.