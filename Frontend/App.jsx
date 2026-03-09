import { useState } from 'react';
import './Styles/Global.css';
import Home from './Pages/Home';
import Lab  from './Pages/Lab';

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      {selected ? (
        <Lab
          key={selected.id}
          algo={selected}
          onBack={() => setSelected(null)}
        />
      ) : (
        <Home onSelect={setSelected} />
      )}
    </div>
  );
}