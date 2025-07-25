import React, { useState, useEffect } from "react";

function ContextMenu() {
  const [menuPos, setMenuPos] = useState(null);
  const [targetInfo, setTargetInfo] = useState(null);

  useEffect(() => {
    // Right-click handler on whole document
    const handleContextMenu = (e) => {
      e.preventDefault();
      const el = e.target;
      setTargetInfo({
        tagName: el.tagName,
        id: el.id,
        className: el.className,
        text: el.innerText?.slice(0, 50) || "(none)",
      });
      setMenuPos({ x: e.pageX, y: e.pageY });
    };

    // Hide menu on any left click or scroll
    const hideMenu = () => setMenuPos(null);

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", hideMenu);
    window.addEventListener("scroll", hideMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", hideMenu);
      window.removeEventListener("scroll", hideMenu);
    };
  }, []);

  if (!menuPos) return null;

  return (
    <ul
      style={{
        position: "absolute",
        top: menuPos.y,
        left: menuPos.x,
        background: "white",
        border: "1px solid black",
        padding: "10px",
        listStyle: "none",
        zIndex: 9999,
        width: 220,
        boxShadow: "2px 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      <li><b>Tag:</b> {targetInfo.tagName}</li>
      <li><b>ID:</b> {targetInfo.id || "(none)"}</li>
      <li><b>Class:</b> {targetInfo.className || "(none)"}</li>
      <li><b>Text:</b> {targetInfo.text || "(none)"}</li>
    </ul>
  );
}

export default ContextMenu;
