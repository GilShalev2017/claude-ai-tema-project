interface ImportResultsPanelProps {
  result: {
    newItems?: number;
    updatedItems?: number;
    removedItems?: number;
    errors?: string[];
  };
}

export function ImportResultsPanel({ result }: ImportResultsPanelProps) {
  if (!result) return null;

  const { newItems, updatedItems, removedItems, errors } = result;

  return (
    <div
      style={{
        background: "var(--surface2)",
        padding: 24,
        borderRadius: 12,
        border: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 500,
          fontFamily: "var(--font-display)",
          color: "var(--text)",
          marginBottom: 12,
        }}
      >
        Import Summary
      </div>

      <div style={{ fontSize: 14, marginBottom: 8 }}>
        <strong>{newItems || 0}</strong> new items added
      </div>
      <div style={{ fontSize: 14, marginBottom: 8 }}>
        <strong>{updatedItems || 0}</strong> items updated
      </div>
      <div style={{ fontSize: 14, marginBottom: 8 }}>
        <strong>{removedItems || 0}</strong> items removed
      </div>

      {errors && errors.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--error)",
              marginBottom: 8,
            }}
          >
            Errors
          </div>

          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {errors.map((e, i) => (
              <li key={i} style={{ fontSize: 13, color: "var(--text-dim)" }}>
                {e}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
