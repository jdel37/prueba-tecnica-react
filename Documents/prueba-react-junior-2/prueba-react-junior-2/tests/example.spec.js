import { test, expect } from '@playwright/test';

test.describe('Movie Search Feature', () => {
  test('should search and display movies', async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:3000'); // Replace with your app's URL

    // Locate the search input and enter a search term
    await page.fill('input[type="search"]', 'Batman');

    // Simulate pressing Enter or clicking the search button
    await page.click('button[type="submit"]');

    // Wait for the search results to be displayed
    await page.waitForSelector('main div');

    // Verify that at least one movie is displayed
    const movieElements = await page.$$('main div');
    expect(movieElements.length).toBeGreaterThan(0);

    // Verify the content of the first movie
    const firstMovieTitle = await page.textContent('main div:first-child h1');
    expect(firstMovieTitle).toContain('Batman'); // Replace with expected title
  });

  test('should clear the search results when input is cleared', async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:3000'); // Replace with your app's URL

    // Locate the search input and enter a search term
    await page.fill('input[type="search"]', 'Superman');

    // Simulate pressing Enter or clicking the search button
    await page.click('button[type="submit"]');

    // Wait for the search results to be displayed
    await page.waitForSelector('main div');

    // Clear the search input
    await page.fill('input[type="search"]', '');

    // Verify that no movies are displayed
    const movieElements = await page.$$('main div');
    expect(movieElements.length).toBe(0);
  });
});
