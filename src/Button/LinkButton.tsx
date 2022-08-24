import React, {forwardRef} from 'react'
import {merge, SxProp} from '../sx'
import {LinkButtonProps} from './types'
import {ButtonBase, ButtonBaseProps} from './ButtonBase'
import {ForwardRefComponent as PolymorphicForwardRefComponent} from '@radix-ui/react-polymorphic'
import validateAs from '../utils/validate-as'

const ALLOWED_TAGS = ['a', 'button']

type MyProps = LinkButtonProps & ButtonBaseProps

const LinkButton = forwardRef<HTMLElement, MyProps>(
  ({children, as: Component = 'a', sx = {}, ...props}, forwardedRef): JSX.Element => {
    validateAs(Component, ALLOWED_TAGS)
    const style = {
      width: 'fit-content',
      '&:hover:not([disabled])': {
        textDecoration: 'underline'
      },
      // focus must come before :active so that the active box shadow overrides
      '&:focus:not([disabled])': {
        textDecoration: 'underline'
      },
      '&:active:not([disabled])': {
        textDecoration: 'underline'
      }
    }
    const sxStyle = merge.all([style, sx as SxProp])
    return (
      <ButtonBase as={Component} ref={forwardedRef} sx={sxStyle} {...props}>
        {children}
      </ButtonBase>
    )
  }
) as PolymorphicForwardRefComponent<'a', ButtonBaseProps>

export {LinkButton}
