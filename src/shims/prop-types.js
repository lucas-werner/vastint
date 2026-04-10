const createChainableValidator = () => {
  const validator = () => null;
  validator.isRequired = validator;
  return validator;
};

const createValidatorFactory = () => createChainableValidator();

const PropTypes = {
  any: createChainableValidator(),
  array: createChainableValidator(),
  arrayOf: createValidatorFactory,
  bool: createChainableValidator(),
  checkPropTypes: () => null,
  element: createChainableValidator(),
  elementType: createChainableValidator(),
  exact: createValidatorFactory,
  func: createChainableValidator(),
  instanceOf: createValidatorFactory,
  node: createChainableValidator(),
  number: createChainableValidator(),
  object: createChainableValidator(),
  objectOf: createValidatorFactory,
  oneOf: createValidatorFactory,
  oneOfType: createValidatorFactory,
  resetWarningCache: () => null,
  shape: createValidatorFactory,
  string: createChainableValidator(),
  symbol: createChainableValidator(),
};

export const {
  any,
  array,
  arrayOf,
  bool,
  checkPropTypes,
  element,
  elementType,
  exact,
  func,
  instanceOf,
  node,
  number,
  object,
  objectOf,
  oneOf,
  oneOfType,
  resetWarningCache,
  shape,
  string,
  symbol,
} = PropTypes;

export default PropTypes;
