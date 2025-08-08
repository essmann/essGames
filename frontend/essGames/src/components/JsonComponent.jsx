import { useState } from "react";
import { ClickAwayListener } from "@mui/material";

function JsonComponent({ object }) {
  const [visible, setVisible] = useState(false);

  const syntaxHighlight = (json) => {
    if (typeof json !== "string") {
      json = JSON.stringify(json, null, 2);
    }

    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\b(true|false|null)\b|\d+)/g, (match) => {
      let cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return `<span class="json_${cls}">${match}</span>`;
    });
  };

  return (
    <ClickAwayListener onClickAway={() => setVisible(false)}>
      <div>
        <button className="json_component_button" onClick={() => setVisible((prev)=>!prev)}>
          Show JSON
        </button>
        {visible && (
          <pre
            className="json_component"
            dangerouslySetInnerHTML={{ __html: syntaxHighlight(object) }}
          />
        )}
      </div>
    </ClickAwayListener>
  );
}

export default JsonComponent;
