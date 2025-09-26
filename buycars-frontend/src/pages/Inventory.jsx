import React, { useEffect, useState } from 'react';
import { Inventory as InventoryService } from '../services/api';  // renamed
import CarCard from '../components/CarCard';
import Filters from '../components/Filters';
import "../styles/main.css";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    load();
  }, [filters]);

  async function load() {
    setLoading(true);
    try {
      const params = {};
      if (filters.minPrice) params.min_price = filters.minPrice;
      if (filters.maxPrice) params.max_price = filters.maxPrice;
      if (filters.color) params.color = filters.color;
      if (filters.minKms) params.min_kms = filters.minKms;

      const data = await InventoryService.list(params);   // 👈 updated
      setItems(data);
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  function toggleSelect(id) {
    const s = new Set(selected);
    if (s.has(id)) s.delete(id);
    else s.add(id);
    setSelected(s);
  }

  async function bulkDelete() {
    if (selected.size === 0) return alert('Select items to delete');
    if (!confirm(`Delete ${selected.size} item(s)?`)) return;
    try {
      const ids = Array.from(selected);
      const res = await InventoryService.bulkDelete(ids);  // 👈 updated
      alert(`Deleted ${res.deleted || 'items'}`);
      setSelected(new Set());
      await load();
    } catch (err) {
      alert(err.body?.message || err.message);
    }
  }

  async function deleteOne(id) {
    if (!confirm('Delete item?')) return;
    try {
      await InventoryService.delete(id);   // 👈 updated
      await load();
    } catch (err) {
      alert(err.body?.message || err.message);
    }
  }

  function startEdit(item) {
    setEditItem({ ...item });
  }

  async function saveEdit() {
    try {
      const payload = {
        title: editItem.title,
        price: editItem.price,
        kms: editItem.kms,
        color: editItem.color,
        images: editItem.images,
        bullets: editItem.bullets
      };
      await InventoryService.update(editItem.id, payload);   // 👈 updated
      setEditItem(null);
      await load();
    } catch (err) {
      alert(err.body?.message || err.message);
    }
  }

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: '20px auto',
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        gap: 20
      }}
    >
      <div>
        <Filters onApply={setFilters} />
        <div style={{ marginTop: 12 }}>
          <button onClick={bulkDelete}>Delete selected ({selected.size})</button>
        </div>
      </div>

      <div>
        <h3>My Inventory</h3>
        {loading && <div>Loading...</div>}
        {!loading && items.length === 0 && <div>No cars found.</div>}
        <div style={{ display: 'grid', gap: 12 }}>
          {items.map((item) => (
            <CarCard
              key={item.id}
              car={item}
              selectable
              checked={selected.has(item.id)}
              onCheck={() => toggleSelect(item.id)}
              onEdit={() => startEdit(item)}
              onDelete={() => deleteOne(item.id)}
            />
          ))}
        </div>

        {editItem && (
          <div
            style={{
              position: 'fixed',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                background: '#fff',
                padding: 20,
                width: 640,
                borderRadius: 6
              }}
            >
              <h4>Edit Item</h4>
              <div>
                <label>Title</label>
                <br />
                <input
                  value={editItem.title}
                  onChange={(e) =>
                    setEditItem({ ...editItem, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Price</label>
                <br />
                <input
                  value={editItem.price || ''}
                  onChange={(e) =>
                    setEditItem({ ...editItem, price: e.target.value })
                  }
                />
              </div>
              <div style={{ marginTop: 8 }}>
                <button onClick={saveEdit}>Save</button>
                <button
                  onClick={() => setEditItem(null)}
                  style={{ marginLeft: 8 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
