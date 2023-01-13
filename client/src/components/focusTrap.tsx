import React from 'react';

const FocusTrapRedirectFocus = ({
  element,
}: {
  element: HTMLElement | React.RefObject<HTMLButtonElement>;
}) => {
  const handleRedirect = () => {
    // @ts-ignore
    if (element?.current) {
      // @ts-ignore
      element.current?.focus();
    } else {
      // @ts-ignore
      element?.focus();
    }
  };
  return (
    <div tabIndex={0} onFocus={handleRedirect} style={{ position: 'absolute' }}></div>
  );
};

export default FocusTrapRedirectFocus;
