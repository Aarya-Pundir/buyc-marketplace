import React, { useState } from 'react';
import { Inventory } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AddCar(){
  const [form, setForm] = useState({
    title:'', images:[''], bullets:['','','','',''], price:'', kms:'', color:'', major_scratches:false,
    original_paint:true, accidents:0, previous_owners:1, registration_place:''
  });
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  function setImage(idx, val){
    const images = [...form.images];
    images[idx] = val;
    setForm({...form, images});
  }

  function setBullet(idx, val){
    const bullets = [...form.bullets];
    bullets[idx] = val;
    setForm({...form, bullets});
  }

  async function submit(e){
    e.preventDefault();
    
    const nonEmptyBullets = form.bullets.filter(b => b && b.trim().length>0);
    if (nonEmptyBullets.length !== 5) {
      setMsg('Please provide exactly 5 bullets (non-empty).');
      return;
    }
    try {
      setMsg('Saving...');
      const payload = {
        title: form.title,
        images: form.images.filter(Boolean),
        bullets: form.bullets,
        price: Number(form.price) || null,
        kms: Number(form.kms) || null,
        color: form.color,
        major_scratches: !!form.major_scratches,
        original_paint: !!form.original_paint,
        accidents: Number(form.accidents) || 0,
        previous_owners: Number(form.previous_owners) || 1,
        registration_place: form.registration_place
      };
      const res = await Inventory.create(payload);
      setMsg('Saved successfully.');
      nav('/inventory');
    } catch (err) {
      setMsg(err.body?.message || err.message);
    }
  }

  return (
    <div style={{maxWidth:800, margin:'30px auto'}}>
      <h2>Add Car (Dealer)</h2>
      <form onSubmit={submit}>
        <div>
          <label>Title</label><br/>
          <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
        </div>

        <div style={{marginTop:8}}>
          <label>Images (enter image URLs) — press + to add</label>
          {form.images.map((img, idx) => (
            <div key={idx} style={{display:'flex', gap:8, alignItems:'center', marginTop:6}}>
              <input value={img} onChange={e=>setImage(idx, e.target.value)} placeholder="https://..." />
              {idx === form.images.length - 1 && (
                <button type="button" onClick={()=>setForm({...form, images:[...form.images, '']})}>+</button>
              )}
            </div>
          ))}
        </div>

        <div style={{marginTop:8}}>
          <label>5 Bullet Points (exactly five)</label>
          {form.bullets.map((b, idx) => (
            <div key={idx}>
              <input value={b} onChange={e=>setBullet(idx, e.target.value)} placeholder={`Bullet ${idx+1}`} required />
            </div>
          ))}
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:8}}>
          <div>
            <label>Price (INR)</label><br/>
            <input value={form.price} onChange={e=>setForm({...form, price:e.target.value})} />
          </div>
          <div>
            <label>KMs</label><br/>
            <input value={form.kms} onChange={e=>setForm({...form, kms:e.target.value})} />
          </div>
        </div>

        <div style={{marginTop:8}}>
          <label>Color</label><br/>
          <input value={form.color} onChange={e=>setForm({...form, color:e.target.value})} />
        </div>

        <div style={{marginTop:8}}>
          <label>Other details</label><br/>
          <input type="checkbox" checked={form.major_scratches} onChange={e=>setForm({...form, major_scratches:e.target.checked})} /> Major scratches
          <br/>
          <input type="checkbox" checked={form.original_paint} onChange={e=>setForm({...form, original_paint:e.target.checked})} /> Original paint
        </div>

        <div style={{marginTop:12}}>
          <button type="submit">Save</button>
        </div>

        {msg && <div style={{marginTop:10}}>{msg}</div>}
      </form>
    </div>
  );
}
