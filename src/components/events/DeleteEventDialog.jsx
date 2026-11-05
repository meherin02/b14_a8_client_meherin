"use client";

import { useEffect, useId, useRef } from "react";

export default function DeleteEventDialog({
  title,
  busy,
  onCancel,
  onConfirm,
}) {
  const dialogRef = useRef(null);
  const cancelRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog.showModal();
    cancelRef.current?.focus();
    return () => {
      dialog.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected)
        previousFocus.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-busy={busy}
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onCancel();
      }}
    >
      <div className="modal-box">
        <h2 id={titleId} className="text-xl font-bold">
          Delete this event?
        </h2>
        <p id={descriptionId} className="mt-3 [overflow-wrap:anywhere]">
          “{title}” will be removed. This cannot be undone.
        </p>
        <div className="modal-action">
          <button
            ref={cancelRef}
            type="button"
            className="btn"
            disabled={busy}
            onClick={onCancel}
          >
            Keep event
          </button>
          <button
            type="button"
            className="btn btn-error"
            disabled={busy}
            onClick={onConfirm}
          >
            {busy ? "Deleting…" : "Delete event"}
          </button>
        </div>
        {busy && (
          <p role="status" className="mt-3 text-sm">
            Deleting your event. Please wait…
          </p>
        )}
      </div>
    </dialog>
  );
}
