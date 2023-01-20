import React from 'react';

const FocusTrapRedirectFocus = ({
  element,
}: {
  element: React.RefObject<HTMLButtonElement>;
}) => {
  const handleRedirect = () => {
    element.current?.focus();
  };
  return (
    <div tabIndex={0} onFocus={handleRedirect} style={{ position: 'absolute' }}></div>
  );
};

export default FocusTrapRedirectFocus;
