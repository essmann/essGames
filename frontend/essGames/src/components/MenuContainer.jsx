function MenuContainer({
  height = 500,
  width = 500,
  children,
  transparent = false,
}) {
  return (
    <div
      className="absolute_menu_container"
      style={{
        width,
        height,
        background: transparent ? "none" : "", 
      }}
    >
      {children}
    </div>
  );
}

export default MenuContainer;
