import * as igdbClient from '../../../src/services/igdbClient';
import axios from 'axios';
import { mocked } from 'jest-mock';

jest.mock('axios');
const mAxiosPost = mocked(axios.post);

/**
 * Tests associated with authenticate
 */
describe('authenticate test cases', () => {
  const authToken = 'token';

  afterEach(() => {
    mAxiosPost.mockClear();
  });

  it('sucessfully returns a token', async () => {
    mAxiosPost.mockResolvedValue({
      data: {
        access_token: 'token'
      }
    });
    const result = await igdbClient.authenticate();
    expect(mAxiosPost).toHaveBeenCalled();
    expect(result).toBe(authToken);
  });

  it('throws an error', async () => {
    try {
      mAxiosPost.mockRejectedValue(new Error('bad error'));
    } catch (_) {
      expect(await igdbClient.authenticate()).toThrowError();
    }
  });
});

/**
 * Tests associated with games request
 */
describe('games request test cases', () => {
  afterEach(() => {
    mAxiosPost.mockClear();
  });

  it('returns data successfully', async () => {
    const value = {
      data: {
        name: 'Pokemon Blue',
        platforms: ['Gameboy Color'],
        genres: ['RPG'],
        release_dates: ['February 26 1996'],
        summary: 'Gotta catch em all',
        franchise: 'Pokemon',
        company: 'Game Freak',
        artwork: 'poke.jpg'
      }
    };
    mAxiosPost.mockResolvedValue(value);
    const result = await igdbClient.gamesRequest('token', 'id');
    expect(mAxiosPost).toHaveBeenCalled();
    expect(result).toBe(value.data);
  });

  it('throws an error', async () => {
    try {
      mAxiosPost.mockRejectedValue(new Error('bad error'));
    } catch (_) {
      expect(await igdbClient.gamesRequest('token', 'id')).toThrowError();
    }
  });
});
