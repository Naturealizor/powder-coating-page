import Button from './Button.svelte';

// Define the button props type
/** @typedef {{
  variant: 'primary' | 'secondary' | 'outline',
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl',
  label: string,
  onClick: () => void
}} ButtonProps */

// Story metadata
export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    label: { control: 'text' },
    onClick: { action: 'clicked' }
  }
};

// Base template for creating stories
/** @type {(args: ButtonProps) => {Component: typeof Button, props: ButtonProps}} */
const Template = (args) => ({
  Component: Button,
  props: args
});

// Primary button story
export const Primary = /** @type {any} */ (Template.bind({}));
Primary.args = {
  variant: 'primary',
  size: 'md',
  label: 'Primary Button'
};

// Secondary button story
export const Secondary = /** @type {any} */ (Template.bind({}));
Secondary.args = {
  variant: 'secondary',
  size: 'md',
  label: 'Secondary Button'
};

// Outline button story
export const Outline = /** @type {any} */ (Template.bind({}));
Outline.args = {
  variant: 'outline',
  size: 'md',
  label: 'Outline Button'
};

// Size variations
export const Small = /** @type {any} */ (Template.bind({}));
Small.args = {
  variant: 'primary',
  size: 'sm',
  label: 'Small Button'
};

export const Large = /** @type {any} */ (Template.bind({}));
Large.args = {
  variant: 'primary',
  size: 'lg',
  label: 'Large Button'
}; 

