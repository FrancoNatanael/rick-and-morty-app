import { render, screen, fireEvent } from '@testing-library/react';
import CharactersGrid from '@/components/custom/Characters/CharactersGrid';
import { Character, Status } from '@/types/Character';
import '@testing-library/jest-dom';

const mockCharacters: Character[] = [
    {
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
      },
      {
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
      } 
]

describe('CharactersGrid Component', () => {
  let selectedCharacters: Character[] = [];
  let setSelectedCharacters: jest.Mock;

  beforeEach(() => {
    selectedCharacters = [];
    setSelectedCharacters = jest.fn((newSelection) => {
      selectedCharacters = newSelection;
    });
  });

  it('renders the characters correctly', () => {
    render(
      <CharactersGrid
        characters={mockCharacters}
        selectedCharacters={[]}
        setSelectedCharacters={setSelectedCharacters}
      />
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
  
  it('select characters', () => {
    render(
      <CharactersGrid
        characters={mockCharacters}
        selectedCharacters={[]}
        setSelectedCharacters={setSelectedCharacters}
      />
    );

    const rickCard = screen.getByText('Rick Sanchez');
    fireEvent.click(rickCard);

    expect(setSelectedCharacters).toHaveBeenCalledWith([mockCharacters[0]]);
  });

  it('shows only the first 4 characters initially', () => {
    const manyCharacters = Array.from({ length: 10 }, (_, i) => ({
      ...mockCharacters[0],
      id: i + 1,
      name: `Character ${i + 1}`,
    }));

    render(
      <CharactersGrid
        characters={manyCharacters}
        selectedCharacters={[]}
        setSelectedCharacters={setSelectedCharacters}
      />
    );

    for (let i = 1; i <= 4; i++) {
      expect(screen.getByText(`Character ${i}`)).toBeInTheDocument();
    }

    expect(screen.queryByText('Character 5')).not.toBeInTheDocument();
  });

  it('does not break if characters is empty', () => {
    render(
      <CharactersGrid
        characters={[]}
        selectedCharacters={[]}
        setSelectedCharacters={setSelectedCharacters}
      />
    );

    expect(screen.queryByText(/Character/)).not.toBeInTheDocument();
  });
});