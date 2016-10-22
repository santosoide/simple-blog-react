import memoize from 'lru-memoize';
import { createValidator, required, maxLength } from 'utils/validation';

const blogValidation = createValidator({
  title: [required, maxLength(200)],
  body: [required, maxLength(2000)]
});
export default memoize(10)(blogValidation);
