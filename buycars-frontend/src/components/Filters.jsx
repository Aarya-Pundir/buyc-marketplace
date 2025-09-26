import React, { useState } from 'react';

export default function Filters({ onApply }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [color, setColor] = useState('');
  const [minKms, setMinKms] = useState('');

  function apply() {
    onApply({ minPrice: minPrice || undefined, maxPrice: maxPrice || undefined, color: color || undefined, minKms: minKms || undefined });
  }

  function resetAll(){
    setMinPrice(''); setMaxPrice(''); setColor(''); setMinKms('');
    onApply({});
  }

  return (
    <div style={{padding:12, border:'1px solid #eee', borderRadius:6}}>
      <h4>Filters</h4>
      <div>
        <label>Price Min</label><br/>
        <input value={minPrice} onChange={e=>setMinPrice(e.target.value)} />
      </div>
      <div>
        <label>Price Max</label><br/>
        <input value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} />
      </div>
      <div>
        <label>Color</label><br/>
        <input value={color} onChange={e=>setColor(e.target.value)} placeholder="e.g. White" />
      </div>
      <div>
        <label>Min KMs</label><br/>
        <input value={minKms} onChange={e=>setMinKms(e.target.value)} />
      </div>
      <div style={{marginTop:8}}>
        <button onClick={apply}>Apply</button>
        <button onClick={resetAll} style={{marginLeft:8}}>Reset</button>
      </div>
    </div>
  );
}
