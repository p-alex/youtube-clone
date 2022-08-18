const FocusTrapRedirectFocus = ({ element }: { element: any }) => {
  return (
    <div tabIndex={0} onFocus={() => element.current && element.current.focus()}></div>
  );
};

export default FocusTrapRedirectFocus;
