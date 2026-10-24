"use client";
export type Environment = "production" | "preview" | "development";
export function EnvironmentSelector({
  value,
  onChange,
  id = "environment",
}: {
  value: Environment;
  onChange: (value: Environment) => void;
  id?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor={id} className="text-sm text-muted-foreground">
        Environment
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as Environment)}
        className="h-9 rounded-lg border border-input bg-card px-3 text-sm"
      >
        <option value="production">Production</option>
        <option value="preview">Preview</option>
        <option value="development">Development</option>
      </select>
    </div>
  );
}
