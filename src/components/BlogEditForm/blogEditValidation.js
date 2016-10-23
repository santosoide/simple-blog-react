import memoize from 'lru-memoize';
import { createValidator, required, maxLength } from 'utils/validation';

const blogEditValidation = createValidator({
  title: [required, maxLength(200)],
  body: [required, maxLength(2000)]
});
export default memoize(10)(blogEditValidation);
