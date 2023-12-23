import { twClassNames } from '@/helpers/general/twClassNames';
import { PropsMergeFn } from 'react-extend-components';

export const reactExtendComponentsCustomMergeFn: PropsMergeFn = ({
  innerProps,
  outerProps,
  defaultMergeFn,
}) => {
  const props = defaultMergeFn({ innerProps, outerProps });
  props.className = twClassNames(innerProps.className, outerProps['className']);
  return props;
};
