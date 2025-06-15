/**
 * Address Controllers
 * This module contains all address-related request handlers
 */

import type { Context } from 'hono';

import {
  createAddress,
  deleteAddress,
  getAddressById,
  getAddresses,
  updateAddress,
} from '@/services/addressService.js';
import {
  parseAddressId,
  validateCreateAddress,
  validateUpdateAddress,
} from '@/utils/address/addressUtil.js';

/**
 * Get all addresses
 * @param c - Hono Context
 * @returns JSON response with array of address records
 */
export async function getAddressesController(c: Context) {
  const addresses = await getAddresses();
  return c.json(addresses);
}

/**
 * Get a specific address by ID
 * @param c - Hono Context containing address ID in params
 * @returns JSON response with address data
 * @throws NotFoundError if address doesn't exist or is deleted
 */
export async function getAddressController(c: Context) {
  const addressId = parseAddressId(c.req.param('id'));
  const address = await getAddressById(addressId);
  return c.json(address);
}

/**
 * Create a new address record
 * @param c - Hono Context containing address data in request body
 * @returns JSON response with created address data
 * @throws BadRequestError if request data is invalid
 */
export async function createAddressController(c: Context) {
  const body = await c.req.json();
  const validatedData = validateCreateAddress(body);
  const address = await createAddress(validatedData);
  return c.json(address, 201);
}

/**
 * Update an existing address's information
 * @param c - Hono Context containing address ID and update data
 * @returns JSON response with updated address data
 * @throws NotFoundError if address doesn't exist or is deleted
 * @throws BadRequestError if update data is invalid
 */
export async function updateAddressController(c: Context) {
  const addressId = parseAddressId(c.req.param('id'));
  const body = await c.req.json();
  const validatedData = validateUpdateAddress(body);
  const address = await updateAddress(addressId, validatedData);
  return c.json(address);
}

/**
 * Soft delete an address (marks as deleted but keeps in database)
 * @param c - Hono Context containing the address ID to delete
 * @returns JSON response with deleted address data
 * @throws NotFoundError if address doesn't exist or is already deleted
 */
export async function deleteAddressController(c: Context) {
  const addressId = parseAddressId(c.req.param('id'));
  const address = await deleteAddress(addressId);
  return c.json(address);
}
