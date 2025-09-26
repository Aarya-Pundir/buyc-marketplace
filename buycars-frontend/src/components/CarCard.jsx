import React from 'react';
import "../styles/main.css";

export default function CarCard({ car, selectable=false, checked=false, onCheck, onEdit, onDelete }) {
  const img = (car.images && car.images[0]) || '';

  return (
    <div style={{border:'1px solid #ddd', borderRadius:6, padding:12, display:'flex', gap:12, alignItems:'flex-start'}}>
      {selectable && <input type="checkbox" checked={checked} onChange={onCheck} />}
      <div style={{width:140, height:90, background:'#f5f5f5', display:'flex', alignItems:'center', justifyContent:'center'}}>
        {img ? <img src={img} alt="" style={{maxWidth:'100%', maxHeight:'100%'}} /> : <div>No Image</div>}
      </div>
      <div style={{flex:1}}>
        <h4 style={{margin:0}}>{car.title}</h4>
        <div style={{fontSize:13, color:'#555'}}>Price: {car.price ? `₹ ${car.price}` : 'N/A'} • KMs: {car.kms ?? 'N/A'}</div>
        <ul style={{marginTop:6}}>
          {(car.bullets || []).slice(0,5).map((b,i)=>(<li key={i}>{b}</li>))}
        </ul>
      </div>
      <div style={{display:'flex',flexDirection:'column', gap:6}}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
