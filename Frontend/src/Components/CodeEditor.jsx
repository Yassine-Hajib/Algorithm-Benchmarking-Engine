import React, { useRef, useState } from 'react';
import './CodeEditor.css';

const CodeEditor = ({ value, onChange, placeholder, label, hint, disabled }) => {
  const textareaRef = useRef(null);
  const [focused, setFocused] = useState(false);

  const lines = value ? value.split('\n').length : 1;

  return (
    <div className={`ce ${focused ? 'ce--focused' : ''} ${disabled ? 'ce--disabled' : ''}`}>
      {/* Top bar */}
      <div className="ce-bar">
        <div className="ce-bar-dots">
          <span /><span /><span />
        </div>
        <span className="ce-bar-label">{label || 'input.py'}</span>
        {value && (
          <button
            className="ce-clear"
            onClick={() => onChange({ target: { value: '' } })}
            disabled={disabled}
            title="Clear"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {/* Editor body */}
      <div className="ce-body">
        {/* Line numbers */}
        <div className="ce-gutter" aria-hidden="true">
          {Array.from({ length: Math.max(lines, 6) }).map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          className="ce-textarea"
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder || 'Enter a value or array…'}
          disabled={disabled}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          rows={6}
        />
      </div>

      {/* Hint */}
      {hint && <p className="ce-hint">{hint}</p>}
    </div>
  );
};

export default CodeEditor;