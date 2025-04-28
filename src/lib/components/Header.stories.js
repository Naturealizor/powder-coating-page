import Header from './Header.svelte';

// Define the header props type
/** @typedef {{
  title: string,
  subtitle: string,
  actions: {
    label: string,
    onClick: () => void
  }[]
}} HeaderProps */

// Story metadata
export default {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    actions: { 
      control: 'object',
      description: 'Array of action buttons to display'
    }
  }
};

// Base template for creating stories
/** @type {(args: HeaderProps) => {Component: typeof Header, props: HeaderProps}} */
const Template = (args) => ({
  Component: Header,
  props: args
});

// Default header story
export const Default = /** @type {any} */ (Template.bind({}));
Default.args = {
  title: 'Header',
  subtitle: 'Subtitle',
  actions: [
    { label: 'Action 1', onClick: () => console.log('Action 1 clicked') },
    { label: 'Action 2', onClick: () => console.log('Action 2 clicked') }
  ]
};

// No actions header story
export const NoActions = /** @type {any} */ (Template.bind({}));
NoActions.args = {
  title: 'Header with No Actions',
  subtitle: 'Just a simple header without action buttons',
  actions: []
};

// Long title header story
export const LongTitle = /** @type {any} */ (Template.bind({}));
LongTitle.args = {
  title: 'This is a very long header title that might wrap on smaller screens',
  subtitle: 'With a subtitle that explains what this header is about',
  actions: [
    { label: 'Primary Action', onClick: () => console.log('Primary action clicked') }
  ]
}; 