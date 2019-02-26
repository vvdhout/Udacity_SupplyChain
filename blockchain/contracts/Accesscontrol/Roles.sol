pragma solidity ^0.5.1;

/**
 * @title Roles
 * @dev Library for managing addresses assigned to a Role.
 */
library Roles {
  struct Role {
    mapping (address => bool) bearer;
  }

  /**
   * @dev give an account access to this role
   */
  function add(Role storage role, address account) internal {
    // Require that the accounts is an address
    require(account != address(0));
    // Require that the account does not already have this role 
    require(!has(role, account));
    
    // Set role of the account to true
    role.bearer[account] = true;
  }

  /**
   * @dev remove an account's access to this role
   */
  function remove(Role storage role, address account) internal {
    // Require that the accounts is an address
    require(account != address(0));
    // Require that the account has the role in question
    require(has(role, account));
    
    // Set the role of the account to false
    role.bearer[account] = false;
  }

  /**
   * @dev check if an account has this role
   * @return bool
   */
  function has(Role storage role, address account)
    internal
    view
    returns (bool)
  {
    require(account != address(0));
    return role.bearer[account];
  }
}