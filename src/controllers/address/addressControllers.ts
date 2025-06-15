/**
 * Address Controllers
 * This module contains all address-related request handlers
 */

import type { Context } from 'hono';

import {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from '@/services/addressService.js';
import {
  validateCreateAddress,
  validateUpdateAddress,
  parseAddressId,
} from '@/utils/address/addressUtil.js';
import { BadRequestError } from '@/utils/error.js';

/**
 * Get all addresses
 * @param c - Hono Context
 * @returns JSON response with array of address records
 */
export async function getAddressesController(c: Context) {
  try {
    const addresses = await getAddresses();
    return c.json(addresses);
  } catch (error) {
    throw error;
  }
}

/**
 * Get a specific address by ID
 * @param c - Hono Context containing address ID in params
 * @returns JSON response with address data
 * @throws NotFoundError if address doesn't exist or is deleted
 */
export async function getAddressController(c: Context) {
  try {
    const addressId = parseAddressId(c.req.param('id'));
    const address = await getAddressById(addressId);
    return c.json(address);
  } catch (error) {
    throw error;
  }
}

/**
 * Create a new address record
 * @param c - Hono Context containing address data in request body
 * @returns JSON response with created address data
 * @throws BadRequestError if request data is invalid
 */
export async function createAddressController(c: Context) {
  try {
    const body = await c.req.json();
    const validatedData = validateCreateAddress(body);
    const address = await createAddress(validatedData);
    return c.json(address, 201);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new BadRequestError('Invalid JSON in request body');
    }
    throw error;
  }
}

/**
 * Update an existing address's information
 * @param c - Hono Context containing address ID and update data
 * @returns JSON response with updated address data
 * @throws NotFoundError if address doesn't exist or is deleted
 * @throws BadRequestError if update data is invalid
 */
export async function updateAddressController(c: Context) {
  try {
    const addressId = parseAddressId(c.req.param('id'));
    const body = await c.req.json();
    const validatedData = validateUpdateAddress(body);
    const address = await updateAddress(addressId, validatedData);
    return c.json(address);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new BadRequestError('Invalid JSON in request body');
    }
    throw error;
  }
}

/**
 * Soft delete an address (marks as deleted but keeps in database)
 * @param c - Hono Context containing the address ID to delete
 * @returns JSON response with deleted address data
 * @throws NotFoundError if address doesn't exist or is already deleted
 */
export async function deleteAddressController(c: Context) {
  try {
    const addressId = parseAddressId(c.req.param('id'));
    const address = await deleteAddress(addressId);
    return c.json(address);
  } catch (error) {
    throw error;
  }
}
