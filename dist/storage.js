/* Browser-local persistence with optimistic concurrency protection. */
(function (root) {
  function read(storage, key) {
    const raw = storage.getItem(key),
      value = raw ? JSON.parse(raw) : {};
    if (
      value === null ||
      typeof value !== "object" ||
      Array.isArray(value) ||
      ["claims", "saved", "listings"].some(
        (k) => k in value && !Array.isArray(value[k]),
      )
    )
      throw new Error("Unrecognized saved data");
    return { raw, value };
  }
  function commit(storage, key, expected, value) {
    if (storage.getItem(key) !== expected) throw new Error("STORAGE_CONFLICT");
    const raw = JSON.stringify(value);
    storage.setItem(key, raw);
    return raw;
  }
  const api = { read, commit };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ClusterStorage = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
