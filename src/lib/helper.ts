export const isObjectEmpty = (objectName: { constructor?: any }) => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
};