import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'jest'; // Ensure Jest globals are available
import App from './App'; // замініть на відповідний компонент
import userEvent from '@testing-library/user-event';

describe('App functionality', () => {
  beforeEach(() => {
    render(<App />);
  });

  // 1. Перевірка наявності основних елементів
  it('should render main elements', () => {
    expect(screen.getByTestId('tracks-header')).toBeInTheDocument();
    expect(screen.getByTestId('create-track-button')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('sort-select')).toBeInTheDocument();
    expect(screen.getByTestId('filter-genre')).toBeInTheDocument();
    expect(screen.getByTestId('filter-artist')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-next')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-prev')).toBeInTheDocument();
  });

  // 2. Перевірка наявності треків
  it('should render track items with correct data-testid', () => {
    const trackId = 1; // приклад ID
    expect(screen.getByTestId(`track-item-${trackId}`)).toBeInTheDocument();
    expect(
      screen.getByTestId(`track-item-${trackId}-title`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`track-item-${trackId}-artist`),
    ).toBeInTheDocument();
    expect(screen.getByTestId(`edit-track-${trackId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`delete-track-${trackId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`upload-track-${trackId}`)).toBeInTheDocument();
  });

  // 3. Тест форми додавання треку
  it('should render the track form with correct data-testid', () => {
    expect(screen.getByTestId('track-form')).toBeInTheDocument();
    expect(screen.getByTestId('input-title')).toBeInTheDocument();
    expect(screen.getByTestId('input-artist')).toBeInTheDocument();
    expect(screen.getByTestId('input-album')).toBeInTheDocument();
    expect(screen.getByTestId('input-cover-image')).toBeInTheDocument();
    expect(screen.getByTestId('genre-selector')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  // 4. Перевірка наявності повідомлень про помилки
  it('should show error messages for invalid inputs', async () => {
    fireEvent.change(screen.getByTestId('input-title'), {
      target: { value: '' },
    });
    fireEvent.blur(screen.getByTestId('input-title'));

    await waitFor(() => {
      expect(screen.getByTestId('error-title')).toBeInTheDocument();
    });
  });

  // 5. Перевірка діалогових вікон і сповіщень
  it('should show confirmation dialog and toast notifications', async () => {
    const deleteButton = screen.getByTestId('delete-track-1'); // Приклад для видалення
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByTestId('confirm-dialog')).toBeInTheDocument();
    });

    const confirmDeleteButton = screen.getByTestId('confirm-delete');
    userEvent.click(confirmDeleteButton);

    await waitFor(() => {
      expect(screen.getByTestId('toast-container')).toBeInTheDocument();
      expect(screen.getByTestId('toast-success')).toBeInTheDocument(); // Приклад для успішного повідомлення
    });
  });

  // 6. Перевірка індикаторів завантаження
  it('should show loading indicators when tracks are being loaded', async () => {
    const loadingIndicator = screen.getByTestId('loading-indicator');
    expect(loadingIndicator).toBeInTheDocument();

    const loadingTracks = screen.getByTestId('loading-tracks');
    expect(loadingTracks).toBeInTheDocument();

    // Перевірка, якщо елемент знаходиться в стані завантаження
    expect(loadingTracks).toHaveAttribute('data-loading', 'true');
  });

  // 7. Перевірка аудіоплеєра
  it('should render audio player controls with correct data-testid', () => {
    const trackId = 1; // Приклад для треку
    expect(screen.getByTestId(`audio-player-${trackId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`play-button-${trackId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`pause-button-${trackId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`audio-progress-${trackId}`)).toBeInTheDocument();
  });

  // 8. Перевірка масових операцій
  it('should handle bulk selection and deletion correctly', async () => {
    // Перемикач для вибору треків
    const selectModeButton = screen.getByTestId('select-mode-toggle');
    userEvent.click(selectModeButton);

    const selectAllButton = screen.getByTestId('select-all');
    userEvent.click(selectAllButton);

    expect(screen.getAllByTestId(/^track-checkbox-/).length).toBeGreaterThan(0);

    // Перевірка видалення вибраних треків
    const bulkDeleteButton = screen.getByTestId('bulk-delete-button');
    userEvent.click(bulkDeleteButton);

    await waitFor(() => {
      expect(screen.getByTestId('toast-success')).toBeInTheDocument(); // Перевірка повідомлення про успішне видалення
    });
  });
});
