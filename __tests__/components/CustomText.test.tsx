import {render} from '@testing-library/react-native';
import CustomText from '../../src/components/CustomText';

describe('Custom text test', () => {
  const text = 'Hello world';

  const {getByText} = render(<CustomText>{text}</CustomText>);

  expect(getByText(text)).toBeTruthy();
});
