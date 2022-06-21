import React from 'react'
import {Meta} from '@storybook/react'

import {BaseStyles, Select, ThemeProvider, FormControl} from '..'
import {SelectProps} from '../Select'

export default {
  title: 'Forms/Select',
  component: Select,
  decorators: [
    Story => {
      return (
        <ThemeProvider>
          <BaseStyles>
            <Story />
          </BaseStyles>
        </ThemeProvider>
      )
    }
  ],
  argTypes: {
    block: {
      defaultValue: false,
      type: 'boolean'
    },
    contrast: {
      defaultValue: false,
      type: 'boolean'
    },
    disabled: {
      defaultValue: false,
      type: 'boolean'
    },
    required: {
      defaultValue: false,
      type: 'boolean'
    },
    size: {
      defaultValue: 'medium',
      options: ['small', 'medium', 'large'],
      control: {type: 'radio'}
    },
    sx: {
      table: {
        disable: true
      }
    }
  },
  parameters: {controls: {exclude: ['contrast', 'hasTrailingAction', 'monospace', 'isInputFocused', 'sx']}}
} as Meta

export const Default = (args: SelectProps) => (
  <FormControl disabled={args.disabled} required={args.required}>
    <FormControl.Label>Choice</FormControl.Label>
    <Select {...args}>
      <Select.Option value="one">Choice one</Select.Option>
      <Select.Option value="two">Choice two</Select.Option>
      <Select.Option value="three">Choice three</Select.Option>
      <Select.Option value="four">Choice four</Select.Option>
      <Select.Option value="five">Choice five</Select.Option>
      <Select.Option value="six">Choice six</Select.Option>
    </Select>
  </FormControl>
)

export const WithOptionGroups = (args: SelectProps) => (
  <FormControl disabled={args.disabled} required={args.required}>
    <FormControl.Label>Choice</FormControl.Label>
    <Select {...args}>
      <Select.OptGroup label="Group one">
        <Select.Option value="one">Choice one</Select.Option>
        <Select.Option value="two">Choice two</Select.Option>
        <Select.Option value="three">Choice three</Select.Option>
        <Select.Option value="four">Choice four</Select.Option>
      </Select.OptGroup>
      <Select.OptGroup disabled label="Group two">
        <Select.Option value="five">Choice five</Select.Option>
        <Select.Option value="six">Choice six</Select.Option>
      </Select.OptGroup>
    </Select>
  </FormControl>
)

export const WithAPlaceholder = (args: SelectProps) => (
  <FormControl disabled={args.disabled} required={args.required}>
    <FormControl.Label>Choice</FormControl.Label>
    <Select placeholder="Pick a choice" {...args}>
      <Select.Option value="one">Choice one</Select.Option>
      <Select.Option value="two">Choice two</Select.Option>
      <Select.Option value="three">Choice three</Select.Option>
      <Select.Option value="four">Choice four</Select.Option>
      <Select.Option value="five">Choice five</Select.Option>
      <Select.Option value="six">Choice six</Select.Option>
    </Select>
  </FormControl>
)
