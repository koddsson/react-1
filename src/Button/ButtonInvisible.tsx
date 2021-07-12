import styled from 'styled-components'
import {get} from '../constants'
import sx, {SxProp} from '../sx'
import {ComponentProps} from '../utils/types'
import ButtonBase, {ButtonBaseProps} from './ButtonBase'

const ButtonInvisible = styled(ButtonBase)<ButtonBaseProps & SxProp>`
  color: ${get('colors.text.link')};
  background-color: transparent;
  border: 0;
  border-radius: ${get('radii.2')};
  box-shadow: none;

  &:disabled {
    color: ${get('colors.text.disabled')};
  }

  &:focus {
    box-shadow: ${get('shadows.btn.focusShadow')};
  }

  ${sx}
`

export type ButtonInvisibleProps = ComponentProps<typeof ButtonInvisible>
export default ButtonInvisible
