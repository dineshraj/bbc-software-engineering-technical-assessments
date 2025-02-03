import { render, screen } from '@testing-library/react';
import PartyLinks from '.';

test('renders party links as a list', async () => {
  render(<PartyLinks/>);

  const partyLinks = screen.getAllByTestId('party-links')
  expect(partyLinks).toHaveRole('ul');
});

test('renders all the party links', async () => {
  render(<PartyLinks />);
  
  const partyLink = screen.getAllByTestId('party-link');
  expect(partyLink.length).toBe(6);
});

test('renders a party link with the correct text and href', async () => {
  render(<PartyLinks/>);

  const partyLinksAnchorTag = screen.getByRole('a')
  expect(partyLinksAnchorTag.textContent).toBe('Hippo Party');
  expect(partyLinksAnchorTag).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Hippopotamus');
});
