import { Character, Status } from '@/types/Character';
import Episodes from '@/components/custom/Episodes/Episodes';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EpisodesInfoCard from '@/components/custom/Episodes/EpisodesInfoCard';

const mockCharacter1: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: Status.ALIVE,
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: 'https://example.com/location/1' },
  location: { name: 'Earth (Replacement Dimension)', url: 'https://example.com/location/20' },
  image: 'https://example.com/rick.jpg',
  episode: ['https://example.com/episode/1'],
  url: 'https://example.com/character/1',
  created: '2017-11-04T18:48:46.250Z'
};

const mockCharacter2: Character = {
  id: 2,
  name: 'Morty Smith',
  status: Status.ALIVE,
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (Replacement Dimension)', url: 'https://example.com/location/20' },
  location: { name: 'Earth (Replacement Dimension)', url: 'https://example.com/location/20' },
  image: 'https://example.com/morty.jpg',
  episode: ['https://example.com/episode/1', 'https://example.com/episode/2'],
  url: 'https://example.com/character/2',
  created: '2017-11-04T18:50:21.651Z'
};

const mockEpisodes = [
    { id: 1, name: 'Pilot', air_date: 'December 2, 2013' },
    { id: 2, name: 'Lawnmower Dog', air_date: 'December 9, 2013' },
]

jest.mock('@/hooks/useFetchEpisodes', () => ({
    useFetchEpisodes: () => ({
      getEpisodes: jest.fn().mockResolvedValue(mockEpisodes),
      loading: false
    })
}));

const mockGetEpisodes = jest.fn()
const mockUseFetchEpisodes = (loading = false, episodes = mockEpisodes) => {
  mockGetEpisodes.mockResolvedValue(episodes)
  jest.mock('@/hooks/useFetchEpisodes', () => ({
    useFetchEpisodes: () => ({
      getEpisodes: mockGetEpisodes,
      loading,
    }),
  }))
}

describe('Character Merge Functionality', () => {
  it('show episodes cards in dom', async () => {
    const { rerender } = render(
      <Episodes selectedCharactersPage1={[]} selectedCharactersPage2={[]} />
    );

    act(() => {
      rerender(
        <Episodes 
          selectedCharactersPage1={[mockCharacter1]} 
          selectedCharactersPage2={[mockCharacter2]} 
        />
      );

    });

    await waitFor(() => {
        expect(screen.getByText('Character #1 - Only Episodes')).toBeInTheDocument();
        expect(screen.getByText('Character #2 - Only Episodes')).toBeInTheDocument();
        expect(screen.getByText('Characters #1 & #2 - Shared Episodes')).toBeInTheDocument();
    })
  });

  it('render episodes corretcly', async () => {
    render(<EpisodesInfoCard title="Episodes" selectedCharacters={[mockCharacter1, mockCharacter2]} />);

    await waitFor(() => {
      expect(screen.getByText(/Pilot/)).toBeInTheDocument();
      expect(screen.getByText(/Lawnmower Dog/)).toBeInTheDocument();
    });
  });

  it('render episodes correctly when loading is false', async () => {
    mockUseFetchEpisodes(false, mockEpisodes)

    const { default: EpisodesInfoCard } = await import('@/components/custom/Episodes/EpisodesInfoCard')
    render(<EpisodesInfoCard title="Character #1 - Only Episodes" selectedCharacters={[mockCharacter1, mockCharacter2]} />)

    await waitFor(() => {
      expect(screen.getByText(/Pilot/)).toBeInTheDocument()
      expect(screen.getByText(/Lawnmower Dog/)).toBeInTheDocument()
    })
  })

  it('does not render episodes when no characters are selected', async () => {
    mockUseFetchEpisodes()

    const { default: EpisodesInfoCard } = await import('@/components/custom/Episodes/EpisodesInfoCard')
    render(<EpisodesInfoCard title="Character #1 - Only Episodes" selectedCharacters={[]} />)

    expect(screen.queryByText(/Episode:/)).not.toBeInTheDocument()
  })
});

