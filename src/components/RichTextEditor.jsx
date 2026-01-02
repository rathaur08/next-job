"use client";

import React, { useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";

// 👇 IMPORTANT: Disable SSR
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const RichTextEditor = ({
  name,
  control,
  label,
  placeholder = "Write here...",
}) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder,
      height: 250,
    }),
    [placeholder]
  );

  return (
    <div className="form-group mb-3">
      {label && <label className="form-label fw-bold">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <JoditEditor
            ref={editor}
            value={field.value}
            config={config}
            onChange={(content) => field.onChange(content)}
          />
        )}
      />
    </div>
  );
};

export default RichTextEditor;


// ------------------------------ Other Code ----------------------------------

// import React, { useRef, useMemo } from "react";
// import JoditEditor from "jodit-react";
// import { Controller } from "react-hook-form";

// const RichTextEditor = ({
//   name,
//   control,
//   label,
//   placeholder = "Write here...",
// }) => {
//   const editor = useRef(null);

//   const config = useMemo(
//     () => ({
//       readonly: false,
//       placeholder,
//       height: 250,
//     }),
//     [placeholder]
//   );

//   return (
//     <div className="form-group mb-3">
//       {label && <label className="form-label fw-bold">{label}</label>}

//       <Controller
//         name={name}
//         control={control}
//         defaultValue=""
//         render={({ field }) => (
//           <JoditEditor
//             ref={editor}
//             value={field.value}
//             config={config}
//             onChange={(newContent) => field.onChange(newContent)}
//           />
//         )}
//       />
//     </div>
//   );
// };

// export default RichTextEditor;