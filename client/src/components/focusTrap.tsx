const FocusTrapRedirectFocus = ({ element }: { element: any }) => {
  return (
    <div
      tabIndex={0}
      onFocus={() => element.current && element.current.focus()}
      style={{ position: "absolute" }}
    ></div>
  );
};

export default FocusTrapRedirectFocus;
