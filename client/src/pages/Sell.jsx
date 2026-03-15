// import React, { useState, useEffect, useRef } from "react";

// // Single-file React component (default export)
// // Tailwind CSS assumed to be available in the project.
// // Usage: import SellBook from './SellBook'; then render <SellBook />

// export default function Sell() {
//   const [form, setForm] = useState({
//     title: "",
//     author: "",
//     isbn: "",
//     edition: "",
//     condition: "",
//     price: "",
//     negotiable: "No",
//     desc: "",
//     location: "",
//     delivery: "Pickup only",
//     contact: "",
//     terms: false,
//   });

//   const [images, setImages] = useState([]); // {file, url}
//   const [msg, setMsg] = useState(null);
//   const [published, setPublished] = useState(null);
//   const fileRef = useRef(null);

//   // Load draft from localStorage
//   useEffect(() => {
//     const d = localStorage.getItem("ubm_draft_react");
//     if (d) {
//       try {
//         const parsed = JSON.parse(d);
//         setForm((f) => ({ ...f, ...parsed }));
//       } catch (e) {
//         // ignore
//       }
//     }
//   }, []);

//   // cleanup object URLs
//   useEffect(() => {
//     return () => {
//       images.forEach((i) => URL.revokeObjectURL(i.url));
//     };
//   }, [images]);

//   function handleChange(e) {
//     const { name, value, type, checked } = e.target;
//     setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
//   }

//   function handleFiles(files) {
//     const arr = Array.from(files).slice(0, 6 - images.length);
//     const newImgs = arr
//       .filter((f) => f.type && f.type.startsWith("image/"))
//       .map((f) => ({ file: f, url: URL.createObjectURL(f) }));
//     setImages((prev) => [...prev, ...newImgs].slice(0, 6));
//   }

//   function removeImage(idx) {
//     setImages((prev) => {
//       const copy = [...prev];
//       URL.revokeObjectURL(copy[idx].url);
//       copy.splice(idx, 1);
//       return copy;
//     });
//   }

//   function onDrop(e) {
//     e.preventDefault();
//     if (e.dataTransfer.files && e.dataTransfer.files.length) {
//       handleFiles(e.dataTransfer.files);
//     }
//   }

//   function saveDraft() {
//     const toSave = { ...form };
//     // do not save sensitive ephemeral info
//     localStorage.setItem("ubm_draft_react", JSON.stringify(toSave));
//     setMsg({ type: "success", text: "Draft saved locally." });
//     setTimeout(() => setMsg(null), 2000);
//   }

//   function resetForm() {
//     setForm({
//       title: "",
//       author: "",
//       isbn: "",
//       edition: "",
//       condition: "",
//       price: "",
//       negotiable: "No",
//       desc: "",
//       location: "",
//       delivery: "Pickup only",
//       contact: "",
//       terms: false,
//     });
//     images.forEach((i) => URL.revokeObjectURL(i.url));
//     setImages([]);
//     setPublished(null);
//     localStorage.removeItem("ubm_draft_react");
//   }

//   function validate() {
//     if (!form.title || !form.author || !form.price || !form.contact || !form.terms) {
//       setMsg({ type: "error", text: "Please fill required fields (title, author, price, contact, accept terms)." });
//       return false;
//     }
//     return true;
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!validate()) return;

//     // Mock publish: build payload and set published state
//     const payload = {
//       ...form,
//       images: images.map((i) => i.file.name),
//       id: "UBM-" + Math.random().toString(36).slice(2, 9).toUpperCase(),
//       publishedAt: new Date().toISOString(),
//     };
//     setPublished(payload);
//     setMsg({ type: "success", text: "Listing published (mock)." });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-6 mt-10">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
//         <main className="bg-white rounded-2xl shadow-lg p-6">
//           <header className="mb-4">
//             <h1 className="text-xl font-semibold">Sell a Book</h1>
//             <p className="text-sm text-gray-500">List your used book quickly — buyers will see title, condition, photos and price.</p>
//           </header>

//           {msg && (
//             <div className={`mb-4 p-3 rounded-md ${msg.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
//               {msg.text}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
//             <div>
//               <label className="block text-sm font-medium mb-1">Book Title *</label>
//               <input name="title" value={form.title} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. To Kill a Mockingbird" />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Author *</label>
//                 <input name="author" value={form.author} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Author name" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">ISBN</label>
//                 <input name="isbn" value={form.isbn} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="ISBN-10 or ISBN-13" />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Edition / Year</label>
//                 <input name="edition" value={form.edition} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. 2nd edition, 2015" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Condition *</label>
//                 <select name="condition" value={form.condition} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
//                   <option value="">Select condition</option>
//                   <option>Like New</option>
//                   <option>Very Good</option>
//                   <option>Good</option>
//                   <option>Acceptable</option>
//                   <option>For Parts / Damaged</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Price (₹) *</label>
//                 <input name="price" value={form.price} onChange={handleChange} type="number" min="0" className="w-full px-3 py-2 border rounded-lg" placeholder="Amount in INR" />
//                 <p className="text-xs text-gray-500 mt-1">Tip: Check similar listings to price competitively.</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Negotiable</label>
//                 <select name="negotiable" value={form.negotiable} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
//                   <option>No</option>
//                   <option>Yes</option>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Description</label>
//               <textarea name="desc" value={form.desc} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg min-h-[100px]" placeholder="Add condition details, highlights, notes about annotations, missing pages, smell, etc."></textarea>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Photos (up to 6)</label>
//               <div
//                 onClick={() => fileRef.current && fileRef.current.click()}
//                 onDrop={onDrop}
//                 onDragOver={(e) => e.preventDefault()}
//                 className="w-full p-4 border-2 border-dashed rounded-lg text-center cursor-pointer bg-white"
//               >
//                 Click or drop images here
//                 <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
//               </div>

//               <div className="flex gap-3 flex-wrap mt-3">
//                 {images.map((im, idx) => (
//                   <div key={idx} className="w-24 h-32 rounded-lg overflow-hidden border relative">
//                     <img src={im.url} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
//                     <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-black/60 text-white rounded px-1 text-xs">✕</button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Location (city)</label>
//                 <input name="location" value={form.location} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. Bengaluru" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Delivery Options</label>
//                 <select name="delivery" value={form.delivery} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
//                   <option>Pickup only</option>
//                   <option>Shipping only</option>
//                   <option>Pickup or Shipping</option>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Contact email *</label>
//               <input name="contact" value={form.contact} onChange={handleChange} type="email" className="w-full px-3 py-2 border rounded-lg" placeholder="you@example.com" />
//             </div>

//             <div className="flex items-center gap-3">
//               <input name="terms" checked={form.terms} onChange={handleChange} type="checkbox" id="terms" />
//               <label htmlFor="terms" className="text-sm text-gray-600">I confirm this listing is accurate and I have authority to sell this book.</label>
//             </div>

//             <div className="flex items-center justify-between mt-4">
//               <div className="flex gap-2">
//                 <button type="button" onClick={saveDraft} className="px-3 py-2 border rounded-lg">Save draft</button>
//                 <button type="button" onClick={resetForm} className="px-3 py-2 border rounded-lg">Reset</button>
//               </div>
//               <div>
//                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Publish Listing</button>
//               </div>
//             </div>
//           </form>

//           {published && (
//             <div className="mt-6 p-4 bg-gray-900 text-white rounded-lg overflow-auto max-h-60">
//               <div className="text-sm font-medium">Listing published (mock):</div>
//               <pre className="text-xs mt-2">{JSON.stringify(published, null, 2)}</pre>
//             </div>
//           )}
//         </main>

//         <aside className="space-y-4 sticky top-8">
//           <div className="bg-white rounded-2xl shadow p-4">
//             <h3 className="font-semibold">Live preview</h3>
//             <div className="mt-3">
//               {form.title ? (
//                 <div className="flex gap-3">
//                   <div className="w-24 h-32 bg-gray-50 rounded overflow-hidden border">
//                     {images[0] ? <img src={images[0].url} className="w-full h-full object-cover" alt="preview" /> : <div className="flex items-center justify-center h-full text-gray-400 text-xs">No image</div>}
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex justify-between items-baseline">
//                       <div>
//                         <div className="font-semibold">{form.title}</div>
//                         <div className="text-sm text-gray-500">{form.author} • {form.condition}</div>
//                       </div>
//                       <div className="text-right">
//                         <div className="font-bold text-lg">₹ {form.price}</div>
//                         <div className="text-xs text-gray-500">{form.location}</div>
//                       </div>
//                     </div>
//                     <p className="text-sm text-gray-700 mt-2">{form.desc}</p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-sm text-gray-500">Fill the form to see a preview of your listing.</div>
//               )}
//             </div>
//             <div className="mt-3 text-xs text-gray-500">Preview shows how buyers will see the listing: title, price, condition, images, location and description.</div>
//           </div>

//           <div className="bg-white rounded-2xl shadow p-4">
//             <h4 className="font-medium">Tips for better sales</h4>
//             <ul className="mt-2 text-sm text-gray-500 list-disc pl-5">
//               <li>Use 3–5 clear photos (cover, spine, major wear).</li>
//               <li>Be honest about condition and damage.</li>
//               <li>Include edition/ISBN to attract collectors.</li>
//             </ul>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';

// Single-file React component that implements:
// - A "Sell Books" CTA/button
// - If user is not signed in: show Login/Signup modal when they click Sell
// - After successful login/signup: show the Sell Book form
// Intended to be dropped into any React/Next.js app. Tailwind classes used.

export default function Sell() {
  // simple mock auth stored in localStorage
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showSellForm, setShowSellForm] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('ubm_user');
    if (raw) {
      setUser(JSON.parse(raw));
    }
  }, []);

  function openSell() {
    if (!user) setModalOpen(true);
    else setShowSellForm(true);
  }

  function handleLogin({ email, name }) {
    const u = { id: 'u_' + Math.random().toString(36).slice(2, 8), email, name };
    localStorage.setItem('ubm_user', JSON.stringify(u));
    setUser(u);
    setModalOpen(false);
    setShowSellForm(true);
  }

  function handleLogout() {
    localStorage.removeItem('ubm_user');
    setUser(null);
    setShowSellForm(false);
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-16">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Used Book Mart</h2>
          <div className="text-sm text-gray-500">Buy and sell used books easily</div>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="text-sm">Hi, <strong>{user.name || user.email}</strong></div>
              <button onClick={handleLogout} className="px-3 py-1 border rounded">Logout</button>
            </>
          ) : (
            <button onClick={() => setModalOpen(true)} className="px-3 py-1 border rounded">Login / Sign up</button>
          )}
          <button onClick={openSell} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">Sell Books</button>
        </div>
      </div>

      {/* If user clicked Sell and is authenticated, show sell form */}
      {showSellForm && <SellForm user={user} onClose={() => setShowSellForm(false)} />}

      {/* If not showing sell form, short info block */}
      {!showSellForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold">Sell your book</h3>
          <p className="text-sm text-gray-600 mt-2">Click <strong>Sell Books</strong> — you'll be asked to login or signup first if you aren't already.</p>
        </div>
      )}

      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} onAuth={handleLogin} />
    </div>
  );
}

/* ---------------- Auth Modal ---------------- */
function AuthModal({ open, onClose, onAuth }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!open) {
      setMode('login');
      setEmail('');
      setName('');
      setErr(null);
    }
  }, [open]);

  if (!open) return null;

  function submit(e) {
    e.preventDefault();
    if (!email) return setErr('Email is required');
    if (mode === 'signup' && !name) return setErr('Name is required for signup');
    // mock success
    onAuth({ email, name: name || email.split('@')[0] });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{mode === 'login' ? 'Login' : 'Sign up'}</h3>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="text-sm block mb-1">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
          )}
          <div>
            <label className="text-sm block mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full px-3 py-2 border rounded" />
          </div>
          {err && <div className="text-sm text-red-600">{err}</div>}

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              {mode === 'login' ? (
                <span>Don't have an account? <button type="button" onClick={() => setMode('signup')} className="text-blue-600 underline">Sign up</button></span>
              ) : (
                <span>Already have an account? <button type="button" onClick={() => setMode('login')} className="text-blue-600 underline">Login</button></span>
              )}
            </div>
            <div>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{mode === 'login' ? 'Login' : 'Create account'}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------- Sell Form (simplified) ---------------- */
function SellForm({ user, onClose }) {
  const [form, setForm] = useState({ title: '', author: '', condition: '', price: '', desc: '', location: '', contact: user?.email || '' });
  const [images, setImages] = useState([]);
  const fileRef = useRef(null);
  const [msg, setMsg] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleFiles(files) {
    const arr = Array.from(files).slice(0, 6 - images.length);
    const newImgs = arr.filter(f => f.type && f.type.startsWith('image/')).map(f => ({ file: f, url: URL.createObjectURL(f) }));
    setImages(prev => [...prev, ...newImgs].slice(0,6));
  }

  function removeImage(i) {
    setImages(prev => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[i].url);
      copy.splice(i,1);
      return copy;
    });
  }

  function submit(e) {
    e.preventDefault();
    if (!form.title || !form.author || !form.price) {
      setMsg({ type: 'error', text: 'Please fill title, author and price.'});
      return;
    }
    // Mock publish
    const payload = { ...form, images: images.map(i => i.file.name), seller: user };
    setMsg({ type: 'success', text: 'Listing created (mock).' });
    console.log('Published payload:', payload);
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Sell a Book</h3>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">Close</button>
        </div>
      </div>

      {msg && (
        <div className={`mb-4 p-3 rounded ${msg.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>{msg.text}</div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Title *</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm mb-1">Author *</label>
          <input name="author" value={form.author} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Condition</label>
            <select name="condition" value={form.condition} onChange={handleChange} className="w-full px-3 py-2 border rounded">
              <option value="">Select</option>
              <option>Like New</option>
              <option>Very Good</option>
              <option>Good</option>
              <option>Acceptable</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Price (₹) *</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea name="desc" value={form.desc} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm mb-1">Photos (up to 6)</label>
          <div onClick={() => fileRef.current && fileRef.current.click()} className="w-full p-3 border-2 border-dashed rounded text-center cursor-pointer">Click or drop images here
            <input ref={fileRef} className="hidden" type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} />
          </div>
          <div className="flex gap-3 flex-wrap mt-3">
            {images.map((im, idx) => (
              <div key={idx} className="w-24 h-32 rounded overflow-hidden border relative">
                <img src={im.url} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-black/60 text-white rounded px-1 text-xs">✕</button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Location</label>
            <input name="location" value={form.location} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">Contact email</label>
            <input name="contact" value={form.contact} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input id="terms" type="checkbox" className="w-4 h-4" />
          <label htmlFor="terms" className="text-sm text-gray-600">I confirm this listing is accurate.</label>
        </div>

        <div className="flex items-center justify-between">
          <button type="button" onClick={() => { localStorage.setItem('ubm_draft', JSON.stringify(form)); setMsg({type:'success', text:'Draft saved locally.'}); }} className="px-3 py-2 border rounded">Save draft</button>
          <div className="flex gap-2">
            <button type="button" onClick={() => { setForm({ title:'', author:'', condition:'', price:'', desc:'', location:'', contact:user?.email||'' }); setImages([]); }} className="px-3 py-2 border rounded">Reset</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Publish Listing</button>
          </div>
        </div>
      </form>
    </div>
  );
}
