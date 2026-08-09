"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { Lock, Trash2, UploadCloud, Pencil, X } from "lucide-react";

const ADMIN_PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "";

async function uploadFile(file) {
  const filePath = `${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from("screenshots")
    .upload(filePath, file);
  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("screenshots").getPublicUrl(filePath);
  return data.publicUrl;
}

const tabs = [
  { id: "projects", label: "Projects" },
  { id: "designs", label: "Designs" },
  { id: "journey", label: "Journey" },
  { id: "status", label: "Status" },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState("projects");

  function handleLogin(e) {
    e.preventDefault();
    if (passInput === ADMIN_PASSCODE && ADMIN_PASSCODE.length > 0) {
      setAuthed(true);
      setAuthError("");
    } else {
      setAuthError("Wrong passcode.");
    }
  }

  if (!isSupabaseConfigured()) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <h1 className="font-display font-bold text-2xl mb-3">
            Supabase isn&apos;t connected yet
          </h1>
          <p className="text-muted text-sm">
            Add your Supabase URL and key to <code>.env.local</code>, then
            restart the dev server.
          </p>
        </div>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="clipping clipping-notape p-8 w-full max-w-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lock size={18} />
            <h1 className="font-display font-bold text-xl">Admin</h1>
          </div>
          <input
            type="password"
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
            placeholder="Passcode"
            className="w-full border-2 border-line focus:border-ink outline-none px-3 py-2 rounded-sm mb-3 bg-card text-ink placeholder:text-muted"
            autoFocus
          />
          {authError && <p className="text-red text-sm mb-3">{authError}</p>}
          <button
            type="submit"
            className="w-full bg-ink text-paper py-2.5 rounded-sm font-medium hover:bg-red transition-colors"
          >
            Enter
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-display font-bold text-3xl mb-8">Add to your site</h1>

      <div className="flex gap-2 mb-10 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={
              "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors " +
              (tab === t.id
                ? "border-ink text-ink"
                : "border-transparent text-muted hover:text-ink")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "projects" && <ProjectsPanel />}
      {tab === "designs" && <DesignsPanel />}
      {tab === "journey" && <JourneyPanel />}
      {tab === "status" && <StatusPanel />}
    </main>
  );
}

function fieldLabel(text) {
  return (
    <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1.5">
      {text}
    </label>
  );
}

const inputClass =
  "w-full border-2 border-line focus:border-ink outline-none px-3 py-2 rounded-sm bg-card text-ink placeholder:text-muted";

function FileField({ file, setFile, currentUrl }) {
  return (
    <div>
      {fieldLabel(currentUrl ? "Image (leave blank to keep current)" : "Image")}
      <label className="flex items-center gap-2 border-2 border-dashed border-line rounded-sm px-3 py-4 cursor-pointer hover:border-ink transition-colors text-sm text-muted">
        <UploadCloud size={16} />
        {file ? file.name : currentUrl ? "Click to replace image" : "Click to choose an image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>
    </div>
  );
}

function ProjectsPanel() {
  const emptyForm = {
    title: "",
    description: "",
    category: "frontend",
    tags: "",
    github: "",
    live: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingScreenshot, setEditingScreenshot] = useState("");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(p) {
    setEditingId(p.id);
    setEditingScreenshot(p.screenshot_url || "");
    setForm({
      title: p.title || "",
      description: p.description || "",
      category: p.category || "frontend",
      tags: p.tags || "",
      github: p.github || "",
      live: p.live || "",
    });
    setFile(null);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingScreenshot("");
    setForm(emptyForm);
    setFile(null);
    setMessage("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      let screenshot_url = editingId ? editingScreenshot : "";
      if (file) screenshot_url = await uploadFile(file);

      const payload = {
        title: form.title,
        description: form.description,
        category: form.category,
        tags: form.tags,
        github: form.github,
        live: form.live,
        screenshot_url,
      };

      if (editingId) {
        const { error } = await supabase.from("projects").update(payload).eq("id", editingId);
        if (error) throw error;
        setMessage("Updated!");
      } else {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
        setMessage("Saved! It'll show up on the site right away.");
      }

      cancelEdit();
      load();
    } catch (err) {
      setMessage(`Something went wrong: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    if (editingId === id) cancelEdit();
    load();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="clipping clipping-notape p-8 mb-16 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl">
            {editingId ? "Edit project" : "Add a project"}
          </h3>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-red transition-colors"
            >
              <X size={14} /> Cancel
            </button>
          )}
        </div>
        <div>
          {fieldLabel("Title")}
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          {fieldLabel("Description")}
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputClass + " resize-none"}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            {fieldLabel("Category")}
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={inputClass + " bg-paper"}
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Full-stack</option>
            </select>
          </div>
          <div>
            {fieldLabel("Tags (comma separated)")}
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="React, Tailwind CSS"
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            {fieldLabel("GitHub link")}
            <input
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            {fieldLabel("Live link (optional)")}
            <input
              value={form.live}
              onChange={(e) => setForm({ ...form, live: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <FileField file={file} setFile={setFile} currentUrl={editingId ? editingScreenshot : ""} />
        <button
          type="submit"
          disabled={saving}
          className="bg-ink text-paper px-6 py-3 rounded-sm font-medium hover:bg-red transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : editingId ? "Update project" : "Save project"}
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>

      <h2 className="font-display font-bold text-2xl mb-6">
        Your projects {loading && "(loading...)"}
      </h2>
      <div className="space-y-3">
        {items.map((p) => (
          <div key={p.id} className="flex items-center justify-between border border-line rounded-sm px-4 py-3">
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{p.category}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => startEdit(p)} className="text-muted hover:text-ink transition-colors" aria-label="Edit">
                <Pencil size={16} />
              </button>
              <button onClick={() => handleDelete(p.id)} className="text-muted hover:text-red transition-colors" aria-label="Delete">
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && !loading && <p className="text-muted text-sm">No projects saved yet.</p>}
      </div>
    </>
  );
}

function DesignsPanel() {
  const emptyForm = { title: "", description: "", figma: "" };
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingImage, setEditingImage] = useState("");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("designs")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(d) {
    setEditingId(d.id);
    setEditingImage(d.image_url || "");
    setForm({
      title: d.title || "",
      description: d.description || "",
      figma: d.figma || "",
    });
    setFile(null);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingImage("");
    setForm(emptyForm);
    setFile(null);
    setMessage("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      let image_url = editingId ? editingImage : "";
      if (file) image_url = await uploadFile(file);

      const payload = {
        title: form.title,
        description: form.description,
        figma: form.figma,
        image_url,
      };

      if (editingId) {
        const { error } = await supabase.from("designs").update(payload).eq("id", editingId);
        if (error) throw error;
        setMessage("Updated!");
      } else {
        const { error } = await supabase.from("designs").insert(payload);
        if (error) throw error;
        setMessage("Saved!");
      }

      cancelEdit();
      load();
    } catch (err) {
      setMessage(`Something went wrong: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this design?")) return;
    await supabase.from("designs").delete().eq("id", id);
    if (editingId === id) cancelEdit();
    load();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="clipping clipping-notape p-8 mb-16 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl">
            {editingId ? "Edit design" : "Add a design"}
          </h3>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-red transition-colors"
            >
              <X size={14} /> Cancel
            </button>
          )}
        </div>
        <div>
          {fieldLabel("Title")}
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          {fieldLabel("Description")}
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputClass + " resize-none"}
          />
        </div>
        <div>
          {fieldLabel("Figma link (optional)")}
          <input
            value={form.figma}
            onChange={(e) => setForm({ ...form, figma: e.target.value })}
            className={inputClass}
          />
        </div>
        <FileField file={file} setFile={setFile} currentUrl={editingId ? editingImage : ""} />
        <button
          type="submit"
          disabled={saving}
          className="bg-ink text-paper px-6 py-3 rounded-sm font-medium hover:bg-red transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : editingId ? "Update design" : "Save design"}
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>

      <h2 className="font-display font-bold text-2xl mb-6">
        Your designs {loading && "(loading...)"}
      </h2>
      <div className="space-y-3">
        {items.map((d) => (
          <div key={d.id} className="flex items-center justify-between border border-line rounded-sm px-4 py-3">
            <p className="font-medium">{d.title}</p>
            <div className="flex items-center gap-3">
              <button onClick={() => startEdit(d)} className="text-muted hover:text-ink transition-colors" aria-label="Edit">
                <Pencil size={16} />
              </button>
              <button onClick={() => handleDelete(d.id)} className="text-muted hover:text-red transition-colors" aria-label="Delete">
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && !loading && <p className="text-muted text-sm">No designs saved yet.</p>}
      </div>
    </>
  );
}

function JourneyPanel() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [loadingBooks, setLoadingBooks] = useState(false);

  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookIcon, setNewBookIcon] = useState("");
  const [creatingBook, setCreatingBook] = useState(false);

  const [concepts, setConcepts] = useState([]);
  const [loadingConcepts, setLoadingConcepts] = useState(false);

  const emptyConceptForm = { title: "", description: "", code: "", language: "" };
  const [conceptForm, setConceptForm] = useState(emptyConceptForm);
  const [savingConcept, setSavingConcept] = useState(false);
  const [message, setMessage] = useState("");
  const [editingConceptId, setEditingConceptId] = useState(null);

  async function loadBooks(preferId) {
    setLoadingBooks(true);
    const { data, error } = await supabase
      .from("journey_books")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setBooks(data);
      if (preferId) {
        setSelectedBookId(preferId);
      } else if (!selectedBookId && data.length > 0) {
        setSelectedBookId(data[0].id);
      }
    }
    setLoadingBooks(false);
  }

  useEffect(() => {
    loadBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadConcepts(bookId) {
    if (!bookId) {
      setConcepts([]);
      return;
    }
    setLoadingConcepts(true);
    const { data, error } = await supabase
      .from("journey_concepts")
      .select("*")
      .eq("book_id", bookId)
      .order("created_at", { ascending: true });
    if (!error && data) setConcepts(data);
    setLoadingConcepts(false);
  }

  useEffect(() => {
    loadConcepts(selectedBookId);
    setEditingConceptId(null);
    setConceptForm(emptyConceptForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBookId]);

  async function handleCreateBook(e) {
    e.preventDefault();
    setCreatingBook(true);
    setMessage("");
    try {
      const { data, error } = await supabase
        .from("journey_books")
        .insert({ title: newBookTitle, icon: newBookIcon })
        .select()
        .single();
      if (error) throw error;
      setNewBookTitle("");
      setNewBookIcon("");
      await loadBooks(data.id);
    } catch (err) {
      setMessage(`Something went wrong: ${err.message}`);
    } finally {
      setCreatingBook(false);
    }
  }

  async function handleDeleteBook(id) {
    if (!confirm("Delete this whole notebook and all its concepts?")) return;
    await supabase.from("journey_books").delete().eq("id", id);
    if (selectedBookId === id) setSelectedBookId("");
    loadBooks();
  }

  function startEditConcept(c) {
    setEditingConceptId(c.id);
    setConceptForm({
      title: c.title || "",
      description: c.description || "",
      code: c.code || "",
      language: c.language || "",
    });
    setMessage("");
  }

  function cancelEditConcept() {
    setEditingConceptId(null);
    setConceptForm(emptyConceptForm);
    setMessage("");
  }

  async function handleSaveConcept(e) {
    e.preventDefault();
    if (!selectedBookId) return;
    setSavingConcept(true);
    setMessage("");
    try {
      const payload = {
        title: conceptForm.title,
        description: conceptForm.description,
        code: conceptForm.code || null,
        language: conceptForm.language || null,
      };

      if (editingConceptId) {
        const { error } = await supabase
          .from("journey_concepts")
          .update(payload)
          .eq("id", editingConceptId);
        if (error) throw error;
        setMessage("Updated!");
      } else {
        const { error } = await supabase
          .from("journey_concepts")
          .insert({ ...payload, book_id: selectedBookId });
        if (error) throw error;
        setMessage("Saved!");
      }

      cancelEditConcept();
      loadConcepts(selectedBookId);
    } catch (err) {
      setMessage(`Something went wrong: ${err.message}`);
    } finally {
      setSavingConcept(false);
    }
  }

  async function handleDeleteConcept(id) {
    if (!confirm("Delete this concept?")) return;
    await supabase.from("journey_concepts").delete().eq("id", id);
    if (editingConceptId === id) cancelEditConcept();
    loadConcepts(selectedBookId);
  }

  const selectedBook = books.find((b) => b.id === selectedBookId);

  return (
    <>
      <div className="clipping clipping-notape p-8 mb-10">
        <h3 className="font-display font-bold text-xl mb-4">Your notebooks</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {books.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBookId(b.id)}
              className={
                "px-3 py-2 rounded-sm text-sm border flex items-center gap-2 transition-colors " +
                (selectedBookId === b.id
                  ? "border-ink bg-ink text-paper"
                  : "border-line hover:border-ink")
              }
            >
              <span>{b.icon || "📘"}</span> {b.title}
            </button>
          ))}
          {books.length === 0 && !loadingBooks && (
            <p className="text-muted text-sm">No notebooks yet — add your first one below.</p>
          )}
        </div>

        <form onSubmit={handleCreateBook} className="flex flex-wrap items-end gap-3">
          <div>
            {fieldLabel("New notebook title")}
            <input
              required
              value={newBookTitle}
              onChange={(e) => setNewBookTitle(e.target.value)}
              placeholder="React, Node.js, SQL..."
              className={inputClass}
            />
          </div>
          <div>
            {fieldLabel("Icon (emoji)")}
            <input
              value={newBookIcon}
              onChange={(e) => setNewBookIcon(e.target.value)}
              placeholder="⚛️"
              className={inputClass + " w-20"}
            />
          </div>
          <button
            type="submit"
            disabled={creatingBook}
            className="bg-ink text-paper px-4 py-2 rounded-sm text-sm font-medium hover:bg-red transition-colors disabled:opacity-50"
          >
            {creatingBook ? "Adding..." : "+ Add notebook"}
          </button>
        </form>
      </div>

      {selectedBook && (
        <>
          <form onSubmit={handleSaveConcept} className="clipping clipping-notape p-8 mb-10 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl">
                {editingConceptId ? "Edit concept" : `Add a concept to ${selectedBook.title}`}
              </h3>
              {editingConceptId && (
                <button
                  type="button"
                  onClick={cancelEditConcept}
                  className="inline-flex items-center gap-1 text-sm text-muted hover:text-red transition-colors"
                >
                  <X size={14} /> Cancel
                </button>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                {fieldLabel("Concept title")}
                <input
                  required
                  value={conceptForm.title}
                  onChange={(e) => setConceptForm({ ...conceptForm, title: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                {fieldLabel("Language (optional)")}
                <input
                  value={conceptForm.language}
                  onChange={(e) => setConceptForm({ ...conceptForm, language: e.target.value })}
                  placeholder="javascript, css..."
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              {fieldLabel("Description")}
              <textarea
                required
                rows={3}
                value={conceptForm.description}
                onChange={(e) => setConceptForm({ ...conceptForm, description: e.target.value })}
                className={inputClass + " resize-none"}
              />
            </div>
            <div>
              {fieldLabel("Code snippet (optional)")}
              <textarea
                rows={4}
                value={conceptForm.code}
                onChange={(e) => setConceptForm({ ...conceptForm, code: e.target.value })}
                className={inputClass + " font-mono text-sm resize-none"}
              />
            </div>
            <button
              type="submit"
              disabled={savingConcept}
              className="bg-ink text-paper px-6 py-3 rounded-sm font-medium hover:bg-red transition-colors disabled:opacity-50"
            >
              {savingConcept ? "Saving..." : editingConceptId ? "Update concept" : "Save concept"}
            </button>
            {message && <p className="text-sm mt-2">{message}</p>}
          </form>

          <h3 className="font-display font-bold text-xl mb-4">
            Concepts in this notebook {loadingConcepts && "(loading...)"}
          </h3>
          <div className="space-y-3 mb-8">
            {concepts.map((c) => (
              <div key={c.id} className="flex items-center justify-between border border-line rounded-sm px-4 py-3">
                <p className="font-medium">{c.title}</p>
                <div className="flex items-center gap-3">
                  <button onClick={() => startEditConcept(c)} className="text-muted hover:text-ink transition-colors" aria-label="Edit">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDeleteConcept(c.id)} className="text-muted hover:text-red transition-colors" aria-label="Delete">
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
            {concepts.length === 0 && !loadingConcepts && (
              <p className="text-muted text-sm">No concepts yet.</p>
            )}
          </div>

          <button
            onClick={() => handleDeleteBook(selectedBookId)}
            className="text-sm text-red hover:underline"
          >
            Delete this whole notebook
          </button>
        </>
      )}
    </>
  );
}

function StatusPanel() {
  const [current, setCurrent] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_status")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!error && data) {
      setCurrent(data.current_focus);
      setNewStatus(data.current_focus);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const { error } = await supabase
        .from("site_status")
        .insert({ current_focus: newStatus });
      if (error) throw error;
      setMessage("Updated! It shows up under your hero section.");
      load();
    } catch (err) {
      setMessage(`Something went wrong: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="clipping clipping-notape p-8">
      <h3 className="font-display font-bold text-xl mb-1">
        &quot;Currently&quot; status
      </h3>
      <p className="text-sm text-muted mb-6">
        Shows as a small badge under your hero section &mdash; a one-line
        note on what you&apos;re working on right now.
      </p>

      {current && (
        <p className="text-sm mb-4">
          <span className="text-muted">Live now: </span>
          {loading ? "loading..." : current}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          {fieldLabel("New status")}
          <input
            required
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            placeholder="Learning Node.js authentication patterns"
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-ink text-paper px-6 py-3 rounded-sm font-medium hover:bg-red transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update status"}
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
