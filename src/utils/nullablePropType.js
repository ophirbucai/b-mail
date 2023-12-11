export const nullablePropType = (propType) => (props, propName, ...rest) =>
    props[propName] === null ? null : propType(props, propName, ...rest);

